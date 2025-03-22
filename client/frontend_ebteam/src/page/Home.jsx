import React from 'react'
import EbWise from '../assets/eBWiseBook.png'  
import MSTeam from '../assets/MSTeamBook.png'  
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='grid lg:grid-cols-[40%] justify-end min-h-screen lg:pr-48 px-24'>
      <div className='font-inter flex flex-col items-center justify-start bg-main px-12 pt-12' style={{background: "rgba(56, 84, 172, 0.7)"}}>
        <p className='md:text-4xl text-white text-center font-bold'>Welcome to eBTeams.</p>
        <p className='md:text-4xl text-white text-justify mt-12'>We provide basic guidance to help you use <span className='text-ebwise-color hover:underline'>eBwise</span> and <span className='text-msteam-color hover:underline'>Microsoft Teams</span> effectively.</p>
        <div className='grid grid-cols-2 gap-12 self-center mt-24'>
          <Link to="/ebguide" className='cursor-pointer px-4 py-2 border-2 border-blue-300 bg-ebwise-color rounded-2xl flex flex-col justify-center items-center transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:shadow-main'>
            <img src={EbWise} alt="" className='h-32 w-32'/>
            <p className='p-1 px-4 mt-2 text-xl border-2 border-gray-400 bg-main text-white rounded-2xl hover:text-main hover:bg-white hover:scale-105 hover:underline transition-transform transform duration-200 '>eBwise</p>
          </Link>
          <Link to="/msteam" className='cursor-pointer px-4 py-2 border-2 border-purple-300 bg-msteam-color rounded-2xl flex flex-col justify-center items-center transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:shadow-secondary'>
            <img src={MSTeam} alt="" className='h-32 w-32'/>
            <p className='p-1 px-4 mt-2 text-xl border-2 border-gray-400 bg-secondary text-white rounded-2xl hover:text-secondary hover:bg-white hover:scale-105 hover:underline transition-transform transform duration-200'>MS Team</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home