"use client";
import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Home,BookOpen,Compass,MessageCircle,Clapperboard,Sparkles,Search,Moon,Sun} from "lucide-react";
import UserMenu from "@/components/UserMenu";
export default function SiteNavigation(){
 const path=usePathname();const [q,setQ]=useState("");const [light,setLight]=useState(true);
 if(path==="/")return null;
 return <header className="global-site-nav">
  <Link href="/" className="global-site-brand"><span><Home size={16}/></span>AllenShiina</Link>
  <nav><Link href="/notes"><BookOpen size={14}/>学习笔记</Link><Link href="/resources"><Compass size={14}/>资源导航</Link><Link href="/moments"><MessageCircle size={14}/>时刻</Link><Link href="/anime"><Clapperboard size={14}/>动漫</Link><Link href="/chat"><MessageCircle size={14}/>聊天室</Link><Link href="/about"><Sparkles size={14}/>关于</Link></nav>
  <form onSubmit={e=>{e.preventDefault();location.href="/search?q="+encodeURIComponent(q)}}><Search size={14}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索内容…"/></form>
  <button className="global-theme-toggle" aria-label="切换明暗主题" onClick={()=>{const next=!light;setLight(next);localStorage.setItem("theme",next?"light":"dark");document.documentElement.dataset.theme=next?"light":"dark"}}>{light?<Sun size={17}/>:<Moon size={17}/>}</button><UserMenu/>
 </header>
}
