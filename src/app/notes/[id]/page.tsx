import NoteDetail from "@/components/NoteDetail";export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <NoteDetail id={id}/>}
