import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const DeviceStatus = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSignalStatus, setFilterSignalStatus] = useState('');
    const [filterBatteryStatus, setFilterBatteryStatus] = useState('');
    const [filterConnectionStatus, setFilterConnectionStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;
    const navigate = useNavigate();
    
    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
            return;
        }

        try {
            const response = await axios.get('https://firm-hopefully-dolphin.ngrok-free.app/swmdepok/dashboard/?limit=0', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    "ngrok-skip-browser-warning": "true",
                },
                withCredentials: false,
            });
            const allData = response.data.data;
            console.log(response.data);
            setData(allData);
            setTotalPages(Math.ceil(allData.length / itemsPerPage));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleDetailClick = (item) => {
        navigate(`/detail?serialNumber=${item.serial_number}`, { state: { detailData: item } });
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
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page on search change
    };

    const filteredData = data.filter(item =>
        (filterSignalStatus === '' || item.signalStatus.toLowerCase() === filterSignalStatus) &&
        (filterBatteryStatus === '' || item.batteryStatus.toLowerCase().includes(filterBatteryStatus)) &&
        (filterConnectionStatus === '' || item.statusConnection.toLowerCase() === filterConnectionStatus.toLowerCase()) && // Perubahan di sini
        (item.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.signalStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.batteryStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.statusConnection.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

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

    const getBatteryStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'stabil':
                return 'text-green-500';
            case 'drop':
                return 'text-red-500';
            default:
                return 'text-black';
        }
    };

    const getConnectionStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'connect' :
                return 'text-green-500';
            case 'disconnect' :
                return 'text-red-500';
            default :
                return 'text-black';
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const generatePaginationItems = () => {
        const paginationItems = [];
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            className={i === currentPage ? 'bg-gray-200 text-black' : ''}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            paginationItems.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        className={1 === currentPage ? 'bg-gray-200 text-black' : ''}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (currentPage > 3) {
                paginationItems.push(
                    <PaginationEllipsis key="start-ellipsis" />
                );
            }
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            className={i === currentPage ? 'bg-gray-200 text-black' : ''}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            if (currentPage < totalPages - 2) {
                paginationItems.push(
                    <PaginationEllipsis key="end-ellipsis" />
                );
            }
            paginationItems.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                        className={totalPages === currentPage ? 'bg-gray-200 text-black' : ''}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return paginationItems;
    };

    return (
        <div className="bg-white shadow-lg border m-10 h-[90%] flex flex-col bordershadow-2xl overflow-x-scroll lg:overflow-hidden">
            <div className="flex justify-end flex-grow-0 p-5 sticky top-0 left-0 lg:mr-4">
                <Input
                    type="text"
                    className="w-56 py-0 px-5 rounded-full border"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="lg:p-2 lg:flex lg:justify-end text-sm grid grid-cols-3 gap-2 lg:mr-6">
                <select
                    value={filterSignalStatus}
                    onChange={(e) => setFilterSignalStatus(e.target.value)}
                    className="px-3 py-2 rounded-md border"
                >
                    <option value="">Signal Status</option>
                    <option value="bagus">Bagus</option>
                    <option value="sedang">Sedang</option>
                    <option value="buruk">Buruk</option>
                </select>

                <select
                    value={filterBatteryStatus}
                    onChange={(e) => setFilterBatteryStatus(e.target.value)}
                    className="px-3 py-2 rounded-md border"
                >
                    <option value="">Battery Status</option>
                    <option value="stabil">Stabil</option>
                    <option value="drop">Drop</option>
                </select>
                <select
                    value={filterConnectionStatus}
                    onChange={(e) => setFilterConnectionStatus(e.target.value)}
                    className="px-3 py-2 rounded-md border"
                >
                    <option value="">Connection Status</option>
                    <option value="Connect">Connect</option>
                    <option value="Disconnect">Disconnect</option>
                </select>

            </div>
            <Table className='w-[900px] overflow-x-scroll rounded-[30px] lg:w-[97%] mx-auto '>
                <TableHeader>
                    <TableRow>
                        <TableHead className="p-2 text-center font-bold text-black">No</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">SN Device</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Signal Status</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Rate Data Flow</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Status Baterai</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Status Last Data</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Status Koneksi</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((item, index) => (
                        <TableRow key={index}>
                            <TableHead className="text-xs text-center">{(currentPage - 1) * itemsPerPage + index + 1}</TableHead>
                            <TableHead className="text-xs text-center">{item.serial_number}</TableHead>
                            <TableHead className={`text-xs text-center uppercase ${getSignalStatusColor(item.signalStatus)}`}>{item.signalStatus}</TableHead>
                            <TableHead className="text-xs text-center">{item.rateDataFlow} m3 / hari</TableHead>
                            <TableHead className={`text-xs text-center ${getBatteryStatusColor(item.batteryStatus)}`}>{item.batteryStatus}</TableHead>
                            <TableHead className="text-xs text-center">{formatTimestamp(item.timestamp)}</TableHead>
                            <TableHead className={`text-xs text-center ${getConnectionStatusColor(item.statusConnection)}`}>{item.statusConnection}</TableHead>
                            <TableHead className="text-xs text-center">
                                <Button onClick={() => handleDetailClick(item)} className="bg-green-500 hover:bg-green-700 w-15 h-6">Detail</Button>
                            </TableHead>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination className="p-2">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) {
                                    handlePageChange(currentPage - 1);
                                }
                            }}
                        />
                    </PaginationItem>
                    {generatePaginationItems()}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) {
                                    handlePageChange(currentPage + 1);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default DeviceStatus;

