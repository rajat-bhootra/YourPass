import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passArr, setPassArr] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPassArr(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text)=>{
        navigator.clipboard.writeText(text)
        toast.success('Copied To ClipBoard !!!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const showPass = () => {
        if (ref.current.src.includes("icons/eye-svgrepo-com.svg")) {
            ref.current.src = "icons/eye-slash-svgrepo-com.svg"
            passRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eye-svgrepo-com.svg"
            passRef.current.type = "password"
        }
    }

    const savePass = () => {
        setPassArr([...passArr, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passArr, { ...form, id: uuidv4() }]))
        toast.success('Password Saved !!!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setForm({ site: "", username: "", password: "" })
    }

    const delPass = (id) => {
        console.log("deleting id", id);
        setPassArr(passArr.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passArr.filter(item => item.id !== id)))
        toast.success('Password Deleted !!!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPass = (id) => {
        console.log("editing id", id);
        setForm(passArr.filter(i => i.id === id)[0])
        setPassArr(passArr.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(400%_80%_at_50%_0%,#000_40%,#0d1a36_100%)]">
            </div>
            <div className="mx-auto p-4 max-w-4xl h-auto sm:h-[85vh] ">
                <div className='text-white flex flex-col gap-3 items-center'>
                    <input className='w-full px-4 py-0.5 bg-slate-900 text-white rounded-lg border border-slate-700 placeholder-slate-500
           outline-none transition-all duration-300
           focus:border-[#255dd4] 
           focus:shadow-[0_0_15px_rgba(34,211,238,0.7),0_0_3px_rgba(34,211,238,0.4)_inset]' placeholder='Website URL' type="text" name='site' value={form.site} onChange={handleChange} />
                    <div className='w-full flex gap-6'>
                        <input className='w-10/12 px-4 py-0.5  bg-slate-900 text-white rounded-lg border border-slate-700 placeholder-slate-500
           outline-none transition-all duration-300
           focus:border-[#255dd4] 
           focus:shadow-[0_0_15px_rgba(34,211,238,0.7),0_0_3px_rgba(34,211,238,0.4)_inset]' placeholder='Username' type="text" name='username' value={form.username} onChange={handleChange} />
                        <div className="w-1/3 relative">
                            <input ref={passRef} className='w-full relative px-4 py-0.5  bg-slate-900 text-white rounded-lg border border-slate-700 placeholder-slate-500
           outline-none transition-all duration-300
           focus:border-[#255dd4] 
           focus:shadow-[0_0_15px_rgba(34,211,238,0.7),0_0_3px_rgba(34,211,238,0.4)_inset]' placeholder='Password' type="password" name='password' value={form.password} onChange={handleChange} />

                            <img className='absolute right-2 top-1 invert w-5 cursor-pointer' onClick={showPass} ref={ref} src="icons/eye-svgrepo-com.svg" alt="eye" />

                        </div>
                    </div>
                    <button disabled={form.site.length < 1 || form.username.length < 1 || form.password.length < 1} onClick={savePass} className='flex items-center gap-1.5 px-2 py-1 bg-slate-900 text-[#255dd4] font-semibold rounded-lg border border-[#255dd4]
           uppercase tracking-wider transition-all duration-300 outline-none
           hover:border-[#3070f8] hover:text-white
           hover:shadow-[0_0_20px_rgba(34,211,238,0.6),0_0_5px_rgba(34,211,238,0.3)_inset]'>Add
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            colors="primary:#255dd4,secondary:#255dd4">
                        </lord-icon>
                    </button>
                </div>

                <div className="password mt-10">
                    {passArr.length === 0 && <div className='text-center font-semibold text-gray-500 font-mono'> No Passwords Yet </div>}

                    <table className="table-auto text-white w-full">
                        <thead className='bg-slate-900'>
                            <tr>
                                <th className='py-2' >Website</th>
                                <th className='py-2' >Username</th>
                                <th className='py-2' >Password</th>
                                <th className='py-2' >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passArr.map((item, index) => {
                                return <tr key={index} >
                                    <td className='py-2 text-center align-middle w-30'>
                                        <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img onClick={()=>{copyText(item.site)}} className='w-5 shrink-0 cursor-pointer align-middle' src="icons/copy-svgrepo-com.svg" alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-2 text-center align-middle w-30'>
                                        <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap'>
                                            <span>{item.username}</span>
                                            <img onClick={()=>{copyText(item.username)}} className='w-5 shrink-0 cursor-pointer align-middle' src="icons/copy-svgrepo-com.svg" alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-2 text-center align-middle w-30'>
                                        <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap'>
                                            <span>{item.password}</span>
                                            <img onClick={()=>{copyText(item.password)}} className='w-5 shrink-0 cursor-pointer align-middle' src="icons/copy-svgrepo-com.svg" alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-2 text-center w-30'>
                                        <span className='cursor-pointer mx-2' onClick={() => { editPass(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                state="hover-line"
                                                stroke="bold"
                                                colors="primary:#ffffff,secondary:#ffffff">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { delPass(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="morph"
                                                state="morph-trash-in"
                                                stroke="bold"
                                                colors="primary:#ffffff,secondary:#ffffff">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

            </div >
        </>
    )
}

export default Manager
