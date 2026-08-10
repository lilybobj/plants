// next/image does not automatically prepend basePath to a plain string `src`
// (only to statically-imported images), so on GitHub Pages every /images/...
// request 404s without this. A custom loader is the standard fix.
//
// There's no real resizing backend behind this — GitHub Pages just serves
// the original file regardless of the query string — but Next still wants
// the loader to acknowledge `width` for its responsive srcset generation.
export default function githubPagesLoader({ src, width }: { src: string; width: number }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${src}?w=${width}`;
}
