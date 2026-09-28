import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import { IconArrowRight, IconClock, IconMail, IconPhone } from '@/components/ui/Icons';
import { contactConfig, siteConfig } from '@/lib/config';

interface CtaBandProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** `dark` = espresso panel, `light` = ivory with a hairline border. */
  tone?: 'dark' | 'light';
  showContactDetails?: boolean;
}

export function CtaBand({
  eyebrow = 'Enquire today',
  title = 'Tell us your dates. We will take care of the rest.',
  description = 'Send an enquiry and we will reply with available hotels, flight options and a written quote. No obligation, and no pressure.',
  tone = 'dark',
  showContactDetails = true,
}: CtaBandProps) {
  const dark = tone === 'dark';

  return (
    <section className="section-tight" aria-labelledby="cta-heading">
      <div className="container-page">
        <div
          className={`relative overflow-hidden rounded-[22px] px-7 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16 ${
            dark ? 'bg-espresso text-cream-soft' : 'border border-line-soft bg-ivory-soft text-ink'
          }`}
        >
          {/* Geometric watermark */}
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-[420px] w-[420px] opacity-[0.09]"
            style={{
              backgroundImage: 'url(/images/pattern-geometric.svg)',
              backgroundSize: '150px 150px',
            }}
            aria-hidden="true"
          />
          {/* Arcade motif along the bottom edge */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] opacity-[0.16]"
            style={{
              backgroundImage: 'url(/images/pattern-arches.svg)',
              backgroundSize: '220px 132px',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'repeat-x',
            }}
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-7">
              <p className={`eyebrow mb-4 ${dark ? 'text-gold-soft' : ''}`}>
                <span className="eyebrow-rule" aria-hidden="true" />
                {eyebrow}
              </p>
              <h2
                id="cta-heading"
                className={`display-3 text-balance ${dark ? 'text-cream' : 'text-charcoal'}`}
              >
                {title}
              </h2>
              <p
                className={`lede mt-5 max-w-xl ${dark ? 'text-cream-soft/75' : 'text-ink-soft'}`}
              >
                {description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton
                  href="/contact#enquiry"
                  variant={dark ? 'gold' : 'primary'}
                  size="lg"
                >
                  Send an Enquiry
                  <IconArrowRight width={17} height={17} />
                </LinkButton>
                <WhatsAppButton
                  label="Enquire on WhatsApp"
                  variant={dark ? 'whatsapp-light' : 'whatsapp'}
                  size="lg"
                  message={`Assalamu Alaikum, I would like to enquire about an Umrah package with ${siteConfig.name}.`}
                />
              </div>
            </div>

            {showContactDetails ? (
              <div className="lg:col-span-5">
                <div
                  className={`rounded-lg border p-7 ${
                    dark ? 'border-white/12 bg-white/[0.04]' : 'border-line bg-white'
                  }`}
                >
                  <h3 className={`text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${dark ? 'text-gold-soft' : 'text-gold'}`}>
                    Talk to us directly
                  </h3>
                  <ul className="mt-6 space-y-5 text-[0.9rem]">
                    <li className="flex items-start gap-3.5">
                      <IconPhone
                        width={17}
                        height={17}
                        className={`mt-0.5 shrink-0 ${dark ? 'text-gold-soft' : 'text-gold'}`}
                      />
                      <div>
                        <p className={`text-[0.7rem] uppercase tracking-[0.14em] ${dark ? 'text-cream-soft/50' : 'text-ink-mute'}`}>
                          Phone
                        </p>
                        <a
                          href={`tel:${contactConfig.phoneHref}`}
                          className={`mt-0.5 block transition-colors ${dark ? 'hover:text-gold-soft' : 'hover:text-gold'}`}
                        >
                          {contactConfig.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <IconMail
                        width={17}
                        height={17}
                        className={`mt-0.5 shrink-0 ${dark ? 'text-gold-soft' : 'text-gold'}`}
                      />
                      <div>
                        <p className={`text-[0.7rem] uppercase tracking-[0.14em] ${dark ? 'text-cream-soft/50' : 'text-ink-mute'}`}>
                          Email
                        </p>
                        <a
                          href={contactConfig.emailHref}
                          className={`mt-0.5 block break-all transition-colors ${dark ? 'hover:text-gold-soft' : 'hover:text-gold'}`}
                        >
                          {contactConfig.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <IconClock
                        width={17}
                        height={17}
                        className={`mt-0.5 shrink-0 ${dark ? 'text-gold-soft' : 'text-gold'}`}
                      />
                      <div>
                        <p className={`text-[0.7rem] uppercase tracking-[0.14em] ${dark ? 'text-cream-soft/50' : 'text-ink-mute'}`}>
                          Business hours
                        </p>
                        <p className="mt-0.5">Mon – Sat · 10:00 AM – 7:30 PM</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
