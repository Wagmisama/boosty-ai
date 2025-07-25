import { Button } from "@/components/ui/button";
import { MarketingScene3D } from "./MarketingScene3D";

export function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-hero flex items-center pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Boost Your Business
                </span>
                <br />
                <span className="text-foreground">
                  with AI-Powered Marketing
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Digital growth. Automated systems. Measurable results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero" className="group">
                Choose a Plan
                <div className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </div>
              </Button>
              <Button variant="outline_hero" size="hero">
                Book a Free Audit
              </Button>
            </div>
          </div>

          {/* 3D Scene Side */}
          <div className="lg:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full animate-pulse-glow" />
              
              {/* 3D Scene Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden animate-float">
                <MarketingScene3D />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}