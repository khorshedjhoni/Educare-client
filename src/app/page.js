import Image from "next/image";
import Banner from "./Components/Home/Banner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Banner />
    </main>
  );
}
