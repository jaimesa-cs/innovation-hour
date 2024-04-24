import { DEFAULT_REDIRECT } from "@/_sdk/settings";
import { redirect } from "next/navigation";
export default function PageHome(){
    return redirect(DEFAULT_REDIRECT);
} 