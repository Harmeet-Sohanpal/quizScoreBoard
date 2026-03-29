
import tickingSound from '../../assets/kbc.mp3'
import timeup from '../../assets/buzzer.mp3'
const ticking = new Audio(tickingSound)
const buzz = new Audio(timeup);
import { useEffect, useState } from 'react';

const Timer = () => {
    const [isRunning, setIsrunning] = useState(false);
    const [time, setTime] = useState(0);
    useEffect(() => {
        if (!isRunning) return;

        let timer = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    ticking.pause();
                    ticking.currentTime = 0;
                    setIsrunning(false);
                    return 0;
                }

                if (prev > 1) {
                    // ticking.currentTime = 0;
                    ticking.play().catch((e) => console.warn("Audio blocked:", e));
                } else {
                    buzz.currentTime = 0;
                    buzz.play()
                    ticking.currentTime = 0;
                    ticking.pause();
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    const resetTimer = () => {
        setTime(0);
        ticking.currentTime = 0;
        ticking.pause();
        setIsrunning(false);
    }

    return (
        <div className='flex flex-col pt-30 bg-blue-200 min-h-[100vh]'>
            <div className='flex text-4xl items-center gap-2 font-semibold flex-col'>
                <p className='text-9xl bg-black/80 text-white p-4 rounded-lg w-fit text-center font-mono'>{`${Math.floor(time / 60)}`.padStart(2, 0)}:
                    {`${time % 60}`.padStart(2, 0)}</p>
            </div>
            <div className='flex flex-col items-center text-2xl mt-5 gap-3'>
                {/* <div>
                            <select className='bg-black/80 text-white rounded-lg px-2 py-0' onChange={handleInput} value={time ? time / 60 : ""} id="">
                                <option value="">Select Time</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minute</option>
                                <option value="3">3 minute</option>
                                <option value="4">4 minute</option>
                                <option value="5">5 minute</option>
                            </select>
                        </div> */}
                <div className='grid grid-cols-3  gap-3 mt-4'>
                    <div onClick={() => { setTime(15); setIsrunning(true) }} className='text-2xl bg-blue-600 p-2 rounded-md text-white'>15s</div>
                    <div onClick={() => { setTime(20); setIsrunning(true) }} className='text-2xl bg-blue-600 p-2 rounded-md text-white'>20s</div>
                    <div onClick={() => { setTime(30); setIsrunning(true) }} className='text-2xl bg-blue-600 p-2 rounded-md text-white'>30s</div>
                    <div onClick={() => { setTime(45); setIsrunning(true) }} className='text-2xl bg-blue-600 p-2 rounded-md text-white'>45s</div>
                    <div onClick={() => { setTime(60); setIsrunning(true) }} className='text-2xl bg-blue-600 p-2 rounded-md text-white'>60s</div>
                    <div onClick={() => { setTime(90); setIsrunning(true) }} className='text-2xl bg-blue-600 p-2 rounded-md text-white'>90s</div>


                </div>
                <div className='flex cursor-pointer gap-2'>
                    <div onClick={resetTimer} ><p className='bg-blue-600 text-white px-2 py-1 rounded-lg'>Reset</p></div>
                </div>
            </div>
        </div>
    )
}

export default Timer