import Image from "next/image";
import Banner from "./Components/Home/Banner";
import Gallery from "./Components/Gallery/Gallery";
import Newsletter from "./Components/Newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Banner />
      <Gallery />
      <Newsletter />
    </main>
  );
}
