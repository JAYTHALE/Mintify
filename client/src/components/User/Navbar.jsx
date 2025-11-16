import React, { useEffect, useRef, useState } from "react";
import { Menu, Search, LogIn, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const customer = useSelector((state) => state.auth.customer); // Redux auth.customer
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [hovered, setHovered] = useState(false);
    const modalRef = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        console.log("Searching for:", searchQuery);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <nav className="w-full fixed top-0 left-0 right-0 bg-[#E8FDF3] z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#63C070] to-[#559E5F] bg-clip-text text-transparent">
                            Mintify
                        </span>
                        <div className="text-xs text-[#2E3A45]/60 -mt-1">Smart Finance</div>
                    </div>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center relative w-[340px] bg-white/70 border border-[#E6ECE6] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-[#63C070]/40"
                >
                    <Search size={18} className="text-[#2E3A45]/60 mr-2" />
                    <input
                        type="text"
                        placeholder="Search for products, partners, or offers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm text-[#2E3A45]"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="text-xs text-[#63C070] font-medium ml-2 hover:underline"
                        >
                            Clear
                        </button>
                    )}
                </form>

                <div className="hidden md:flex items-center gap-4">
                    {/* Shopping Cart Icon */}
                    <a
                        href="/cart"
                        className="flex items-center justify-center w-10 h-10 rounded-full border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                        <ShoppingCart className="text-[#559E5F]" size={27} />
                    </a>

                    {/* Login Button */}
                    <div className="relative">
                        {customer ? (
                            <>
                                {/* User Icon + Name */}
                                <button
                                    onClick={() => setOpenModal(!openModal)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-gray-200 shadow-sm hover:shadow-md transition"
                                >
                                    <User size={25} className="text-[#559E5F]" />
                                    {/* <span className="text-gray-700 text-sm">{customer.name}</span> */}
                                </button>

                                {/* Dropdown / Modal */}
                                {openModal && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-2xl border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                                        <button
                                            onClick={() => {
                                                navigate("/myorders");
                                                setOpenModal(false);
                                            }}
                                            className="w-full text-left px-5 py-3 hover:bg-green-50 transition-colors font-medium text-gray-700 flex items-center gap-2"
                                        >
                                            <ShoppingCart className="text-[#559E5F]" size={20} />
                                            My Orders
                                        </button>

                                        <button
                                            onClick={() => {
                                                // Logout logic
                                                window.location.reload(); // replace with Redux logout if available
                                            }}
                                            className="w-full text-left px-5 py-3 hover:bg-red-50 transition-colors font-medium text-red-600 flex items-center gap-2 border-t border-gray-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}

                            </>
                        ) : (
                            <a
                                href="/login"
                                className="relative flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full overflow-hidden group border-gray-200 border"
                            >
                                <LogIn
                                    size={18}
                                    className="text-[#2E3A45]/80 transform transition-transform duration-300 group-hover:translate-x-1"
                                />
                                <span className="relative z-10 text-[#2E3A45]/90 transition">Login</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="md:hidden">
                    <button aria-label="menu" className="p-2 rounded-md text-[#2E3A45] hover:bg-white/40 transition">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </nav>

    );
}
