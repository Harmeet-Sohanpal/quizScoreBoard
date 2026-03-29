import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';
import tickingSound from '../../assets/kbc.mp3'
import timeup from '../../assets/buzzer.mp3'

const ticking = new Audio(tickingSound)
const buzz = new Audio(timeup);

const Home = () => {

    const [isRunning, setIsrunning] = useState(false);
    const [time, setTime] = useState(0);
    const [flash, setFlash] = useState({});

    const defaultTeams = [
        { id: 1, team: 'Jal', score: 0 },
        { id: 2, team: 'Vayu', score: 0 },
        { id: 3, team: 'prithvi', score: 0 },
        { id: 4, team: 'Agni', score: 0 },
        { id: 5, team: 'Aakash', score: 0 },
        { id: 6, team: 'Dhvanee', score: 0 },
    ];

    const [teams, setTeams] = useState(() => {
        try {
            const saved = localStorage.getItem('teams');
            return saved ? JSON.parse(saved) : defaultTeams;
        } catch (error) {
            console.error("Error parsing localStorage:", error);
            return defaultTeams;
        }
    });

    useEffect(() => { if (!isRunning) { ticking.pause(); ticking.currentTime = 0; } }, [isRunning])



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


    const handleIncrement = (id) => {
        setTeams((prev) =>
            prev.map((team) =>
                team.id === id ? { ...team, score: team.score + 10 } : team
            )
        );

        setFlash((prev) => ({ ...prev, [id]: "plus" }));

        setTimeout(() => {
            setFlash((prev) => ({ ...prev, [id]: null }));
        }, 2000);
    };

    const handleDecrement = (id) => {
        setTeams((prev) =>
            prev.map((team) =>
                team.id === id ? { ...team, score: team.score - 10 } : team
            )
        );
        setFlash((prev) => ({ ...prev, [id]: "minus" }));

        setTimeout(() => {
            setFlash((prev) => ({ ...prev, [id]: null }));
        }, 2000);
    };


    useEffect(() => {
        localStorage.setItem('teams', JSON.stringify(teams));
    }, [teams])


    const resetTimer = () => {
        setTime(0);
        ticking.currentTime = 0;
        ticking.pause();
        setIsrunning(false);
    }


    return (
        <>
            <div style={{ fontFamily: 'poppins' }} className='flex pt-10 z-4 relative bg-blue-200 flex-col min-h-[100vh]'>
                <div className='flex uppercase items-center mt-7 justify-center'>
                    <p className='text-black/80 text-5xl font-bold'>Scoreboard</p>
                </div>

                <div className='flex flex-row gap-30 mt-20 justify-center'>

                    <div className='grid grid-cols-2 gap-5'>
                        {teams.map((v) => (
                            <div
                                key={v.id}
                                className={`flex p-4 font-[500] min-w-[400px] rounded-xl shadow-lg flex-col transition-all duration-300
                                ${flash[v.id] === "plus"
                                        ? "bg-green-400"
                                        : flash[v.id] === "minus"
                                            ? "bg-red-400"
                                            : "bg-white"
                                    }
                            `}>
                                <div className='flex items-center text-3xl justify-between'>
                                    <p className='bg-blue-600 p-2 text-white rounded-lg'>Team - {v.team}</p>
                                    <div className='flex gap-2'>
                                        <div onClick={() => handleIncrement(v.id)} className='flex cursor-pointer text-white items-center h-10 w-10 justify-center rounded-full overflow-hidden bg-black/80'><FaPlus className='text-xl' /></div>
                                        <div onClick={() => handleDecrement(v.id)} className='flex cursor-pointer text-white items-center h-10 w-10 justify-center rounded-full overflow-hidden bg-black/80'><FaMinus className='text-xl' /></div>
                                    </div>
                                </div>
                                <div className='text-3xl mt-3'><p>Score: {v.score}</p></div>
                            </div>
                        ))}


                    </div>


                    <div className='flex flex-col'>
                        <div className='flex text-4xl items-center gap-2 font-semibold flex-col'>
                            <p>Time Left</p>
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
                </div>
            </div>
            {/* <div className='fixed top-0 left-0 h-full w-full bg-blue-200 z-1'></div>
        <div className='fixed z-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'><img src={logoSant} className='h-[800px] w-[800px]' alt="" /></div>
        <div className='fixed top-0 left-0 h-full w-full backdrop-blur-md z-2'></div> */}
        </>
    )
}

export default Home