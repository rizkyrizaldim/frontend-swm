import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const DeviceStatus = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products?limit=6&skip=${page * 6}`);
                const data = await response.json();
                setProducts(data.products);
                console.log(data)
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [page]);

    const handleDetailClick = () => {
        navigate('/detail');
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    return (
        <div className="bg-[#F9F9F9] h-[90%] rounded-[30px] border border-[#BFB2B2] shadow-md shadow-[#606060] flex flex-col p-2 overflow-x-scroll lg:overflow-hidden">
            <div className="flex justify-end flex-grow-0 p-2 sticky top-0 left-0 lg:mr-4">
                <Input type="text" className="w-56 py-0 px-5 rounded-full border" placeholder="Search..." />
            </div>
            <div className="lg:p-1 lg:flex lg:justify-end text-sm grid grid-cols-3 gap-2 lg:mr-6">
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
            <Table className="table-auto text-sm text-center">
                
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px] text-xs text-center">No</TableHead>
                        <TableHead className="w-[100px] text-xs text-center">Title</TableHead>
                        <TableHead className="w-[100px] text-xs text-center">Category</TableHead>
                        <TableHead className="w-[80px] text-xs text-center">Price</TableHead>
                        <TableHead className="w-[80px] text-xs text-center">Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium text-xs">{index + 1 + page * 6}</TableCell>
                            <TableCell className="font-medium text-xs">{product.title}</TableCell>
                            <TableCell className="text-xs">{product.category}</TableCell>
                            <TableCell className="text-xs">{product.price}</TableCell>
                            <TableCell className="text- text-xs">{product.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between p-4">
                <Button onClick={handlePreviousPage} disabled={page === 0}>Previous</Button>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
        </div>
    );
};

export default DeviceStatus;
