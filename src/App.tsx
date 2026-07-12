import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { CapsuleMenu } from "@/components/sections/CapsuleMenu";
import { Assistant } from "@/components/sections/Assistant";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

function AppInner() {
  return (
    <>
      <CapsuleMenu />
      <Assistant />

      <main className="max-w-2xl mx-auto px-5 sm:px-6 md:px-8 md:max-w-2xl max-w-full">
        <div className="section-snap">
          <Hero />
        </div>
        <div className="section-snap">
          <About />
        </div>
        <div className="section-snap">
          <Work />
        </div>
        <div className="section-snap">
          <Experience />
        </div>
        <div className="section-snap">
          <Skills />
        </div>
        <div className="section-snap">
          <Contact />
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppInner />
      </I18nProvider>
    </ThemeProvider>
  );
}
