import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';

const Home = () => {

    const [isRunning, setIsrunning] = useState(false);
    const [time, setTime] = useState(0);
    const [flash, setFlash] = useState({});

    const [teams, setTeams] = useState([
        { id: 1, team: 1, score: 0 },
        { id: 2, team: 2, score: 0 },
        { id: 3, team: 3, score: 0 },
        { id: 4, team: 4, score: 0 },
        { id: 5, team: 5, score: 0 },
        { id: 6, team: 6, score: 0 },
    ]);

    const handleInput = (e) => {
        setTime(Number(e.target.value) * 60);
    }


    useEffect(() => {
        if (!isRunning) return;
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
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

    return (
        <div style={{ fontFamily: 'poppins' }} className='flex flex-col min-h-[100vh] bg-blue-200'>
            <div className='flex uppercase items-center mt-7 justify-center'>
                <p className='text-black/80 text-5xl font-bold'>Scoreboard</p>
            </div>

            <div className='flex flex-row gap-30 mt-20 justify-center'>

                <div className='grid grid-cols-2 gap-5'>
                    {teams.map((v) => (
                        <div
                            key={v.id}
                            className={`flex p-4 font-[500] min-w-[300px] rounded-xl shadow-lg flex-col transition-all duration-300
                                ${flash[v.id] === "plus"
                                    ? "bg-green-400"
                                    : flash[v.id] === "minus"
                                        ? "bg-red-400"
                                        : "bg-white"
                                }
                            `}>
                            <div className='flex items-center text-3xl justify-between'>
                                <p className='bg-blue-600 p-2 text-white rounded-lg'>Team {v.team}</p>
                                <div className='flex gap-2'>
                                    <div className='flex cursor-pointer text-white items-center h-10 w-10 justify-center rounded-full overflow-hidden bg-black/80'><FaPlus className='text-xl' onClick={() => handleIncrement(v.id)} /></div>
                                    <div className='flex cursor-pointer text-white items-center h-10 w-10 justify-center rounded-full overflow-hidden bg-black/80'><FaMinus className='text-xl' onClick={() => handleDecrement(v.id)} /></div>
                                </div>
                            </div>
                            <div className='text-3xl mt-3'><p>Score: {v.score}</p></div>
                        </div>
                    ))}


                </div>


                <div className='flex flex-col'>
                    <div className='flex text-4xl items-center gap-2 font-semibold flex-col'>
                        <p>Time Left</p>
                        <p className='text-6xl bg-black/80 text-white p-4 rounded-lg w-fit text-center font-mono'>{`${Math.floor(time / 60)}`.padStart(2, 0)}:
                            {`${time % 60}`.padStart(2, 0)}</p>
                    </div>
                    <div className='flex flex-col items-center text-2xl mt-5 gap-3'>
                        <div>
                            <select className='bg-black/80 text-white rounded-lg px-2 py-0' onChange={handleInput} value={time ? time / 60 : ""} id="">
                                <option value="">Select Time</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minute</option>
                                <option value="3">3 minute</option>
                                <option value="4">4 minute</option>
                                <option value="5">5 minute</option>
                            </select>
                        </div>
                        <div className='flex cursor-pointer gap-2'>
                            <div onClick={() => (setIsrunning(true))}><p className='bg-blue-600 text-white px-2 py-1 rounded-lg'>Start</p></div>
                            <div onClick={() => { setIsrunning(false); setTime(0) }} ><p className='bg-blue-600 text-white px-2 py-1 rounded-lg'>Reset</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home