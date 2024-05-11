import Sidebar from './Sidebar';
import React from 'react'
import Navbar from './Navbar'
import { useState } from "react";
import DeviceStatus from './DeviceStatus';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
    const [content, setContent] = useState (<DeviceStatus/>)
    const navigate = useNavigate()
    
  return (
    <>
      <div className="w-full bg-gray-200 h-screen lg:grid lg:grid-cols-[20%,75%] p-2 lg:py-5 gap-6 justify-center">
        <Sidebar content={content} setContent={setContent} />

        <div className="rounded-[30px] flex flex-col gap-4">
          <Navbar />
          <div className="bg-[#F9F9F9] h-[90%] relative rounded-[30px] border border-[#BFB2B2] shadow-md shadow-[#606060] flex flex-col p-9 bordershadow-2xl overflow-x-scroll lg:overflow-hidden">
              
              <Card className='w-96 rounded-[30px] border border-[#BFB2B2]'>
                  <CardHeader className="flex flex-row items-center">
                      <img src="/image 1.png" alt="" />
                      <CardTitle className="ml-3">SN 6822081471</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p>Signal Device &nbsp;   : Tidak Bagus</p>
                      <p>Rate Data Flow &nbsp;  : 2,3 m3/hari</p>
                      <p>Status Baterai &nbsp;  : Stabil</p>
                      <p>Status Last Data &nbsp;: Update</p>
                  </CardContent>
               </Card>
               <Button onClick={() => navigate('/')} className='absolute top-8 right-8 bg-green-500 hover:bg-green-700'>Back</Button>

          </div>
        </div>
      </div>
    </>


    )
}

export default DetailPage