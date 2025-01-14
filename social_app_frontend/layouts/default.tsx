import { Link } from "@nextui-org/link";
import { useRouter } from "next/router";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      {router.pathname === "/" ? null : <Navbar />}
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
