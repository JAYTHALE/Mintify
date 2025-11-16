import React, { useState, useEffect } from 'react';

const EcommerceSlider = () => {
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            id: 1,
            title: "0% EMI on Modern Home Appliances",
            subtitle: "Upgrade your kitchen with premium appliances",
            bgColor: "bg-gradient-to-r from-[#F8FAF9] to-[#e8f4ee]",
            accentColor: "text-[#3AA76D]",
            buttonColor: "bg-[#3AA76D] hover:bg-[#2E3A45]",
            products: [
                { name: "Refrigerator", icon: "❄️" },
                { name: "Oven", icon: "🔥" },
                { name: "Blender", icon: "🌀" }
            ]
        },
        {
            id: 2,
            title: "Festive Sale – Up to 50% Off",
            subtitle: "Limited time offers on all categories",
            bgColor: "bg-gradient-to-r from-[#FFD166] to-[#ffebc1]",
            accentColor: "text-[#2E3A45]",
            buttonColor: "bg-[#2E3A45] hover:bg-[#3AA76D]",
            products: [
                { name: "Fashion", icon: "👕" },
                { name: "Electronics", icon: "📱" },
                { name: "Home Decor", icon: "🏠" }
            ]
        },
        {
            id: 3,
            title: "Smartphones & Gadgets on EMI",
            subtitle: "Latest tech with easy payment options",
            bgColor: "bg-gradient-to-r from-[#3AA76D] to-[#a8e6cf]",
            accentColor: "text-[#2E3A45]",
            buttonColor: "bg-[#2E3A45] hover:bg-[#FFD166] hover:text-[#2E3A45]",
            products: [
                { name: "Smartphones", icon: "📱" },
                { name: "Earbuds", icon: "🎧" },
                { name: "Smartwatch", icon: "⌚" }
            ]
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#2E3A45]">
                Premium E-commerce Offers
            </h1>

            <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                        width: `${slides.length * 100}%`,
                    }}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`w-full flex-shrink-0 relative ${slide.bgColor}`}
                            style={{
                                height: "512px",
                            }}
                        >
                            <div className="absolute inset-0 flex">
                                {/* Content Section */}
                                <div className="w-1/2 p-12 flex flex-col justify-center">
                                    <h2 className={`text-5xl font-bold mb-4 ${slide.accentColor}`}>
                                        {slide.title}
                                    </h2>
                                    <p className="text-xl text-[#2E3A45] mb-8">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex gap-4 mb-8">
                                        {slide.products.map((product, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                <span className="text-3xl mb-2">{product.icon}</span>
                                                <span className="text-sm font-medium">{product.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className={`${slide.buttonColor} text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 w-fit`}>
                                        Shop Now
                                    </button>
                                </div>

                                {/* Visual Section */}
                                <div className="w-1/2 relative">
                                    {/* Decorative elements */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-80 h-80 bg-white/30 rounded-full blur-xl"></div>
                                    </div>

                                    {/* Product visualization */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {slide.id === 1 && (
                                            <div className="flex gap-6">
                                                <div className="w-32 h-40 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                                    <div className="text-4xl">❄️</div>
                                                </div>
                                                <div className="w-32 h-40 bg-white rounded-2xl shadow-lg flex items-center justify-center mt-8">
                                                    <div className="text-4xl">🔥</div>
                                                </div>
                                                <div className="w-32 h-40 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                                    <div className="text-4xl">🌀</div>
                                                </div>
                                            </div>
                                        )}

                                        {slide.id === 2 && (
                                            <div className="text-center">
                                                <div className="text-8xl mb-4">🎉</div>
                                                <div className="text-6xl font-bold text-[#2E3A45]">50% OFF</div>
                                                <div className="flex justify-center mt-6 gap-2">
                                                    {['🛍️', '🎁', '✨'].map((icon, i) => (
                                                        <div key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                                                            {icon}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {slide.id === 3 && (
                                            <div className="flex gap-6">
                                                <div className="w-24 h-40 bg-[#2E3A45] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-4">
                                                    <div className="text-3xl mb-2">📱</div>
                                                    <div className="w-16 h-1 bg-[#3AA76D] rounded-full mb-1"></div>
                                                    <div className="w-12 h-1 bg-[#3AA76D] rounded-full"></div>
                                                </div>
                                                <div className="w-24 h-24 bg-[#2E3A45] rounded-full shadow-2xl flex items-center justify-center mt-8">
                                                    <div className="text-2xl">🎧</div>
                                                </div>
                                                <div className="w-24 h-24 bg-[#2E3A45] rounded-2xl shadow-2xl flex items-center justify-center">
                                                    <div className="text-2xl">⌚</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Controls */}
                <button
                    onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 text-[#2E3A45]"
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                    className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 text-[#2E3A45]"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center text-[#2E3A45]">
                <p>Three premium e-commerce banners with modern design using Mint Green, Soft Yellow, Dark Gray and Almost White</p>
            </div>
        </div>
    );
};

export default EcommerceSlider;