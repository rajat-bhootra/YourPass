import React from 'react'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 shadow-lg px-4 h-20 flex justify-center items-center backdrop-blur-sm'>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-bold text-lg">🔐</span>
            </div>
            <div className="logo font-bold text-3xl text-white tracking-tight">
                Your<span className="text-blue-400">Pass</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
