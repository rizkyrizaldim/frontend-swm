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
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const [content, setContent] = useState(<DeviceStatus />);
  const navigate = useNavigate();
  const location = useLocation();
  const detailData = location.state?.detailData || {};

  const getSignalStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'bagus':
        return 'text-green-500';
      case 'sedang':
        return 'text-yellow-500';
      case 'buruk':
        return 'text-red-500';
      default:
        return 'text-black';
    }
  };

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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const timeDifference = (now - date) / 1000;
    
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInWeek = secondsInDay * 7;
    const secondsInMonth = secondsInDay * 30; // Average 30 days per month
    const secondsInYear = secondsInDay * 365; // Average 365 days per year
    
    if (timeDifference < secondsInMinute) {
        return 'Just now';
    } else if (timeDifference < secondsInHour) {
        const minutes = Math.floor(timeDifference / secondsInMinute);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDifference < secondsInDay) {
        const hours = Math.floor(timeDifference / secondsInHour);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDifference < secondsInWeek) {
        const days = Math.floor(timeDifference / secondsInDay);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDifference < secondsInMonth) {
        const weeks = Math.floor(timeDifference / secondsInWeek);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (timeDifference < secondsInYear) {
        const months = Math.floor(timeDifference / secondsInMonth);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(timeDifference / secondsInYear);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
};

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
          <Card className='w-96 rounded-[30px] border border-[#BFB2B2] ml-5 mt-5'>
              <CardHeader className="flex flex-row items-center">
                <img src="/image 1.png" alt="" />
                <CardTitle className="ml-3">{detailData.serial_number}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Signal Device &nbsp;    : <span className={getSignalStatusColor(detailData.signalStatus)}>{detailData.signalStatus.toUpperCase()}</span></p>
                <p>Rate Data Flow &nbsp;   : {detailData.rateDataFlow} m3/hari</p>
                <p>Status Baterai &nbsp;   : {detailData.batteryStatus}</p>
                <p>Status Last Data &nbsp; : {formatTimestamp(detailData.timestamp)}</p>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4 mt-4">
              <canvas ref={chartRef1} width="897" height="184.56" />
              <canvas ref={chartRef2} width="897" height="184.56" />
              <canvas ref={chartRef3} width="897" height="184.56" />
            </div>
            <Button onClick={() => navigate('/')} className='absolute top-10 right-10 w-15 h-6 bg-green-500 hover:bg-green-700'>Back</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;