import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, Users, Package, ShoppingCart, LogOut, User } from "lucide-react";
import { useLogoutAdminMutation } from "../../redux/apis/authApi";

export default function AdminLayout() {
    const [logout, { isLoading }] = useLogoutAdminMutation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#F9FBFA]">

            {/* Sidebar FIXED */}
            <aside
                className={`bg-[#E8FDF3] text-black w-64 p-5 flex flex-col gap-6 fixed inset-y-0 left-0 
                    transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    transition-transform duration-300 z-40 shadow-xl`}
            >
                <h2 className="text-2xl font-bold text-[#63C070]">Admin Panel</h2>

                <nav className="flex flex-col gap-4 mt-4">
                    <Link to="" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#63C070]">
                        <Menu size={18} /> Dashboard
                    </Link>

                    <Link to="/admindashboard/customers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#63C070]">
                        <Users size={18} /> All Customers
                    </Link>

                    <Link to="/admindashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#63C070]">
                        <Package size={18} /> All Products
                    </Link>

                    <Link to="/admindashboard/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#63C070]">
                        <ShoppingCart size={18} /> All Orders
                    </Link>

                    <Link to="/admindashboard/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#63C070]">
                        <User size={18} /> Admin Profile
                    </Link>
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        disabled={isLoading}
                    >
                        <LogOut size={18} /> {isLoading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-5">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden p-2 bg-[#63C070] text-white rounded-lg shadow mb-4"
                >
                    <Menu size={20} />
                </button>

                {/* Outlet for nested pages */}
                <Outlet />
            </div>
        </div>
    );
}
