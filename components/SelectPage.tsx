'use client';

import { Page } from '@/_sdk/types';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SelectPage() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<Page[]>([]);
    const router = useRouter();
    const getPages = async () => {
        setLoading(true);
        const url = `https://cdn.contentstack.io/v3/content_types/page/entries?environment=${process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT}&only[BASE][]=title&only[BASE][]=url`;
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
                access_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "",
            }
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            const d: Page[] = [{ title: "Select a Page...", uid: "", url: "" }, ...data.entries.map((entry: any) => { return {
                ...entry,
                url: entry.url.substring(1),
            }; })]
            console.log(d);
            setData(d);
            setLoading(false);
        });
    };
    React.useEffect(() => {        
        getPages();
    }, []);

    return (
        <div className="flex flex-row justify-center  pt-20">
            {loading ? 
                <>Loading...</>:
                <>
                    <div className="text-s">Available Pages: &nbsp;</div>
                    <div className='text-black'>
                <div>
                    {!loading && <select
                        title='pages'
                        name='pages'
                        onChange={(e) => {
                            if (e.target.value !== "") {
                                router.push(`${e.target.value}`);
                            }
                        }}
                    >
                        {data.map((page: Page) => {
                            return <option key={`page_${page.uid}`} value={`/${page?.url}`}>{page.title}</option>;
                        })}

                    </select>}
                </div>

                <button className='text-white' onClick={()=>{
                    getPages();
                    
                }} disabled={loading}>Reload</button>

                    </div>
                </>
            }
        </div>
    );
}
