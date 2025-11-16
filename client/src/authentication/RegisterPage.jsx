import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import { useRegistercustomerMutation } from "../redux/apis/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [Register, { isLoading }] = useRegistercustomerMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Register(formData).unwrap();
            toast.success("✅ Registered Successfully!");
            setFormData({ name: "", email: "", mobile: "", password: "" });
            navigate("/login");
        } catch (err) {
            toast.error(err?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FBFA] via-[#E9F6EC] to-[#D8F0E0] px-4">
            {/* Hot Toast Toaster */}
            <Toaster
                position="top-right"
                toastOptions={{
                    success: { duration: 3000, style: { background: "#63C070", color: "#fff" } },
                    error: { duration: 4000, style: { background: "#FF4C4C", color: "#fff" } },
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-sm bg-white rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.06)] border border-[#E3ECE6] p-8 relative overflow-hidden"
            >
                {/* Brand Logo */}
                <div className="text-center mb-6">
                    <div className="text-3xl font-extrabold text-[#58B368] tracking-tight">
                        Mintify
                    </div>
                    <p className="text-[#2E3A45]/70 text-xs mt-1">
                        Empowering Smart Digital Finance
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium text-[#2E3A45]/80 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full p-2 text-sm border border-[#D9E5DD] rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#63C070] focus:bg-white transition"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-[#2E3A45]/80 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full p-2 text-sm border border-[#D9E5DD] rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#63C070] focus:bg-white transition"
                        />
                    </div>

                    {/* MOBILE */}
                    <div>
                        <label className="block text-sm font-medium text-[#2E3A45]/80 mb-1">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            placeholder="9876543210"
                            className="w-full p-2 text-sm border border-[#D9E5DD] rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#63C070] focus:bg-white transition"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium text-[#2E3A45]/80 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Create a password"
                                className="w-full p-2 text-sm pr-10 border border-[#D9E5DD] rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#63C070] focus:bg-white transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-[#63C070] hover:text-[#4A9C5A] transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#63C070] to-[#559E5F] text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform tracking-wide text-sm"
                    >
                        {isLoading ? "Registering..." : "Create Account"}
                    </button>

                    {/* Sign In Link */}
                    <p className="text-center text-xs text-[#2E3A45]/70 mt-1">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-[#FFB830] font-medium hover:text-[#E6A620] hover:underline"
                        >
                            Sign In
                        </a>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
