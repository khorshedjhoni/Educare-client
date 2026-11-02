import Image from "next/image";
import Banner from "./Components/Home/Banner";
import Gallery from "./Components/Gallery/Gallery";
import Newsletter from "./Components/Newsletter";
import RecentEvent from "./Components/RecentEvent/RecentEvent";
import { Suspense } from "react";
import Features from "./Components/Features";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Banner />
      <Features />
      <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading recent events...</div>}>
        <RecentEvent />
      </Suspense>
      <Gallery />
      <Newsletter />
    </main>
  );
}