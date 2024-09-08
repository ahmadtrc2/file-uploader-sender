import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
const electron = window.require('electron');

const Sidebar = () => {
    useEffect(() => {
        // electron.ipcRenderer.send('run');
    }, []);

    return (
        <div className='flex flex-col w-2/12 h-auto min-h-screen border-l-2 divide-y-2 border-zinc-900 divide-zinc-900 bg-zinc-800'>
            <Link to="/" className='flex items-center justify-center w-full h-16 text-white text-md bg-zinc-700 '>صفحه اصلی</Link>
            {/* <Link to="باید ست شود" className='flex items-center justify-center w-full h-16 text-white text-md bg-zinc-700'>حساب کاربری</Link> */}
            <Link to="setting" className='flex items-center justify-center w-full h-16 text-white text-md bg-zinc-700 '>تنظیمات</Link>
        </div>
    )
}

export default Sidebar