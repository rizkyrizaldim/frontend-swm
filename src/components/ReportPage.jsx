import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const ReportPage = () => {

    return (
        <div className="w-full h-screen bg-gray-200 flex lg:grid lg:grid-cols-[20%,80%] justify-center">
            <Sidebar />

            <div className="overflow-y-scroll lg:overflow-hidden h-screen flex flex-col">
                <Navbar />
                <div className="bg-white shadow-lg border m-10 h-[90%] flex flex-col bordershadow-2xl overflow-x-scroll lg:overflow-hidden">
                    <h1>Report Page</h1>
                </div>
            </div>
        </div>
    )
}

export default ReportPage