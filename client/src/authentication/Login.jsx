import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useLogincustomerMutation } from "../redux/apis/authApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
    const navigate = useNavigate();
    const [Login, { isLoading }] = useLogincustomerMutation();
    const [showPassword, setShowPassword] = useState(false);

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await Login(values).unwrap();
            console.log("Login Success:", res);
            toast.success("✅ Login Successful!");
            setSubmitting(false);
            navigate("/"); // Change to your desired route
        } catch (err) {
            console.log("Login Error:", err);
            toast.error(err?.data?.message || "❌ Login Failed");
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FBFA] via-[#E9F6EC] to-[#D8F0E0] px-4">
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
                    <div className="text-3xl font-extrabold text-[#58B368] tracking-tight">Mintify</div>
                    <p className="text-[#2E3A45]/70 text-xs mt-1">Empowering Smart Digital Finance</p>
                </div>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-[#2E3A45]/80 mb-1">Email Address</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full p-2 border border-[#D9E5DD] rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#63C070] focus:bg-white transition"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-[#2E3A45]/80 mb-1">Password</label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full p-2 pr-10 border border-[#D9E5DD] rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#63C070] focus:bg-white transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2 text-[#63C070] hover:text-[#4A9C5A] transition"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full bg-gradient-to-r from-[#63C070] to-[#559E5F] text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform tracking-wide text-sm"
                            >
                                {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
                            </button>

                            <p className="text-center text-xs text-[#2E3A45]/70 mt-3">
                                Don’t have an account?{" "}
                                <a
                                    href="/register"
                                    className="text-[#FFB830] font-medium hover:text-[#E6A620] hover:underline"
                                >
                                    Create one
                                </a>
                            </p>
                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <div className="mt-6 text-center text-[10px] text-[#2E3A45]/50 border-t border-[#E6ECE9] pt-3">
                    <p>🔒 Secure | © 2025 TechMint Pvt Ltd</p>
                </div>

                {/* Decorative Gradient Overlay */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-[#63C070]/5 to-transparent"></div>
            </motion.div>
        </div>
    );
}
