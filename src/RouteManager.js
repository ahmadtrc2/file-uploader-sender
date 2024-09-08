import './App.css';
import { Routes, Route } from "react-router-dom";
import Setting from './pages/Setting';
import MainPage from './pages/MainPage';

import Sidebar from './Sidebar';

function RouteManager() {
  return (
    <div className='flex flex-col w-full h-screen bg-zinc-800 outline-blue-700'>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/setting" element={<Setting />} />

      </Routes>
    </div>
  );
}

export default RouteManager;

{/* <Sidebar /> */}