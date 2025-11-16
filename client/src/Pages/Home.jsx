import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import iphone from "../assets/iphone.jpg";
import offer from "../assets/offer.jpg";
import phone from "../assets/phone.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useGetproductQuery } from "../redux/apis/adminApi";

const slides = [
    { id: 1, img: iphone },
    { id: 2, img: offer },
    { id: 3, img: phone },
];

export default function Home() {
    const { data } = useGetproductQuery();
    const products = data?.products || [];

    const [current, setCurrent] = useState(0);

    // Auto Slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* SLIDER */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                        width: `${slides.length * 100}%`,
                    }}
                >
                    {slides.map((s) => (
                        <div
                            key={s.id}
                            className="w-full flex-shrink-0 relative"
                            style={{
                                backgroundImage: `url(${s.img})`,
                                backgroundSize: "20%",
                                backgroundPosition: "center",
                                height: "380px",
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() =>
                        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
                    }
                    className="absolute top-1/2 left-3 -translate-y-1/2 p-2 rounded-full text-white"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full text-white"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-full mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[#F8FAF9]">
                {/* LEFT SIDE - PRODUCTS */}
                <div className="lg:col-span-3 flex flex-col gap-10">
                    <Section title="Best Sellers" products={products} />
                    <Section title="Deals: Pay ₹19 Now" products={products} />
                    <Section title="Pay with 0% EMI" products={products} />
                </div>

                {/* RIGHT SIDE - PROMO */}
                <div className="rounded-xl shadow-md p-6 flex flex-col justify-between bg-white">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#2E3A45]">
                            Grow Your Business With Mintify
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            +15% Conversion Rate · +30% AOV · +25% RTO ↓
                        </p>
                        <button className="w-full font-semibold py-2 rounded-md bg-[#3AA76D] text-white">
                            Partner With Us
                        </button>
                    </div>

                    <div className="my-6">
                        <div className="w-full h-44 rounded-lg flex items-center justify-center text-gray-400 text-sm bg-[#F1F1F1] border border-dashed border-gray-300">
                            Advertisement Placeholder
                        </div>
                    </div>

                    <div className="mt-1 text-sm">
                        <p className="text-gray-500 mb-2">Credit Card Not Required</p>
                        <Link
                            to="/login"
                            className="w-full py-2 rounded-md font-semibold block text-center bg-[#FFD166] text-[#2E3A45] no-underline"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

function Section({ title, products }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-[#2E3A45]">{title}</h3>
                <button className="text-sm font-semibold hover:underline text-[#3AA76D]">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((p) => {
                    const img = p.mainImage || p.img;
                    const emiAmount = p.emiOptions?.[0]?.emiAmount || 0;

                    return (
                        <div
                            key={p._id}
                            className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer"
                            onClick={() => navigate(`/product/${p._id}`)}
                        >
                            <div className="relative mb-3 flex justify-center">
                                <div className="absolute -top-2 left-2 text-[11px] font-semibold px-2 py-[2px] rounded-md bg-[#3AA76D] text-white">
                                    0% EMI
                                </div>
                                <img src={img} alt={p.name} className="w-28 h-28 object-contain mt-5" />
                            </div>
                            <div>
                                <p className="text-[15px] font-semibold mb-1 text-center text-[#3AA76D]">
                                    ₹ {emiAmount}/month
                                </p>
                                <p className="text-[11px] font-medium mb-1 leading-tight line-clamp-2 text-[#2E3A45]">
                                    {p.name}
                                </p>
                                <p className="text-xs text-black font-medium">
                                    Total: ₹ {emiAmount * 12}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

