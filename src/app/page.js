import Image from "next/image";
import Banner from "./Components/Home/Banner";
import Gallery from "./Components/Gallery/Gallery";
import Newsletter from "./Components/Newsletter";
import RecentEvent from "./Components/RecentEvent/RecentEvent";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Banner />
      <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading recent events...</div>}>
        <RecentEvent />
      </Suspense>
      <Gallery />
      <Newsletter />
    </main>
  );
}
