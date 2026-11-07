import ContentWorkspace from "@/components/ContentWorkspace";
export default function SectionPage({section}:{section:"notes"|"resources"|"moments"|"anime"|"chat"}){return <ContentWorkspace section={section}/>}
