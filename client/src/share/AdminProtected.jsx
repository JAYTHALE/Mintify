import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AdminProtected = ({ compo: Compo }) => {
    const { admin } = useSelector(state => state.auth);
    const navigate = useNavigate();

    return (
        <>
            {admin ? (
                <Compo />
            ) : (
                <>
                    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">

                        {/* Animated background circles */}
                        <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
                        <div className="absolute w-50 h-50 bg-indigo-500/30 rounded-full blur-2xl bottom-10 right-10 animate-ping"></div>

                        {/* Main card */}
                        <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center shadow-2xl border border-white/20 max-w-lg w-[90%]">
                            <div className="flex flex-col items-center">
                                {/* Lock Icon */}
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg mb-6 animate-bounce">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 text-gray-900"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2a4 4 0 00-4 4v2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM9 8V6a3 3 0 116 0v2H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                                {/* Heading */}
                                <h1 className="text-3xl font-medium mb-2">
                                    Access Restricted 🚫
                                </h1>
                                <p className="text-gray-200 mb-6">
                                    This page is for <span className="font-medium text-yellow-400">Admins only</span>.
                                    You don’t have permission to view this section.
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <Link
                                        to="/admin"
                                        className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md font-medium shadow-lg hover:scale-105 transition-transform"
                                    >
                                        Request Admin Access
                                    </Link>

                                    <button
                                        onClick={() => navigate("/")}
                                        className="px-6 py-2 bg-white/10 rounded-md border border-white/20 hover:bg-white/20 transition"
                                    >
                                        Go to Homepage
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom wave */}
                        <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-20">
                            <svg
                                viewBox="0 0 1440 320"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-32"
                            >
                                <path
                                    fill="white"
                                    fillOpacity="0.4"
                                    d="M0,192L48,170.7C96,149,192,107,288,85.3C384,64,480,64,576,80C672,96,768,128,864,160C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96V320H0Z"
                                ></path>
                            </svg>
                        </div>

                        {/* Footer */}
                        <p className="absolute bottom-4 text-xs text-gray-400">
                            © {new Date().getFullYear()} Admin Portal | Restricted Access
                        </p>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminProtected
