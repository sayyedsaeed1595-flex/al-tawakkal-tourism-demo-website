import Image, { type ImageProps } from 'next/image';

type MediaProps = Omit<ImageProps, 'fill'>;

/**
 * Thin wrapper around `next/image`.
 *
 * `images.unoptimized` is enabled in next.config.ts because the project ships a
 * static export for Cloudflare Pages (no image-optimisation server available).
 * All artwork is hand-authored SVG, so it is already minimal — these files are
 * served straight from the CDN and stay well inside a few kilobytes.
 */
export function Media(props: MediaProps) {
  // `alt` is a required prop of MediaProps, but the spread form hides it from
  // the static jsx-a11y/alt-text check.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
}
