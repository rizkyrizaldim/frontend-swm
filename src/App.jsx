import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DeviceStatus from "./components/DeviceStatus";
import { useState } from "react";



function App() {
  const [content, setContent] = useState (<DeviceStatus/>)
 
  return (
    <>
      <div className="w-full bg-gray-200 h-screen lg:grid lg:grid-cols-[20%,75%] p-2 lg:py-5 gap-6 justify-center">
        <Sidebar content={content} setContent={setContent} />

        <div className="rounded-[30px] flex flex-col gap-4">
          <Navbar />
          {content}
        </div>
      </div>
    </>

  )
}

export default App
