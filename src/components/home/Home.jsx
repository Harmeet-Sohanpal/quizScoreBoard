import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';



const Home = () => {

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



                </div>
            </div>
            {/* <div className='fixed top-0 left-0 h-full w-full bg-blue-200 z-1'></div>
        <div className='fixed z-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'><img src={logoSant} className='h-[800px] w-[800px]' alt="" /></div>
        <div className='fixed top-0 left-0 h-full w-full backdrop-blur-md z-2'></div> */}
        </>
    )
}

export default Home