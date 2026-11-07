import type { Metadata } from "next";import type { ReactNode } from "react";import "./globals.css";import "katex/dist/katex.min.css";import "highlight.js/styles/github-dark.css";
import "photoswipe/style.css";
import GlobalEffects from "@/components/GlobalEffects";
export const metadata:Metadata={title:{default:"AllenShiina — A little corner of the internet",template:"%s | AllenShiina"},description:"学习笔记、资源导航、时刻与动漫档案。一个属于自己的小小互联网角落。",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"),openGraph:{title:"AllenShiina",description:"A little corner of the internet",type:"website"},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="zh-CN" suppressHydrationWarning><body>{children}<GlobalEffects/></body></html>}
