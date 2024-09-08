import { Store } from 'react-notifications-component'
import React, { useEffect, useState } from 'react'
import logo from './logo512.png'
const electron = window.require('electron');

const MainPage = () => {
  const [config, setConfig] = useState({
    direction: "System1",
      url: 'http://localhost:5000/reciver',
      period: 5,
 
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

      const handleUploadConfig = () => {
        electron.ipcRenderer.send('set:config', config);
        Store.addNotification({
            message: "عملیات آپلود با موفقیت اجام شد",
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
    const handleStopProcess = () => {
      electron.ipcRenderer.send('set:stop', config);
      Store.addNotification({
          message: "عملیات توقف با موفقیت انجام شد",
          type: "danger",
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



return(
  <div className='flex flex-col items-center w-full h-auto min-h-screen divide-y-2 item bg-zinc-800 divide-zinc-900' >
         
            <div className='flex flex-row items-center justify-center w-full h-16 p-4 text-gray-300'>
             <img src={logo} alt="Logo" width={80} height={80} />;
                  <h1 className='flex items-center justify-end w-full h-16 text-gray-300 text-center'>آدرس فولدر</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.direction} name={'direction'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>


            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                  <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>آدرس مقصد</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.url} name={'url'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>

            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300'>
                  <h1 className='flex items-center justify-end w-full h-16 text-gray-300'>دوره تکراربرحسب ثانیه</h1>
            </div>
            <div className='flex flex-row items-center justify-end w-full h-16 p-4 text-gray-300 shadow bg-zinc-700'>
                <input onChange={handleSetConfig} value={config.period} name={'period'} className='flex items-center justify-end w-6/12 h-12 text-center text-gray-300 border border-zinc-900 bg-zinc-800' />
            </div>


            <div className='flex flex-row items-center justify-start w-full h-16 p-4 text-gray-300 shadow bg-zinc-700' dir='rtl'>
                <button onClick={handleUploadConfig} className='flex items-center justify-center w-2/12 h-12 ml-5 text-center text-gray-300 bg-green-900 border border-zinc-800' >آپلود</button>
            </div>

            <div className='flex flex-row items-center justify-start w-full h-16 p-4 text-gray-300 shadow bg-zinc-700' dir='rtl'>
                <button onClick={handleStopProcess} className='flex items-center justify-center w-2/12 h-12 ml-5 text-center text-gray-300 bg-red-900 border border-zinc-800' >توقف</button>
            </div>

</div>
);

}
export default MainPage