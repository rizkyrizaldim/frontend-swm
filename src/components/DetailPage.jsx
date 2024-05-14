import Sidebar from './Sidebar';
import React from 'react';
import Navbar from './Navbar';
import { useState } from "react";
import DeviceStatus from './DeviceStatus';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const DetailPage = () => {
  const [content, setContent] = useState(<DeviceStatus />);
  const navigate = useNavigate();

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Chart Battery',
        data: [1.0, 1.8, 2.0, 2.8, 3.0, 3.6, 3.6],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);

  let chartInstance1 = null;
  let chartInstance2 = null;
  let chartInstance3 = null;

  useEffect(() => {
    if (chartRef1.current && chartData) {
      if (chartInstance1) {
        chartInstance1.destroy();
      }
      chartInstance1 = new Chart(chartRef1.current, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Uplink',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Voltase',
              },
              max: 3.6,
            },
          },
        },
      });
    }

    if (chartRef2.current && chartData) {
      if (chartInstance2) {
        chartInstance2.destroy();
      }
      chartInstance2 = new Chart(chartRef2.current, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Uplink',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Voltase',
              },
              max: 3.6,
            },
          },
        },
      });
    }

    if (chartRef3.current && chartData) {
      if (chartInstance3) {
        chartInstance3.destroy();
      }
      chartInstance3 = new Chart(chartRef3.current, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Uplink',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Voltase',
              },
              max: 3.6,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance1) {
        chartInstance1.destroy();
      }
      if (chartInstance2) {
        chartInstance2.destroy();
      }
      if (chartInstance3) {
        chartInstance3.destroy();
      }
    };
  }, [chartData]);

  return (
    <>
      <div className="w-full bg-gray-200 h-full lg:grid lg:grid-cols-[20%,75%] p-2 lg:py-5 gap-6 justify-center">
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
                <p>Signal Device &nbsp; : Tidak Bagus</p>
                <p>Rate Data Flow &nbsp; : 2,3 m3/hari</p>
                <p>Status Baterai &nbsp; : Stabil</p>
                <p>Status Last Data &nbsp;: Update</p>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4 mt-4">
              <canvas ref={chartRef1} width="897" height="184.56" />
              <canvas ref={chartRef2} width="897" height="184.56" />
              <canvas ref={chartRef3} width="897" height="184.56" />
            </div>
            <Button onClick={() => navigate('/')} className='absolute top-8 right-8 bg-green-500 hover:bg-green-700'>Back</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;