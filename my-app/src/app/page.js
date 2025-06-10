"use client";
import React, {useState} from "react";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center">
        <video
        src="/assets/girl.mp4"
        autoPlay
        loop
        muted
        playsInline
        className=" mb-4 w-[70vw] h-[70vh]"
      />
      <Link href="/timer">
        <button
          onClick={()=>console.log("soak time initiated")}
          className="bg-amber-50 rounded-full p-4 text-background font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Soak Time 💦
        </button>
      </Link>
    </div>
  );
}
