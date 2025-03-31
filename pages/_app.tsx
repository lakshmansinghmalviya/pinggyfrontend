import "@/styles/globals.css";
import type { AppProps } from "next/app";
<script async src="node_modules/@material-tailwind/html/scripts/ripple.js"></script>

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
