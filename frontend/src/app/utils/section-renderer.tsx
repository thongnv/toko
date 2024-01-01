import Home from "../components/Hero";
import Features from "../components/Features";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Home key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />
    default:
      return null;
  }
}
