import type { NextConfig } from "next";

//https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1777244731064-e2080074-b03f-4a02-998f-da583034a6a6-Black-and-Gold-Bold-Legal-Advisor-LinkedIn-Banner.webp

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev',
}]
   }}

export default nextConfig;
