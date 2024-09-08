import { Store } from 'react-notifications-component'
import React, { useEffect, useState } from 'react'
const electron = window.require('electron');

const Setting = () => {
    const [config, setConfig] = useState({
        name: "System1",
        delay: 20000,
        req: 50,
        retry: 3,
        contactButtonWait: 2000,
        showBrowser: true
    });


    useEffect(() => {
        electron.ipcRenderer.send('get:config');
        electron.ipcRenderer.on('get:config', (event, config) => {
            setConfig(config);
        });
    }, []);


    const handleSetConfig = (e) => {
        if (e.target.value === 1) {
            setConfig((prev) => ({ ...prev, [e.target.name]: 1 }));
        } else {
            setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    const handleSaveConfig = () => {
        electron.ipcRenderer.send('set:config', config);
        Store.addNotification({
            message: "عملیات موفق",
            type: "success",
            insert: "center",
            container: "center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    };

    return (
        <div className='flex flex-col items-center w-10/12 h-auto min-h-screen divide-y-2 item bg-zinc-800 divide-zinc-900' >
            <div className='flex flex-row items-center justify-start w-full h-16 p-4 text-gray-300 shadow bg-zinc-700' dir='rtl'>
                <button onClick={handleSaveConfig} className='flex items-center justify-center w-2/12 h-12 ml-5 text-center text-gray-300 bg-green-900 border border-zinc-800' >ذخیره</button>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>نام سیستم</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.name} name={'name'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>وقفه بین هر درخواست</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.delay} name={'delay'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>تعداد درخواست با هر خط شماره</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.req} name={'req'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>تعداد تکرار در صورت وجود خطا</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.retry} name={'retry'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>نمایش مرورگر</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.showBrowser} name={'showBrowser'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>
        </div>
    )
}

export default Setting