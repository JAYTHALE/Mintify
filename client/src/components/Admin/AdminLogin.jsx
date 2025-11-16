import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useLoginAdminMutation } from "../../redux/apis/authApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginAdminMutation();
    const [showPassword, setShowPassword] = useState(false);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await login(values).unwrap();
            console.log("Login successful:", response);
            navigate("/admindashboard");
        } catch (error) {
            console.error("Login failed:", error);
            setErrors({ api: error?.data?.message || "Login failed" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1E17] via-[#0B1712] to-[#07100D] px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-sm bg-[#0F1814] rounded-2xl shadow-[0_0_40px_rgba(0,255,170,0.12)] border border-[#1C3A2D] p-8 relative overflow-hidden"
            >
                {/* Admin Header */}
                <div className="text-center mb-7">
                    <h2 className="text-3xl font-extrabold text-[#63C070] tracking-wide">
                        Mintify
                    </h2>
                    <p className="text-gray-400 text-xs mt-3">
                        Secure Access — Authorized Personnel Only
                    </p>
                </div>

                {/* Formik Form */}
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="space-y-5">
                            {errors.api && (
                                <p className="text-red-500 text-sm text-center">{errors.api}</p>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Admin Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="admin@domain.com"
                                    className="w-full p-2 border border-[#2A4A3B] rounded-lg bg-[#0D1512] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#63C070] transition"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter admin password"
                                        className="w-full p-2 pr-10 border border-[#2A4A3B] rounded-lg bg-[#0D1512] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#63C070] transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-[#63C070] hover:text-[#4AAF63] transition"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full bg-gradient-to-r from-[#63C070] to-[#4AAF63] text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(0,255,170,0.25)] hover:scale-[1.02] transition-transform tracking-wide text-sm"
                            >
                                {isSubmitting || isLoading ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <div className="mt-6 text-center text-[10px] text-gray-500 border-t border-[#1D2C24] pt-3">
                    <p>🔐 Secure Gateway | © 2025 Mintify Admin</p>
                </div>

                {/* Neon Border Glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-[#63C070]/5 to-transparent"></div>
            </motion.div>
        </div>
    );
}
