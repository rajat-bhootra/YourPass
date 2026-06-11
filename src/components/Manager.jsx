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

    const copyText = (text) => {
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
            <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(400%_80%_at_50%_0%,#000_40%,#0d1a36_100%)]">
            </div>
            <div className="mx-auto p-4 max-w-5xl min-h-[calc(100vh-80px)] flex flex-col">
                <div className='mt-8 mb-8'>
                    <h1 className='text-white text-3xl font-bold mb-2'>Password Manager</h1>
                    <p className='text-slate-400 text-sm'>Securely store and manage your passwords</p>
                </div>

                <div className='text-white flex flex-col gap-4 items-center bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-xl mb-8'>
                    <label className='w-full text-left text-sm font-semibold text-slate-300 ml-1'>Website URL</label>
                    <input className='w-full px-4 py-2.5 bg-slate-800 text-white rounded-lg border border-slate-700 placeholder-slate-500
           outline-none transition-all duration-300
           focus:border-[#255dd4] 
           focus:shadow-[0_0_15px_rgba(37,93,212,0.5),0_0_3px_rgba(37,93,212,0.3)_inset]' placeholder='https://example.com' type="text" name='site' value={form.site} onChange={handleChange} />

                    <div className='w-full'>
                        <label className='text-sm font-semibold text-slate-300 ml-1'>Username & Password</label>
                        <div className='w-full flex gap-4 mt-2 flex-col sm:flex-row'>
                            <input className='flex-1 px-4 py-2.5 bg-slate-800 text-white rounded-lg border border-slate-700 placeholder-slate-500
           outline-none transition-all duration-300
           focus:border-[#255dd4] 
           focus:shadow-[0_0_15px_rgba(37,93,212,0.5),0_0_3px_rgba(37,93,212,0.3)_inset]' placeholder='Username' type="text" name='username' value={form.username} onChange={handleChange} />
                            <div className="flex-1 relative">
                                <input ref={passRef} className='w-full px-4 py-2.5 bg-slate-800 text-white rounded-lg border border-slate-700 placeholder-slate-500
           outline-none transition-all duration-300
           focus:border-[#255dd4] 
           focus:shadow-[0_0_15px_rgba(37,93,212,0.5),0_0_3px_rgba(37,93,212,0.3)_inset]' placeholder='Password' type="password" name='password' value={form.password} onChange={handleChange} />
                                <img className='absolute right-3 top-1/2 -translate-y-1/2 invert w-5 cursor-pointer hover:scale-110 transition-transform' onClick={showPass} ref={ref} src="icons/eye-svgrepo-com.svg" alt="eye" />
                            </div>
                        </div>
                    </div>

                    <button disabled={form.site.length < 1 || form.username.length < 1 || form.password.length < 1} onClick={savePass} className='group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg border border-blue-500
           uppercase tracking-wider transition-all duration-300 outline-none
           hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
           hover:shadow-[0_0_25px_rgba(37,93,212,0.7),0_0_5px_rgba(37,93,212,0.4)_inset]
           active:scale-95'>Add
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                            className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12 group-hover:scale-110 group-active:scale-90 group-active:-rotate-12'>
                        </lord-icon>
                    </button>
                </div>

                <div className="password flex-1">
                    {passArr.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-12 px-4 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-800 border-dashed'>
                            <lord-icon
                                src="https://cdn.lordicon.com/aqlibkla.json"
                                trigger="loop"
                                state="in-reveal"
                                colors="primary:#255dd4,secondary:#255dd4"
                                style={{ width: '80px', height: '80px' }} >
                            </lord-icon>
                            <p className='text-center font-semibold text-gray-400 mt-4'>No Passwords Stored Yet</p>
                            <p className='text-center text-sm text-gray-500 mt-1'>Add your first password above to get started</p>
                        </div>
                    )}

                    {passArr.length > 0 && (
                        <div className='overflow-x-auto'>
                            <table className="table-auto text-white w-full">
                                <thead className='bg-slate-900/70 border-b border-slate-700'>
                                    <tr>
                                        <th className='py-4 px-4 text-left font-semibold text-slate-300'>Website</th>
                                        <th className='py-4 px-4 text-left font-semibold text-slate-300'>Username</th>
                                        <th className='py-4 px-4 text-left font-semibold text-slate-300'>Password</th>
                                        <th className='py-4 px-4 text-center font-semibold text-slate-300'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800'>
                                    {passArr.map((item, index) => {
                                        return <tr key={index} className='hover:bg-slate-800/50 transition-colors duration-200 group'>
                                            <td className='py-4 px-4 align-middle'>
                                                <div className='flex items-center justify-between gap-2'>
                                                    <a href={item.site} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 transition-colors truncate group-hover:underline'>{item.site}</a>
                                                    <img onClick={() => { copyText(item.site) }} className='w-4 shrink-0 cursor-pointer hover:scale-110 transition-transform opacity-60 group-hover:opacity-100' src="icons/copy-svgrepo-com.svg" alt="copy" title="Copy website" />
                                                </div>
                                            </td>
                                            <td className='py-4 px-4 align-middle'>
                                                <div className='flex items-center justify-between gap-2'>
                                                    <span className='font-mono text-slate-300'>{item.username}</span>
                                                    <img onClick={() => { copyText(item.username) }} className='w-4 shrink-0 cursor-pointer hover:scale-110 transition-transform opacity-60 group-hover:opacity-100' src="icons/copy-svgrepo-com.svg" alt="copy" title="Copy username" />
                                                </div>
                                            </td>
                                            <td className='py-4 px-4 align-middle'>
                                                <div className='flex items-center justify-between gap-2'>
                                                    <span className='font-mono text-slate-300'>{'•'.repeat(Math.min(item.password.length, 12))}</span>
                                                    <img onClick={() => { copyText(item.password) }} className='w-4 shrink-0 cursor-pointer hover:scale-110 transition-transform opacity-60 group-hover:opacity-100' src="icons/copy-svgrepo-com.svg" alt="copy" title="Copy password" />
                                                </div>
                                            </td>
                                            <td className='py-4 px-4 align-middle text-center'>
                                                <div className='flex items-center justify-center gap-3'>
                                                    <span className='cursor-pointer p-1.5 hover:bg-blue-500/20 rounded-lg transition-all' onClick={() => { editPass(item.id) }} title="Edit">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover"
                                                            state="hover-line"
                                                            stroke="bold"
                                                            colors="primary:#255dd4,secondary:#255dd4"
                                                            style={{ width: '27px', height: '27px' }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer p-1.5 hover:bg-red-500/20 rounded-lg transition-all' onClick={() => { delPass(item.id) }} title="Delete">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="hover"
                                                            state="hover-trash"
                                                            stroke="bold"
                                                            colors="primary:#ff6b6b,secondary:#ff6b6b"
                                                            style={{ width: '27px', height: '27px' }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div >
        </>
    )
}

export default Manager
