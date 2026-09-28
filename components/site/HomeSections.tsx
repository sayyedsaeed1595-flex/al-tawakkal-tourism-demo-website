import { LinkButton } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconCompass,
  IconDocument,
  IconPhone,
  IconPlane,
  IconRoute,
  IconWallet,
} from '@/components/ui/Icons';
import { PackageGrid } from '@/components/site/PackagesCatalogue';

export function FeaturedPackages() {
  return (
    <section className="section relative overflow-hidden" id="packages">
      <div className="container-page">
        <SectionHeading
          eyebrow="Umrah Packages"
          title="Choose the package that fits your journey."
          lede="Three clearly structured options — from a straightforward stay to a full twelve-night itinerary. Every package page lists exactly what is and is not included."
          action={
            <LinkButton href="/packages" variant="outline">
              View all packages
              <IconArrowRight width={16} height={16}  />
            </LinkButton>
          }
         />

        <div className="mt-14">
          <PackageGrid limit={3} onlyFeatured />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   How the journey works
   --------------------------------------------------------------------------- */
const steps = [
  {
    step: '01',
    title: 'Send your enquiry',
    description:
      'Share your travel date, number of travellers and preferred package. Use the form or send us a WhatsApp message — whichever is easier.',
    icon: <IconPhone width={18} height={18}  />,
  },
  {
    step: '02',
    title: 'Review options & quote',
    description:
      'We come back with available hotels, flight options and a written, itemised quote so the total is clear before you commit.',
    icon: <IconWallet width={18} height={18}  />,
  },
  {
    step: '03',
    title: 'Documents & permit',
    description:
      'You receive a clear document checklist and step-by-step guidance for the visa and permit process. We help you avoid errors.',
    icon: <IconDocument width={18} height={18}  />,
  },
  {
    step: '04',
    title: 'Travel with assistance',
    description:
      'Airport transfers, hotel check-ins and ziyarat are arranged. Our team stays reachable for the whole journey.',
    icon: <IconRoute width={18} height={18}  />,
  },
];

export function JourneySteps() {
  return (
    <section className="section border-y border-line-soft bg-ivory-soft" aria-labelledby="journey-heading">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How it works"
              title={<span id="journey-heading">From first message to your return flight.</span>}
              lede="A simple four-step process, with the same point of contact throughout."
             />
            <div className="mt-9 overflow-hidden rounded-[20px] border border-line-soft">
              <Media
                src="/images/makkah-mountains.svg"
                width={1200}
                height={360}
                alt="Layered mountains and arcades of Makkah in warm sand tones"
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
               />
            </div>
          </div>

          <ol className="lg:col-span-7">
            {steps.map((item, index) => (
              <Reveal as="li" key={item.step} delay={index * 80}>
                <div className="group flex gap-5 border-b border-line-soft py-7 first:pt-0 last:border-b-0 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-white text-gold transition-colors duration-300 group-hover:border-gold/50">
                      {item.icon}
                    </span>
                    {index < steps.length - 1 ? (
                      <span className="mt-3 hidden w-px flex-1 bg-line sm:block" aria-hidden="true"  />
                    ) : null}
                  </div>
                  <div className="pb-1">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                      Step {item.step}
                    </p>
                    <h3 className="mt-2 font-display text-[1.2rem] leading-snug text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.89rem] leading-[1.75] text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Why choose us
   --------------------------------------------------------------------------- */
const reasons = [
  {
    title: 'Clear inclusions, no ambiguity',
    description:
      'Each package lists what is included and what is not, so you know the total before you travel.',
    icon: <IconCheck width={18} height={18}  />,
  },
  {
    title: 'Hotel choices reviewed',
    description:
      'We look at location, access to the Haram, room quality and comfort rather than just the star rating.',
    icon: <IconCompass width={18} height={18}  />,
  },
  {
    title: 'Flights checked for your date',
    description:
      'We confirm the best available routing for the dates you travel instead of quoting a fixed schedule.',
    icon: <IconPlane width={18} height={18}  />,
  },
  {
    title: 'Dates and hotels can change',
    description:
      'Plans shift. Hotels, room types and travel dates are flexible and confirmed with you in writing.',
    icon: <IconCalendar width={18} height={18}  />,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why choose us"
              title={<span id="why-heading">Planning Umrah should feel calm, not complicated.</span>}
              lede="We keep the process straightforward: honest information, sensible hotel options, and a real person to answer your questions."
             />
            <ul className="mt-9 space-y-4">
              {reasons.map((reason) => (
                <li key={reason.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                    {reason.icon}
                  </span>
                  <div>
                    <p className="text-[0.94rem] font-medium text-charcoal">{reason.title}</p>
                    <p className="mt-1 text-[0.86rem] leading-[1.7] text-ink-soft">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[22px] border border-line-soft bg-white shadow-card">
              <Media
                src="/images/madinah-masjid.svg"
                width={1200}
                height={420}
                alt="Arcaded courtyard with a green dome in Madinah"
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
               />
              <div className="border-t border-line-soft p-7 sm:p-9">
                <h3 className="font-display text-[1.4rem] leading-snug text-charcoal sm:text-[1.6rem]">
                  A complete Umrah journey, arranged in one place.
                </h3>
                <p className="mt-3.5 max-w-xl text-[0.92rem] leading-[1.8] text-ink-soft">
                  Flights, accommodation, transfers, the visa process and ziyarat in both cities —
                  planned together so nothing is left to figure out on arrival. If your dates,
                  budget or group size changes, we adjust the plan with you.
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line-soft pt-7 sm:grid-cols-4">
                  {[
                    { value: '2', label: 'Holy cities' },
                    { value: '3', label: 'Package tiers' },
                    { value: '2', label: 'Guided ziyarat' },
                    { value: '1', label: 'Point of contact' },
                  ].map((item) => (
                    <div key={item.label}>
                      <dd className="font-display text-[1.7rem] leading-none text-gold">{item.value}</dd>
                      <dt className="mt-2 text-[0.78rem] leading-snug text-ink-mute">{item.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
