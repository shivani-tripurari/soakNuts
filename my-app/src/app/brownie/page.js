"use client";
import React from "react";
import Link from "next/link";

const Brownie = () => {

    const points = localStorage.getItem("browniePoints");
    console.log("brownie points ", points);

    return(
        <div className="flex flex-col justify-center items-center">
                 <video
                    src="/assets/coins.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className=" mb-4 w-[70vw] h-[70vh]"
                />
            <h1 className="text-3xl font-bold">Brownie points : {points} ✨ </h1>
            <Link href="https://buymeacoffee.com/shivaniiii">
                <p className="text-base font-light underline mt-1">Show these points to steam momo to reedem exciting prices</p>
            </Link>
        </div>
    )
}
export default Brownie;

/**
 * I need to implement 24 hr reminder system upon clciking the soak button
 */