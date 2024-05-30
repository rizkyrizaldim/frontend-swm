import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DeviceStatus from "./components/DeviceStatus";
import { useState } from "react";



function App() {
  const [content, setContent] = useState (<DeviceStatus/>)
  
  return (
    <>
      <div className="w-full h-screen bg-gray-200 flex lg:grid lg:grid-cols-[20%,80%] justify-center">
        <Sidebar content={content} setContent={setContent} />

        <div className="overflow-y-scroll lg:overflow-hidden h-screen flex flex-col">
          <Navbar />
          {content}
        </div>
      </div>
    </>

  )
}

export default App
