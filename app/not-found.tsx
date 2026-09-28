import { LinkButton, WhatsAppButton } from '@/components/ui/Button';
import { IconArrowRight, IconSearch } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.07] text-gold">
            <IconSearch width={24} height={24} />
          </span>

          <p className="eyebrow mt-8 justify-center">
            <span className="eyebrow-rule" aria-hidden="true" />
            Page not found
            <span className="eyebrow-rule" aria-hidden="true" />
          </p>

          <h1 className="display-2 mt-5 text-balance">This page could not be found.</h1>

          <p className="lede mx-auto mt-5 max-w-lg text-pretty">
            The link may be out of date, or the page may have been moved. The links below will get
            you back on track.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/" variant="primary" size="lg">
              Back to home
              <IconArrowRight width={17} height={17} />
            </LinkButton>
            <LinkButton href="/packages" variant="outline" size="lg">
              Browse Umrah Packages
            </LinkButton>
          </div>

          <div className="mt-4 flex justify-center">
            <WhatsAppButton label="Ask us on WhatsApp" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
