import React from 'react'
import { useRef } from 'react'
const Manager = () => {
    const ref = useRef()
    const showPass = ()=>{
        if (ref.current.src.includes("icons/eye-svgrepo-com.svg")){
            ref.current.src = "icons/eye-slash-svgrepo-com.svg"
        }
        else{
            ref.current.src = "icons/eye-svgrepo-com.svg"
        }
    }
    return (
        <>
            <div className  ="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(400%_80%_at_50%_0%,#000_40%,#63e_130%)]">
            </div>
            <div className="mx-auto p-4 max-w-4xl ">
                <div className='text-white flex flex-col gap-3 items-center'>
                    <input className='w-full rounded-lg border border-purple-400 px-4 py-0.5' placeholder='Website URL' type="text" />
                    <div className='w-full flex gap-6'>
                        <input className='w-3/4 rounded-lg border border-purple-400 px-4 py-0.5' placeholder='Username' type="text" />
                        <div className="relative">
                            <input className='relative rounded-lg border border-purple-400 px-4 py-0.5' placeholder='Password' type="text" />

                            <img className='absolute right-2 top-1 invert w-5 cursor-pointer' onClick={showPass} ref={ref} src="icons/eye-svgrepo-com.svg" alt="eye" />

                        </div>
                    </div>
                    <button className='flex items-center gap-1.5 bg-purple-400 hover:bg-purple-600 rounded-2xl px-2 py-1 border-2 border-purple-700'>Add Password
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover">
                        </lord-icon>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Manager
