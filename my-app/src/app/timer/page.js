"use client";
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";

const Timer = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3*60);

    const[isCheck, setIsCheck] = useState(false);

    const intervalRef = useRef(null);

    //function to format time
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    }

    //re-renders whenerver isRunning changes
    useEffect(()=>{
        //updates every 1 sec
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setTimeLeft((prev) => {
                    if(prev <= 1){
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000);
        } else {
            clearInterval(intervalRef.current)
        }
        //clean on un-mount
        return () => clearInterval(intervalRef.current);
    } , [isRunning]);

    //for toggling buttons + maintaining brownie points
    const handleToggle = () => {
        if(isRunning){
            setIsRunning(false);
        }else{
            setTimeLeft(3 * 60);
            setIsRunning(true);
            //brownie points
            const prevPoints = parseInt(localStorage.getItem("browniePoints")) || 0 ;
            localStorage.setItem("browniePoints", prevPoints + 1);
        }
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <video
                src="/assets/hearts.mp4"
                autoPlay
                loop
                muted
                playsInline
                className=" mb-4 w-[60vw] h-[60vh]"
            />
            <h1 className="text-4xl font-bold ">{formatTime(timeLeft)}</h1>
             <p className="mt-6 text-white/70 p-4 text-center text-base font-light">Soaking will take max 3 mins of your day, click on Start when you are ready</p>
            <button 
                onClick={handleToggle}
                className="mt-6 bg-amber-50 rounded-full py-4 px-2 w-32 text-background font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
                {isRunning ? "Stop" : "Start"}
            </button>
            <div className="mt-6 flex flex-col justify-center items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isCheck}
                          onChange={(e)=>(setIsCheck(e.target.checked))}
                          className="w-5 h-5 border border-white"
                          />
                          I agree that I am being honest
                      </label>
                      {isCheck && (
                        <Link 
                          href="/brownie"
                          className="mt-4 text-amber-50 font-semibold underline hover:text-amber-800 transition"
                        >
                          My rewards ✨
                        </Link>
                      )}
                  </div>
        </div>
    )
}

export default Timer;

/**
 * a timer ---> 
 * runs for 3 mins on clicking start and stops on clicking stop button
 */