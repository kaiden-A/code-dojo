import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Footer from "./components/Footer";
import DojoLoader from "./components/DojoLoader";

export default function Home() {
  return (
    <DojoLoader>
      <main>

        <Hero/>
        <About/>
        <Features/>

      </main>
    </DojoLoader>

  );
}
