import RecentProduct from "@/components/sections/resent";
import SectionOne from "./_components/SectionOne";
import SectionTwo from "./_components/SectionTwo";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    
    <div>
      <Hero/>
      <div className="min-h-24"></div>
      <SectionOne/>
      <SectionTwo/>
      <div className="min-h-24"></div>
      <RecentProduct/>
    </div>
  );
}