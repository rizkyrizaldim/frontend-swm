import React from 'react'
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "@/components/ui/button"
//import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useNavigate } from 'react-router-dom';
  

const DeviceStatus = () => {
    const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

    const handleDetailClick = () => {
    // Fungsi ini akan dipanggil saat tombol "Detail" ditekan
    navigate('/detail'); // Navigasi ke halaman Detail
  };
  return (
    <div className="bg-[#F9F9F9] h-[90%] rounded-[30px] border border-[#BFB2B2] shadow-md shadow-[#606060]  flex flex-col p-2 bordershadow-2xl overflow-x-scroll lg:overflow-hidden">
        <div className="flex justify-end flex-grow-0 p-5 sticky top-0 left-0 lg:mr-4">
            <Input type="text" className="w-56 py-0 px-5 rounded-full border" placeholder="Search..."  />
        </div>
        <div className="lg:p-2 lg:flex lg:justify-end text-sm grid grid-cols-3 gap-2 lg:mr-6">
            <Select>
                <SelectTrigger className="w-24 lg:w-[180px]">
                    <SelectValue placeholder="Signal Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Signal Status</SelectItem>
                    <SelectItem value="bagus">BAGUS</SelectItem>
                    <SelectItem value="sedang">SEDANG</SelectItem>
                    <SelectItem value="buruk">BURUK</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-24 lg:w-[180px]">
                    <SelectValue placeholder="Battery Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Battery Status</SelectItem>
                    <SelectItem value="stabil">Stabil</SelectItem>
                    <SelectItem value="drop">Drop</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-24 lg:w-[180px]">
                    <SelectValue placeholder="Last Data Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Last Data Status</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="aWeekAgo">A Week Ago</SelectItem>
                    <SelectItem value="aMonthAgo">A Month Ago</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Table className='w-[900px] overflow-x-scroll rounded-[30px] lg:w-[97%] mx-auto bg-[#F8E9E9]'>
            <TableHeader>
                <TableRow>
                    <TableHead className="p-2 text-center font-bold text-black">No</TableHead>
                    <TableHead className="p-2 text-center font-bold text-black">SN Device</TableHead>
                    <TableHead className="p-2 text-center font-bold text-black">Signal Status</TableHead>
                    <TableHead className="p-2 text-center font-bold text-black">Rate Data Flow</TableHead>
                    <TableHead className="p-2 text-center font-bold text-black">Status Baterai</TableHead>
                    <TableHead className="p-2 text-center font-bold text-black">Status Last Data</TableHead>
                    <TableHead className="p-2 text-center font-bold text-black">Detail</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableHead className="p-2 text-center">1</TableHead>
                    <TableHead className="p-2 text-center">6822081471</TableHead>
                    <TableHead className="p-2 text-center">BAGUS</TableHead>
                    <TableHead className="p-2 text-center">2,3 m3 / hari</TableHead>
                    <TableHead className="p-2 text-center">Stabil</TableHead>
                    <TableHead className="p-2 text-center">Update</TableHead>
                    <TableHead className="p-2 text-center">
                        <Button onClick={handleDetailClick} className="bg-green-500 hover:bg-green-700">Detail</Button>
                    </TableHead>
                </TableRow>
                <TableRow>
                    <TableHead className="p-2 text-center">2</TableHead>
                    <TableHead className="p-2 text-center">6822081471</TableHead>
                    <TableHead className="p-2 text-center">BAGUS</TableHead>
                    <TableHead className="p-2 text-center">2,3 m3 / hari</TableHead>
                    <TableHead className="p-2 text-center">Stabil</TableHead>
                    <TableHead className="p-2 text-center">Update</TableHead>
                    <TableHead className="p-2 text-center"><Button className="bg-green-500 hover:bg-green-700">Detail</Button></TableHead>
                </TableRow>
                <TableRow>
                    <TableHead className="p-2 text-center">3</TableHead>
                    <TableHead className="p-2 text-center">6822081471</TableHead>
                    <TableHead className="p-2 text-center">BAGUS</TableHead>
                    <TableHead className="p-2 text-center">2,3 m3 / hari</TableHead>
                    <TableHead className="p-2 text-center">Stabil</TableHead>
                    <TableHead className="p-2 text-center">Update</TableHead>
                    <TableHead className="p-2 text-center"><Button className="bg-green-500 hover:bg-green-700">Detail</Button></TableHead>
                </TableRow>
                <TableRow>
                    <TableHead className="p-2 text-center">4</TableHead>
                    <TableHead className="p-2 text-center">6822081471</TableHead>
                    <TableHead className="p-2 text-center">BAGUS</TableHead>
                    <TableHead className="p-2 text-center">2,3 m3 / hari</TableHead>
                    <TableHead className="p-2 text-center">Stabil</TableHead>
                    <TableHead className="p-2 text-center">Update</TableHead>
                    <TableHead className="p-2 text-center"><Button className="bg-green-500 hover:bg-green-700">Detail</Button></TableHead>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default DeviceStatus