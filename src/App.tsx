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
import { Seo } from "@/components/ui/Seo";

function AppInner() {
  return (
    <>
      <Seo />
      <CapsuleMenu />
      <Assistant />

      {/* Top page gradient fade */}
      <div className="fixed top-0 left-0 right-0 h-16 sm:h-24 z-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
        }}
      />

      {/* Bottom page gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 z-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
        }}
      />

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
