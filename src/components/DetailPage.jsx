import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DeviceStatus from './DeviceStatus';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/auto';

const DetailPage = (setContent) => {
  // const [content, setContent] = useState(<DeviceStatus />);
  const navigate = useNavigate();
  const location = useLocation();
  const detailData = location.state?.detailData || {};
  const batteryChartRef = useRef(null);
  const flowMeterChartRef = useRef(null);
  const qualitySignalChartRef = useRef(null);
  const [batteryChart, setBatteryChart] = useState(null);
  const [flowMeterChart, setFlowMeterChart] = useState(null);
  const [qualitySignalChart, setQualitySignalChart] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'date'

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
    const fetchChartData = async () => {
      if (detailData.serial_number) {
        try {
          const response = await fetch(`http://36.92.168.180:6380/vito-anjay/detail/?serial_number=${detailData.serial_number}`);
          const data = await response.json();
          const chartData = data[detailData.serial_number];

          // Sort the data by timestamp
          chartData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          // Filter the data if filterMode is 'date'
          const filteredData = filterMode === 'date' && selectedDate
            ? chartData.filter(item => new Date(item.timestamp).toDateString() === selectedDate.toDateString())
            : chartData;

          const labels = filteredData.map(item => item.timestamp.split(' ')[0]);
          const batteryValues = filteredData.map(item => item.batteryValue);
          const flowMeterValues = filteredData.map(item => item.flowMeter);
          const rssiValues = filteredData.map(item => item.RSSI);
          const snrValues = filteredData.map(item => item.SNR);

          const batteryCtx = batteryChartRef.current.getContext('2d');
          if (batteryChart) {
            batteryChart.destroy();
          }
          const newBatteryChart = new Chart(batteryCtx, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: 'Battery Status',
                data: batteryValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Timestamp'
                  },
                  ticks: {
                    autoSkip: true,
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Battery Value'
                  },
                  min: 0,
                  max: 4,
                  ticks: {
                    callback: function(value) {
                      const tickValues = [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6];
                      if (tickValues.includes(value)) {
                        return value;
                      }
                      return null; // Return null to skip drawing this tick
                    },
                    stepSize: 0.2 // Adjust the step size to ensure custom ticks are used
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const date = new Date(filteredData[context.dataIndex].timestamp);
                      const time = date.toTimeString().split(' ')[0];
                      return `Battery Value: ${context.parsed.y}, Time: ${time}`;
                    }
                  }
                }
              }
            }
          });
          setBatteryChart(newBatteryChart);

          const flowMeterCtx = flowMeterChartRef.current.getContext('2d');
          if (flowMeterChart) {
            flowMeterChart.destroy();
          }
          const newFlowMeterChart = new Chart(flowMeterCtx, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: 'Flow Meter',
                data: flowMeterValues,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: false,
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Timestamp'
                  },
                  ticks: {
                    autoSkip: true,
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Flow Meter Value'
                  },
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const date = new Date(filteredData[context.dataIndex].timestamp);
                      const time = date.toTimeString().split(' ')[0];
                      return `Flow Meter Value: ${context.parsed.y}, Time: ${time}`;
                    }
                  }
                }
              }
            }
          });
          setFlowMeterChart(newFlowMeterChart);

          const qualitySignalCtx = qualitySignalChartRef.current.getContext('2d');
          if (qualitySignalChart) {
            qualitySignalChart.destroy();
          }
          const newQualitySignalChart = new Chart(qualitySignalCtx, {
            type: 'line',
            data: {
              labels,
              datasets: [
                {
                  label: 'RSSI',
                  data: rssiValues,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: false,
                },
                {
                  label: 'SNR',
                  data: snrValues,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  fill: false,
                }
              ]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Timestamp'
                  },
                  ticks: {
                    autoSkip: true,
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Signal Quality Value'
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const date = new Date(filteredData[context.dataIndex].timestamp);
                      const time = date.toTimeString().split(' ')[0];
                      if (context.dataset.label === 'RSSI') {
                        return `RSSI: ${context.parsed.y}, Time: ${time}`;
                      } else {
                        return `SNR: ${context.parsed.y}, Time: ${time}`;
                      }
                    }
                  }
                }
              }
            }
          });
          setQualitySignalChart(newQualitySignalChart);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      }
    };

    fetchChartData();
  }, [detailData.serial_number, selectedDate, filterMode]);

  return (
    <>
      <div className="bg-gray-200 w-full lg:grid lg:grid-cols-[20%,80%] justify-center">
        <Sidebar setContent={setContent} />
        <div className="rounded-[30px] flex flex-col">
          <Navbar />
          <div className="bg-white relative m-10 flex flex-col p-5 shadow-lg overflow-x-scroll lg:overflow-hidden">
            <Button onClick={() => navigate('/')} className='absolute top-10 right-10 w-15 h-6 bg-green-500 hover:bg-green-700 items-center'>Back</Button>
            <Card className='w-96 rounded-[30px] border ml-5 mt-5'>
              <CardHeader className="flex flex-row items-center">
                <img src="/image 1.png" alt="" />
                <CardTitle className="ml-3">{detailData.serial_number}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm mb-3">
              <div className="grid grid-cols-3">
                <p className="text-left col-span-1">Signal Status</p>
                <div className="col-span-2 flex items-center">
                  <p className="mr-4">:</p>
                  <p className="flex-grow"><span className={getSignalStatusColor(detailData.signalStatus)}>{detailData.signalStatus.toUpperCase()}</span></p>
                </div>
                
                <p className="text-left col-span-1">Battery Status</p>
                <div className="col-span-2 flex items-center">
                  <p className="mr-4">:</p>
                  <p className="flex-grow">{detailData.batteryStatus}</p>
                </div>
                
                <p className="text-left col-span-1">Rate Data Flow</p>
                <div className="col-span-2 flex items-center">
                  <p className="mr-4">:</p>
                  <p className="flex-grow">{detailData.rateDataFlow} m3 / hari</p>
                </div>
                
                <p className="text-left col-span-1">Status Last Data</p>
                <div className="col-span-2 flex items-center">
                  <p className="mr-4">:</p>
                  <p className="flex-grow">{formatTimestamp(detailData.timestamp)}</p>
                </div>
              </div>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4">
                <Button onClick={() => setFilterMode('all')} className={`ml-5 w-24 h-10 ${filterMode === 'all' ? 'bg-indigo-800' : 'bg-gray-500'} hover:bg-indigo-700 items-center`}>All Data</Button>
                <Button onClick={() => setFilterMode('date')} className={`w-36 h-10 ${filterMode === 'date' ? 'bg-indigo-800' : 'bg-gray-500'} hover:bg-indigo-700 items-center`}>Filter by Date</Button>
                {filterMode === 'date' && (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="ml-4 p-2 border border-gray-400 rounded"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                  />
                )}
              </div>
              <canvas className='border' ref={batteryChartRef} width="897" height="204.56" />
              <canvas className='border' ref={flowMeterChartRef} width="897" height="204.56" />
              <canvas className='border' ref={qualitySignalChartRef} width="897" height="204.56" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;

