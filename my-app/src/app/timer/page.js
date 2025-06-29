"use client";
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";

const Timer = () => {

    const now = new Date().getTime();
    // console.log(now.toString(),",", Date.now());
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

    //only runs on mount, deduction of brownie points
    useEffect(()=>{
        //time when start is clicked
        const now = Date.now();
        //time when start was clicked last time
        const lastStartTimeStamp = parseInt(localStorage.getItem("lastStart")||0, 10);
        //time when brownie points were last deducted
        const lastDeductedTimeStamp = parseInt(localStorage.getItem("lastDeductedAt")||0, 10); 
        console.log("time-stamps", lastStartTimeStamp, now, lastDeductedTimeStamp);

        const TWENTY_FOUR_HOURS = 24*60*60*1000;
        // const TWENTY_FOUR_HOURS = 10*1000; ---> testing

        const hasbeenTime = now - lastStartTimeStamp > TWENTY_FOUR_HOURS;
        const hasbeenDeducted = now - lastDeductedTimeStamp < TWENTY_FOUR_HOURS;
        
        //deduction of browniePoints if interval is more than 24hrs
        if(hasbeenTime && !hasbeenDeducted){
            const prevPoints = parseInt(localStorage.getItem("browniePoints")) || 0;
            const newPoints = Math.max(prevPoints-1, 0);
            localStorage.setItem("browniePoints", newPoints.toString());
            localStorage.setItem("lastDeductedAt", now.toString());

            console.log("BrowniePoints deducted ", newPoints);
        }else{
            console.log("no deduction");
        }
    }, []);

    //for toggling buttons + maintaining brownie points + tracking last clicked
    const handleToggle = () => {
        if(isRunning){
            setIsRunning(false);
        }else{
            //time now
            const now = Date.now();
            //timer
            setTimeLeft(3 * 60);
            setIsRunning(true);
            //increment brownie points
            const prevPoints = parseInt(localStorage.getItem("browniePoints")) || 0 ;
            localStorage.setItem("browniePoints", prevPoints + 1);

            //lastStart timestamp
            localStorage.setItem("lastStart", now.toString());

            //lastDeducted timestamp
            localStorage.setItem("lastDeductedAt", 0);

            const lastStartAtTimeStamp = localStorage.getItem("lastStart");
            const lastDeductedAtTimeStamp = localStorage.getItem("lastDeductedAt");
            console.log("local ", prevPoints,lastStartAtTimeStamp,lastDeductedAtTimeStamp );

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
 * when start is clicked ---> 1 brownie point
 * when start is not clicked in 24 hrs of clicking the previous start button, ---> -1 brownie point
 * we calculate now - lastStart to check if the time interval crossed 24hrs
 */

/**
 * The jsx part --->
 * A gif
 * A header 
 * A timer countdown
 * A button - toggles b/w start and stop
 * A checkbox
 */

/**
 * localstorage --->
 * browniePoints - whenever user clicks Start button
 * lastStart - to track when Start button was clikcked last time
 */
