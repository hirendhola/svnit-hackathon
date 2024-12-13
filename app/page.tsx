"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import InteractiveHoverComponent from "@/components/ui/InteractiveHoverComponent";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center flex-col	 ">
        <BackgroundLines className="bg-black">
          <InteractiveHoverComponent text="SVNIT-HACKATHON" duration={0.7} />
        </BackgroundLines>

        <Button className="absolute top-[70%] cursor-pointer z-20 bg-transparent text-2xl">
          <Link href="/model">Take me</Link>
        </Button>
      </div>
    </>
  );
}
