import type { Metadata } from 'next';

import { CtaBand } from '@/components/site/CtaBand';
import { PageHero } from '@/components/site/PageHero';
import { TrustStats } from '@/components/site/HeroPillars';
import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import {
  IconArrowRight,
  IconBed,
  IconCheck,
  IconCompass,
  IconDocument,
  IconPhone,
  IconPlane,
  IconRoute,
  IconShield,
  IconUsers,
  IconWallet,
} from '@/components/ui/Icons';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'About Al-Tawakkal Tourism — a Umrah and Islamic travel service that plans flights, accommodation, transfers and ziyarat in Makkah and Madinah with clear pricing and practical guidance.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Al-Tawakkal Tourism',
    description: siteConfig.shortDescription,
  },
};

const missionPoints = [
  {
    title: 'Plan the whole journey, not just the ticket',
    description:
      'Flights, hotels, transfers, the permit process and ziyarat are arranged together so nothing is left to sort out on arrival.',
  },
  {
    title: 'Be honest about what a package includes',
    description:
      'Every package lists what is included and what is not. The total is confirmed in writing before you commit to anything.',
  },
  {
    title: 'Keep one point of contact',
    description:
      'You deal with the same person from your first enquiry through to your return flight, rather than passing between departments.',
  },
  {
    title: 'Build around your circumstances',
    description:
      'Travelling alone, as a couple, as a family or as a group — dates, room types and the number of nights in each city are adjustable.',
  },
];

const whyPoints = [
  {
    icon: <IconBed width={18} height={18} />,
    title: 'Hotel options we can explain',
    description:
      'We share the area, the walking distance and what the property is like — not just a star rating.',
  },
  {
    icon: <IconPlane width={18} height={18} />,
    title: 'Flights checked for your date',
    description:
      'Availability is confirmed for the dates you actually travel, with a connecting option offered where a direct one is not practical.',
  },
  {
    icon: <IconCompass width={18} height={18} />,
    title: 'Ziyarat arranged properly',
    description:
      'Guided routes in both Makkah and Madinah, planned to suit the time you have and the pace you want.',
  },
  {
    icon: <IconWallet width={18} height={18} />,
    title: 'Clear, itemised pricing',
    description:
      'You receive a written breakdown of the package and any separate costs before payment is due.',
  },
  {
    icon: <IconDocument width={18} height={18} />,
    title: 'Document guidance',
    description:
      'A clear checklist and step-by-step help with the visa and permit application process.',
  },
  {
    icon: <IconUsers width={18} height={18} />,
    title: 'Groups and families welcome',
    description:
      'Family groups, small groups and individual travellers are all planned the same way — carefully.',
  },
];

const assistance = [
  {
    step: 'Before you book',
    points: [
      'Clarifying which package suits your dates and group size',
      'Sharing hotel options and availability',
      'Explaining inclusions, exclusions and separate costs',
    ],
  },
  {
    step: 'While you prepare',
    points: [
      'Document checklist and application guidance',
      'Payment schedule and booking confirmation in writing',
      'Pre-travel guidance for flights, stay and documents',
    ],
  },
  {
    step: 'During your journey',
    points: [
      'Airport transfers and hotel check-in coordination',
      'Intercity transfer and ziyarat scheduling',
      'A reachable contact for questions on the ground',
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Al-Tawakkal Tourism"
        title="A calmer way to arrange your Umrah."
        lede="Al-Tawakkal Tourism plans Umrah journeys around Makkah and Madinah — flights, accommodation, transfers, the permit process and ziyarat arranged together, with clear information at every step."
        trail={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        artwork={{
          src: '/images/madinah-masjid.svg',
          alt: 'Arcaded courtyard with a green dome in Madinah',
        }}
      />

      {/* ---------------- About ---------------- */}
      <section className="section" id="about" aria-labelledby="about-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h2"
              eyebrow="Who we are"
              title={<span id="about-heading">About Al-Tawakkal Tourism.</span>}
            />
            <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.85] text-ink-soft">
              <p>
                Al-Tawakkal Tourism is a travel service focused on Umrah and Islamic tourism. We
                arrange complete journeys to Makkah and Madinah for individuals, families and
                groups, and we keep the planning in one place so that the details do not get lost
                between different providers.
              </p>
              <p>
                Most of the questions we are asked are practical ones: which hotel is in a good
                location, what is actually included in the price, what documents are needed, and
                how the ziyarat will be organised. We would rather answer those clearly at the
                start than leave them to be discovered later.
              </p>
              <p>
                That is the approach we take with every enquiry. We share the inclusions and the
                exclusions, confirm the arrangement in writing, and stay reachable for the duration
                of the trip. If a date, room type or the number of nights needs to change, we
                adjust the plan with you.
              </p>
            </div>

            <div className="mt-9 rounded-lg border border-line-soft bg-ivory-soft p-6">
              <p className="flex items-start gap-3 text-[0.85rem] leading-relaxed text-ink-soft">
                <IconShield width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  <strong className="font-medium text-charcoal">A note on this website.</strong>{' '}
                  This is a demonstration build prepared to show how the finished website will look
                  and work. Package prices, hotel names and schedules shown here are sample
                  content, and no certifications, licences or awards are claimed.
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[20px] border border-line-soft bg-[#FBF6EC] shadow-card">
              <Media
                src="/images/kaaba-makkah.svg"
                width={900}
                height={1000}
                alt="Illustration of the Kaaba within a cream coloured arcaded courtyard in Makkah"
                className="block h-auto w-full"
              />
            </div>
            <p className="mt-4 text-[0.78rem] text-ink-mute">
              Masjid al-Haram, Makkah — the focus of every itinerary we arrange.
            </p>

            <div className="mt-8 surface-card p-7">
              <h3 className="font-display text-[1.15rem] text-charcoal">At a glance</h3>
              <dl className="mt-5 space-y-3.5 text-[0.87rem]">
                {[
                  { label: 'Service', value: 'Umrah & Islamic tourism' },
                  { label: 'Destinations', value: 'Makkah & Madinah' },
                  { label: 'Package tiers', value: 'Economy, Premium, 5 Star' },
                  { label: 'Enquiries', value: 'Website form or WhatsApp' },
                  { label: 'Languages', value: 'English' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <dt className="text-ink-mute">{row.label}</dt>
                    <dd className="text-right font-medium text-charcoal">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Mission ---------------- */}
      <section
        className="section border-y border-line-soft bg-ivory-soft"
        id="mission"
        aria-labelledby="mission-heading"
      >
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              as="h2"
              eyebrow="Our mission"
              title={<span id="mission-heading">Make the journey easy to arrange and easy to trust.</span>}
              lede="Four things we hold ourselves to on every booking."
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <LinkButton href="/packages" variant="primary">
                Browse Umrah Packages
                <IconArrowRight width={16} height={16} />
              </LinkButton>
              <WhatsAppButton
                label="Ask a Question"
                message={`Assalamu Alaikum, I have a question about your Umrah packages.`}
              />
            </div>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {missionPoints.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 70}>
                <div className="surface-card h-full p-7">
                  <span className="font-display text-[1.4rem] text-gold/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3.5 font-display text-[1.14rem] leading-snug text-charcoal">
                    {point.title}
                  </h3>
                  <p className="mt-2.5 text-[0.87rem] leading-[1.75] text-ink-soft">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Why choose us ---------------- */}
      <section className="section" id="why-choose-us" aria-labelledby="why-heading">
        <div className="container-page">
          <SectionHeading
            as="h2"
            eyebrow="Why choose us"
            title={<span id="why-heading">What you can expect from us.</span>}
            lede="Practical things that make an Umrah trip run smoothly — not promises we cannot keep."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line-soft bg-line-soft md:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((item, index) => (
              <li key={item.title} className="bg-white p-7 transition-colors duration-500 hover:bg-ivory-soft">
                <Reveal delay={index * 60}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 font-display text-[1.1rem] leading-snug text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.86rem] leading-[1.72] text-ink-soft">
                    {item.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Journey assistance ---------------- */}
      <section
        className="section border-y border-line-soft bg-ivory-soft"
        id="journey-assistance"
        aria-labelledby="assistance-heading"
      >
        <div className="container-page">
          <SectionHeading
            as="h2"
            eyebrow="Umrah journey assistance"
            title={<span id="assistance-heading">Support at every stage of the trip.</span>}
            lede="From the first message to the flight home, here is what we take care of."
          />

          <div className="mt-12 grid gap-7 lg:grid-cols-3">
            {assistance.map((block, index) => (
              <Reveal key={block.step} delay={index * 90}>
                <div className="surface-card h-full overflow-hidden">
                  <div className="border-b border-line-soft px-7 py-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                      Stage {index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-[1.15rem] text-charcoal">{block.step}</h3>
                  </div>
                  <ul className="space-y-3.5 p-7">
                    {block.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.86rem] leading-[1.7] text-ink-soft"
                      >
                        <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Customer service ---------------- */}
      <section className="section" id="customer-service" aria-labelledby="service-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              as="h2"
              eyebrow="Customer-focused service"
              title={<span id="service-heading">You are the person we plan for.</span>}
              lede="A short account of what customer-focused service means in practice for us."
            />
            <ul className="mt-9 space-y-4">
              {[
                'One point of contact from enquiry through to your return flight',
                'Written confirmation of the arrangement before any payment',
                'Reasonable office hours, and a reply to every enquiry',
                'Adjustments handled directly instead of being passed around',
                'Clear information on costs that are not part of the package price',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9rem] text-ink-soft">
                  <IconCheck width={16} height={16} className="mt-1 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact#enquiry" variant="primary">
                Send an Enquiry
                <IconArrowRight width={16} height={16} />
              </LinkButton>
              <WhatsAppButton
                label="WhatsApp Us"
                message={`Assalamu Alaikum, I would like to speak to ${siteConfig.name} about an Umrah package.`}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <IconPhone width={18} height={18} />,
                  title: 'Talk to a person',
                  body: 'Enquiries are answered by our team, not an automated reply. Tell us your situation and we will suggest the practical option.',
                },
                {
                  icon: <IconRoute width={18} height={18} />,
                  title: 'Planned end to end',
                  body: 'Transfers, check-ins, the intercity journey and ziyarat are coordinated so the days in between are not left empty.',
                },
                {
                  icon: <IconCompass width={18} height={18} />,
                  title: 'Ziyarat with a guide',
                  body: 'Guided routes in both cities, paced to the time available and to how much walking suits your group.',
                },
                {
                  icon: <IconDocument width={18} height={18} />,
                  title: 'Paperwork handled clearly',
                  body: 'You receive a document checklist early, with help if anything needs to be corrected or resubmitted.',
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="surface-card h-full p-7">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-gold/[0.07] text-gold">
                      {item.icon}
                    </span>
                    <h3 className="mt-5 font-display text-[1.08rem] leading-snug text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.86rem] leading-[1.72] text-ink-soft">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStats />
      <CtaBand
        eyebrow="Let us help you plan"
        title="Tell us your dates and how many people are travelling."
        description="We will come back with available options, an explanation of what is included, and a written quote you can review at your own pace."
      />
    </>
  );
}
