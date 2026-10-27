import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

import sampleApartment from "@/assets/vyomora-living-dining.jpg.asset.json";
import siteTour from "@/assets/vyomora-tower-exterior.jpg.asset.json";
import sampleApartmentVideo from "@/assets/vyomora-sample-apartment-walkthrough.mp4.asset.json";
import siteTourVideo from "@/assets/vyomora-virtual-site-tour.mp4.asset.json";

type Props = {
  onEnquire: (intent: string, cta?: string, title?: string, copy?: string) => void;
};

type Experience = {
  id: string;
  title: string;
  subtitle: string;
  thumb: string;
  video?: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "sample-apartment",
    title: "Sample Apartment",
    subtitle: "Vyomora — Hinjawadi Phase 1, Pune",
    thumb: sampleApartment.url,
    video: sampleApartmentVideo.url,
  },
  {
    id: "virtual-site-tour",
    title: "Virtual Site Tour",
    subtitle: "Vyomora — Hinjawadi Phase 1, Pune",
    thumb: siteTour.url,
    video: siteTourVideo.url,
  },
];

export default function VirtualExperience({ onEnquire }: Props) {
  return (
    <section
      id="experience"
      className="bg-background py-12 sm:py-14"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center" data-reveal>
          <p className="eyebrow text-gold">Virtual experience</p>
          <h2
            id="experience-heading"
            className="mt-3 text-3xl leading-tight text-primary sm:text-4xl"
          >
            Experience It Before You Live It
          </h2>
          <div className="hairline mx-auto mt-5 w-24" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{"\n"}</p>

        </div>

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
          {EXPERIENCES.map((item, i) => (
            <div key={item.id} className="reveal" data-reveal data-reveal-delay={i * 120}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    onEnquire(
                          item.id,
                          "Submit Enquiry",
                          `Enquire about the ${item.title.toLowerCase()}`,
                          "Share your details and our sales desk will contact you with more information.",
                        )
                  }
                  aria-label={`Enquire about the ${item.title}`}
                  className="group relative aspect-video h-auto w-full overflow-hidden rounded-xl p-0 shadow-soft transition duration-500 hover:scale-[1.015] hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <video
                    src={item.video}
                    poster={item.thumb}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <span
                    className="absolute inset-0 bg-ink/30 transition-colors duration-500 group-hover:bg-ink/40 motion-reduce:transition-none"
                    aria-hidden="true"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[40%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary-foreground shadow-lift transition-transform duration-300 group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  >
                    <Play
                      className="ml-0.5 h-4 w-4 text-primary sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </span>


                  <span className="absolute inset-x-4 bottom-6 block text-center transition-transform duration-500 group-hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none sm:bottom-8">
                    <span
                      className="block truncate font-display text-xl font-medium text-primary-foreground uppercase sm:text-3xl lg:text-4xl"
                    >
                      {item.title}
                    </span>
                  </span>
                </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
