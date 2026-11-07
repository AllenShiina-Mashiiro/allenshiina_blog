"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CalendarDays, ChevronRight, Github, Globe2, Home, Languages, Moon, Search, Sun, UserRound, Youtube, Pin, BookOpen, Compass, MessageCircle, Clapperboard, Megaphone, Sparkles, ArrowUpRight, Menu, X } from "lucide-react";
import SakuraPetals from "./SakuraPetals";
import UserMenu from "@/components/UserMenu";

const nav = [
  ["学习笔记", "/notes", BookOpen], ["资源导航", "/resources", Compass], ["时刻", "/moments", MessageCircle],
  ["动漫", "/anime", Clapperboard], ["聊天室", "/chat", MessageCircle], ["关于", "/about", Sparkles]
] as const;
const cards = [
  { title: "学习笔记", en: "STUDY NOTES", desc: "记录知识、灵感与值得反复阅读的内容。", meta: "12 篇笔记 · 最近更新 2 小时前", tag: "Markdown", href: "/notes", icon: BookOpen },
  { title: "资源导航", en: "RESOURCE HUB", desc: "把常用的网站、工具和开发资源收纳在这里。", meta: "28 个收藏 · 6 个分类", tag: "Useful links", href: "/resources", icon: Compass },
  { title: "时刻", en: "MOMENTS", desc: "生活切片、随手记录，以及最近发生的小事。", meta: "36 条动态 · 最近更新昨天", tag: "Daily life", href: "/moments", icon: MessageCircle },
  { title: "公告", en: "ANNOUNCEMENTS", desc: "网站更新、维护通知与值得分享的消息。", meta: "3 条公告 · 置顶 1 条", tag: "Site news", href: "/announcements", icon: Megaphone }
];

export default function HomeExperience() {
  const [dark, setDark] = useState(true);
  const [english, setEnglish] = useState(false);
  const [petals, setPetals] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState(""); const [preferencesReady,setPreferencesReady]=useState(false);
  const [stats, setStats] = useState({notes:0,tags:0,todayViews:0,totalWords:0,moments:0,announcements:0}); const [resourceCount,setResourceCount]=useState(0);
  const [recentNotes, setRecentNotes] = useState<Array<{id:string;slug:string;title:string;createdAt:string;wordCount:number;pinned?:boolean}>>([]); const [pinnedMoments,setPinnedMoments]=useState<Array<{id:string;content:string}>>([]);const [pinnedResources,setPinnedResources]=useState<Array<{id:string;title:string}>>([]);const [pinnedAnime,setPinnedAnime]=useState<Array<{id:string;title:string}>>([]);
  const [announcements, setAnnouncements] = useState<Array<{id:string;title:string;excerpt:string|null;publishedAt:string|null}>>([]);
  const [heroTitle,setHeroTitle] = useState("AllenShiina"); const [heroSubtitle,setHeroSubtitle] = useState("把喜欢的事物，慢慢收集起来。"); const [profileName,setProfileName]=useState("AllenShiina"); const [profileBio,setProfileBio]=useState("热爱代码、动漫与生活中的小小浪漫。"); const [profileAvatar,setProfileAvatar]=useState(""); const [profileCardImage,setProfileCardImage]=useState(""); const [profileUsername,setProfileUsername]=useState("allenshiina_admin"); const [logoUrl,setLogoUrl]=useState(""); const [bilibiliUrl,setBilibiliUrl]=useState("https://space.bilibili.com/1685223034"); const [githubUrl,setGithubUrl]=useState("https://github.com/AllenShiina-Mashiiro"); const [heroBackgrounds,setHeroBackgrounds] = useState<string[]>([]); const [heroIndex,setHeroIndex] = useState(0); const [customLinks,setCustomLinks] = useState<Array<{label:string;url:string}>>([]);
  useEffect(()=>{fetch("/api/visit",{method:"POST"}).catch(()=>{});fetch("/api/stats").then(r=>r.ok?r.json():null).then(v=>v&&setStats(v)).catch(()=>{});fetch("/api/notes").then(r=>r.ok?r.json():[]).then(v=>setRecentNotes(v.slice(0,2))).catch(()=>{});fetch("/api/moments").then(r=>r.ok?r.json():[]).then(v=>setPinnedMoments(v.filter((x:any)=>x.pinned).slice(0,2))).catch(()=>{});fetch("/api/resources").then(r=>r.ok?r.json():[]).then(v=>setPinnedResources(v.filter((x:any)=>x.pinned).slice(0,4))).catch(()=>{});fetch("/api/anime").then(r=>r.ok?r.json():[]).then(v=>setPinnedAnime(v.filter((x:any)=>x.pinned).slice(0,4))).catch(()=>{});fetch("/api/announcements").then(r=>r.ok?r.json():[]).then(setAnnouncements).catch(()=>{});fetch("/api/resources").then(r=>r.ok?r.json():[]).then(v=>setResourceCount(Array.isArray(v)?v.length:0)).catch(()=>{});fetch("/api/settings").then(r=>r.ok?r.json():{}).then((v:Record<string,string>)=>{if(v.siteTitle)setHeroTitle(v.siteTitle);if(v.siteSubtitle)setHeroSubtitle(v.siteSubtitle);if(v.profileName)setProfileName(v.profileName);if(v.profileBio)setProfileBio(v.profileBio);if(v.profileAvatar)setProfileAvatar(v.profileAvatar);if(v.profileUsername)setProfileUsername(v.profileUsername);if(v.logoUrl)setLogoUrl(v.logoUrl);if(v.bilibiliUrl)setBilibiliUrl(v.bilibiliUrl);if(v.githubUrl)setGithubUrl(v.githubUrl);if(v.heroBackgrounds){try{setHeroBackgrounds(JSON.parse(v.heroBackgrounds))}catch{}}}).catch(()=>{});},[]);
  useEffect(()=>{if(!profileUsername)return;fetch(`/api/profile/${encodeURIComponent(profileUsername)}`).then(r=>r.ok?r.json():null).then(v=>{if(!v)return;if(v.nickname)setProfileName(v.nickname);if(v.bio)setProfileBio(v.bio);if(v.image)setProfileAvatar(v.image);if(v.businessCard?.startsWith("http"))setProfileCardImage(v.businessCard);if(v.contactLinks){try{const parsed=JSON.parse(v.contactLinks);const items=Array.isArray(parsed)?parsed:Object.entries(parsed).map(([label,url])=>({label,url}));setCustomLinks(items.filter((x:any)=>typeof x.label==="string"&&typeof x.url==="string"&&(x.url.startsWith("https://")||x.url.startsWith("http://"))).slice(0,8))}catch{setCustomLinks([])}}}).catch(()=>{})},[profileUsername]);
  useEffect(()=>{const savedTheme=localStorage.getItem("theme");if(savedTheme)setDark(savedTheme!=="light");const savedPetals=localStorage.getItem("sakura-enabled");if(savedPetals!==null)setPetals(savedPetals!=="false");setPreferencesReady(true)},[]);
  useEffect(()=>{if(!preferencesReady)return;localStorage.setItem("theme",dark?"dark":"light");document.documentElement.dataset.theme=dark?"dark":"light"},[dark,preferencesReady]);
  useEffect(()=>{if(!preferencesReady)return;localStorage.setItem("sakura-enabled",String(petals));window.dispatchEvent(new CustomEvent("sakura-toggle",{detail:petals}))},[petals,preferencesReady]);
  useEffect(()=>{if(heroBackgrounds.length<2)return;const id=window.setInterval(()=>setHeroIndex(i=>(i+1)%heroBackgrounds.length),20000);return()=>clearInterval(id)},[heroBackgrounds]);
  const [month, setMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const monthLabel = new Intl.DateTimeFormat(english ? "en-US" : "zh-CN", { year: "numeric", month: "long" }).format(month);
  const days = useMemo(() => { const first = new Date(month.getFullYear(), month.getMonth(), 1).getDay(); const total = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate(); return [...Array(first).fill(null), ...Array.from({length: total}, (_,i)=>i+1)]; }, [month]);
  const t = (zh: string, en: string) => english ? en : zh;
  return <main className={dark ? "site dark" : "site light"}>
    {petals && <SakuraPetals count={38} opacity={0.8} wind={0.8} zIndex={4} />}
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar">
      <Link href="/" className="brand"><span className="brand-mark">{logoUrl?<img src={logoUrl} alt="Logo"/>:<Home size={17}/>}</span><span>{profileName}</span></Link>
      <nav className="desktop-nav">{nav.map(([label, href]) => <Link key={href} href={href}>{t(label, ({学习笔记:"Notes",资源导航:"Resources",时刻:"Moments",动漫:"Anime",聊天室:"Chat",关于:"About"} as Record<string,string>)[label])}</Link>)}</nav>
      <div className="nav-tools">
        <form className="searchbox" onSubmit={e=>{e.preventDefault(); location.href=`/search?q=${encodeURIComponent(query)}`}}><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("搜索内容…","Search…")}/></form>
        <button className="icon-button" title={t("切换语言","Switch language")} onClick={()=>setEnglish(!english)}><Languages size={17}/></button>
        <button className="icon-button" title={t("切换主题","Toggle theme")} onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
        <Link className="icon-button" href="/notifications" aria-label="Notifications"><Bell size={17}/></Link>
        <UserMenu/>
        <button className="mobile-menu icon-button" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen?<X/>:<Menu/>}</button>
      </div>
      {mobileOpen && <div className="mobile-nav">{nav.map(([label,href])=><Link key={href} href={href} onClick={()=>setMobileOpen(false)}>{label}<ChevronRight size={15}/></Link>)}</div>}
    </header>

    <section className="hero">
      <div className="hero-scene" style={heroBackgrounds[heroIndex]?{backgroundImage:`linear-gradient(180deg,rgba(12,27,39,.04),rgba(10,24,27,.15)),url(${heroBackgrounds[heroIndex]})`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}><div className="hero-split"/><div className="hero-glow"/><div className="tree tree-left"/><div className="tree tree-right"/><div className="hero-grain"/></div>
      <div className="hero-copy"><span className="eyebrow"><Sparkles size={13}/> A PERSONAL SPACE · EST. 2026</span><h1>{heroTitle}</h1><p>{english?"Collecting little things that make life beautiful.":heroSubtitle}</p><div className="hero-actions"><Link href="/about" className="primary-link">{t("认识一下","Get to know me")} <ArrowUpRight size={15}/></Link><Link href="/notes" className="ghost-link">{t("浏览笔记","Explore notes")} <ChevronRight size={15}/></Link></div></div>
      <div className="hero-bottom"><span>✿ &nbsp; 桜の季節、また会いましょう。</span><span>35° 41′ N · 139° 41′ E</span></div>
    </section>

    <div className="content-wrap">
      <aside className="left-column">
        <section className="profile-card glass-card">
          <div className="profile-cover"><span>🌸</span></div><div className="avatar-art">{profileAvatar?<img src={profileAvatar} alt="管理员头像"/>:<div className="avatar-face">A</div>}<span className="online-dot"/></div>
          <h2>{profileName}</h2><p className="handle">@{profileUsername}</p><p className="bio">{english?"In love with code, anime, and little moments.":profileBio}</p>{profileCardImage&&<img className="profile-business-card" src={profileCardImage} alt="AllenShiina 个人名片"/>}
          <div className="socials"><a href={bilibiliUrl} target="_blank" rel="noreferrer" aria-label="Bilibili"><Youtube size={16}/></a><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a>{customLinks.map((x,i)=><a key={`${x.url}-${i}`} href={x.url} target="_blank" rel="noreferrer" aria-label={x.label} title={x.label}><Globe2 size={16}/></a>)}<Link href={`/profile/@${encodeURIComponent(profileUsername)}`} aria-label="Personal page"><Globe2 size={16}/></Link></div>
          <div className="profile-stats"><div><b>{stats.notes}</b><span>{t("笔记","Notes")}</span></div><div><b>{stats.moments}</b><span>{t("时刻","Moments")}</span></div><div><b>—</b><span>{t("站点","Site")}</span></div></div>
        </section>
        <section className="glass-card pin-card"><div className="section-heading"><h3><Pin size={15}/> {t("图钉","Pinned")}</h3><span className="tiny-label">FEATURED</span></div>{recentNotes.filter(n=>n.pinned).map(n=><Link href={`/notes/${n.slug}`} className="pin-item" key={n.id}><span className="pin-icon">✧</span><span><b>{n.title}</b><small>学习笔记 · 置顶</small></span><ChevronRight size={15}/></Link>)}{pinnedMoments.map(m=><Link href={`/moments/${m.id}`} className="pin-item" key={m.id}><span className="pin-icon">🌸</span><span><b>{m.content.slice(0,28)||"时刻"}</b><small>时刻 · 置顶</small></span><ChevronRight size={15}/></Link>)}{pinnedResources.map(x=><Link href={`/resources/${x.id}`} className="pin-item" key={x.id}><span className="pin-icon">↗</span><span><b>{x.title}</b><small>资源导航 · 置顶</small></span><ChevronRight size={15}/></Link>)}{pinnedAnime.map(x=><Link href={`/anime/${x.id}`} className="pin-item" key={x.id}><span className="pin-icon">✿</span><span><b>{x.title}</b><small>动漫档案 · 置顶</small></span><ChevronRight size={15}/></Link>)}{!recentNotes.some(n=>n.pinned)&&pinnedMoments.length===0&&pinnedResources.length===0&&pinnedAnime.length===0&&<p className="empty-state">暂无置顶内容</p>}</section>
        <div className="petal-toggle glass-card"><span><Sparkles size={15}/> {t("樱花特效","Sakura petals")}</span><button className={petals?"switch active":"switch"} onClick={()=>setPetals(!petals)} aria-label="Toggle sakura"><i/></button></div>
      </aside>

      <section className="feed-column"><div className="welcome-row"><div><span className="eyebrow">WELCOME TO MY LITTLE WORLD</span><h2>{t("最近在这里","A little update")}</h2></div><span className="date-pill"><CalendarDays size={14}/> {new Date().toLocaleDateString(english?"en-US":"zh-CN")}</span></div>
        <div className="feature-list">{cards.map((card,i)=>{const Icon=card.icon;const liveMeta=i===0?`${stats.notes} 篇笔记 · ${stats.tags} 个标签`:i===1?`${resourceCount} 个资源 · 实际收录`:i===2?`${stats.moments} 条动态 · 实际发布`: `${announcements.length} 条公告 · 实际发布`;return <Link href={card.href} key={card.title} className={`feature-card feature-${i}`}><div className="feature-icon"><Icon size={19}/></div><div className="feature-body"><div className="feature-kicker">{card.en}</div><h3>{t(card.title,card.en.replace("STUDY NOTES","Study notes").replace("RESOURCE HUB","Resource hub").replace("MOMENTS","Moments").replace("ANNOUNCEMENTS","Announcements"))}</h3><p>{card.desc}</p><div className="feature-meta"><span>{liveMeta}</span><em>{card.tag}</em></div></div><span className="feature-arrow"><ChevronRight size={19}/></span></Link>})}</div>
        <section className="glass-card latest-card"><div className="section-heading"><h3>{t("最近更新","Recently updated")}</h3><Link href="/notes">{t("查看全部","View all")} <ArrowUpRight size={13}/></Link></div>{recentNotes.length?recentNotes.map(n=><Link href={`/notes/${n.slug}`} className="latest-row" key={n.id}><span className="latest-date">{new Date(n.createdAt).toLocaleDateString(english?"en-US":"zh-CN",{month:"short",day:"2-digit"})}</span><span className="latest-text"><b>{n.title}</b><small>学习笔记 · {n.wordCount} 字</small></span><span className="tag">#笔记</span></Link>):<p className="empty-state">还没有公开笔记</p>}</section>
      </section>

      <aside className="right-column"><section className="glass-card stats-card"><div className="section-heading"><h3>{t("站点统计","Site statistics")}</h3><span className="live-dot">LIVE</span></div><div className="stats-grid"><div><b>{stats.notes}</b><span>{t("笔记","Notes")}</span></div><div><b>{stats.tags}</b><span>{t("标签","Tags")}</span></div><div><b>{stats.todayViews.toLocaleString()}</b><span>{t("今日访问","Today")}</span></div><div><b>{stats.totalWords.toLocaleString()}</b><span>{t("总字数","Words")}</span></div></div><div className="stats-foot">持续记录，慢慢成长 <span>✿</span></div></section>
        <section className="glass-card calendar-card"><div className="section-heading"><h3>{t("日历","Calendar")}</h3><CalendarDays size={15}/></div><div className="calendar-top"><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}>‹</button><b>{monthLabel}</b><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}>›</button></div><div className="calendar-grid">{(english?["S","M","T","W","T","F","S"]:["日","一","二","三","四","五","六"]).map((d,i)=><span className="weekday" key={`${d}${i}`}>{d}</span>)}{days.map((d,i)=><span key={i} className={d===new Date().getDate()&&month.getMonth()===new Date().getMonth()&&month.getFullYear()===new Date().getFullYear()?"calendar-day marked":d?"calendar-day":"calendar-empty"}>{d||""}</span>)}</div><p className="calendar-note"><i/> {t("今天也要保持好心情。","Have a lovely day.")}</p></section>
        <section className="quote-card"><span>“</span><p>{t("生活不是等待风暴过去，而是学会在雨中跳舞。","Life isn't about waiting for the storm to pass.")}</p><small>— VIVID LITTLE MOMENTS</small></section>
      </aside>
    </div>
    {announcements.length>0&&<section className="announcement-strip glass-card"><div className="section-heading"><h3>📢 网站公告</h3><span className="tiny-label">ANNOUNCEMENTS</span></div>{announcements.map(a=><Link href={`/announcements/${a.id}`} className="latest-row" key={a.id}><span className="latest-date">{a.publishedAt?new Date(a.publishedAt).toLocaleDateString():"NEW"}</span><span className="latest-text"><b>{a.title}</b><small>{a.excerpt}</small></span><ChevronRight size={14}/></Link>)}</section>}
    <footer className="footer"><span>© {new Date().getFullYear()} AllenShiina</span><span>Made with <b>♥</b> and a little sakura</span><span><button onClick={()=>setDark(!dark)}>{dark?"Light mode":"Dark mode"}</button></span></footer>
  </main>;
}
