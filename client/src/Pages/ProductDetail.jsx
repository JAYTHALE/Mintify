import React, { useState, useEffect, useContext } from "react";
import { Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from '../components/User/Navbar';
import Footer from '../components/User/Footer';
import { useGetProductbyidQuery } from "../redux/apis/adminApi";
import { CartContext } from "../components/User/CardContext";
import { usePlaceOrderMutation } from "../redux/apis/productApi";
import { useSelector } from "react-redux";

const ProductPageWithGallery = () => {
    const [placeOrder, { isLoading: isOrderLoading }] = usePlaceOrderMutation();
    const customer = useSelector(state => state.auth.customer);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const { data, isLoading, error } = useGetProductbyidQuery(id);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedStorage, setSelectedStorage] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedEMI, setSelectedEMI] = useState(null);

    useEffect(() => {
        if (data?.product) {
            const firstVariant = data.product.variants[0];
            setSelectedColor(firstVariant.color);
            setSelectedStorage(firstVariant.storageOptions[0].storage);
            setSelectedImage(firstVariant.images[0]);
            setSelectedEMI(data.product.emiOptions[0]);
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching product</p>;

    const product = data.product;

    const currentVariant = product.variants.find(v => v.color === selectedColor);

    const galleryImages = product.galleryImages; // fixed gallery images
    const variantImages = currentVariant?.images || [];

    const handlePlaceOrder = async () => {
        if (!customer) {
            alert("Please login first!");
            return;
        }

        try {
            const orderData = {
                customerId: customer.id,  // Redux मधून घेतलं
                productId: product._id,
                emiId: selectedEMI?._id,
                color: selectedColor,
                storage: selectedStorage
            };

            await placeOrder(orderData).unwrap();
            alert("Order placed successfully!");
        } catch (err) {
            console.error(err);
            alert("Error placing order");
        }
    }

    return (
        <>
            <NavBar />
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT SIDE - IMAGES */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* THUMBNAILS */}
                        <div className="flex lg:flex-col gap-2 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
                            {galleryImages.concat(variantImages).map((img, index) => (
                                <div
                                    key={index}
                                    className={`w-16 h-16 p-2 rounded-lg cursor-pointer flex-shrink-0 border 
                                        ${selectedImage === img ? 'border-[#559E5F]' : 'border-gray-300'}`}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img src={img} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            ))}
                        </div>

                        {/* MAIN IMAGE */}
                        <div className="flex flex-col flex-1 order-1">
                            <div className="w-full h-96 lg:h-[500px] bg-white rounded-lg flex items-center justify-center">
                                <img
                                    src={selectedImage || product.mainImage}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>

                            {/* COLOR SELECT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Choose Color</label>
                                    <select
                                        value={selectedColor}
                                        onChange={(e) => {
                                            const color = e.target.value;
                                            setSelectedColor(color);
                                            const newVariant = product.variants.find(v => v.color === color);
                                            setSelectedImage(newVariant.images[0]);
                                            setSelectedStorage(newVariant.storageOptions[0].storage);
                                            setSelectedEMI(product.emiOptions[0]);
                                        }}
                                        className="w-full px-3 py-2 rounded-xl border bg-white text-sm font-medium"
                                    >
                                        {product.variants.map(v => (
                                            <option key={v.color} value={v.color}>{v.color}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* STORAGE SELECT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Storage</label>
                                    <select
                                        value={selectedStorage}
                                        onChange={(e) => setSelectedStorage(e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border bg-white text-sm font-medium"
                                    >
                                        {currentVariant?.storageOptions.map(s => (
                                            <option key={s._id} value={s.storage}>{s.storage} - ₹{s.price}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - DETAILS */}
                    <div className="space-y-3 bg-[#E8FDF3] rounded-2xl p-6">
                        <h1 className="text-lg font-semibold text-gray-700">{product.name} ({selectedColor}, {selectedStorage})</h1>
                        <p className="text-gray-600 mt-1 text-[14px]">(Stock: {product.stock})</p>
                        {/* <p className="text-gray-700 mt-2">{product.price}</p> */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl font-bold text-gray-700">₹{product.price}</span>
                                <span className="text-sm text-gray-500 line-through">₹1,40,999</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                                    24% off
                                </span>
                            </div>
                        </div>

                        {/* EMI */}
                        <div className="space-y-3 bg-white p-5 rounded-3xl mt-4">
                            <h3 className="font-medium text-gray-700 mb-2">EMI Options</h3>
                            {product.emiOptions.map((emi) => (
                                <div
                                    key={emi._id}
                                    className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${selectedEMI?._id === emi._id
                                        ? 'border-[#559E5F] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedEMI(emi)}
                                >
                                    <div className="flex justify-between">
                                        <span>{emi.months} months</span>
                                        <span>₹{emi.emiAmount}/month</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm text-gray-600">
                                EMIs starting {new Date().toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-[#559E5F] text-white py-2 px-6 rounded-lg font-semibold transition-colors cursor-pointer"
                                disabled={isOrderLoading}
                            >
                                {isOrderLoading ? "Placing Order..." : "Buy on EMI"}
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => {
                                addToCart({
                                    id: product._id,
                                    name: product.name,
                                    color: selectedColor,
                                    variant: selectedStorage,
                                    price: currentVariant.storageOptions.find(s => s.storage === selectedStorage)?.price || product.price,
                                    img: selectedImage
                                });
                                navigate("/cart"); // navigate to /cart after adding
                            }}
                            className="w-full bg-[#559E5F] text-white py-2 px-6 rounded-lg font-semibold transition-colors cursor-pointer"
                        >
                            Add to Cart
                        </button>

                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Sold by:</span> Mintify Pvt Ltd
                            </p>
                        </div>

                        {/* Shipping Info */}
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2">
                                {/* Left Side - Title */}
                                <p className="text-sm font-medium text-gray-900">Shipping Details</p>

                                {/* Right Side - Icon + Text */}
                                <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-3xl">
                                    <Truck className="w-5 h-5 text-black" />
                                    <p className="text-black font-medium text-[12px]">Free Shipping</p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <p className="text-sm text-gray-600 mt-1">
                                Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch
                            </p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-sm font-medium text-gray-900">Product Details</h2>

                            <ul className="list-disc pl-4 space-y-2 text-gray-700 text-sm mt-5">
                                {/* <li>Storage: {selectedVariant}</li>
                                <li>Color: {selectedColor}</li> */}
                                {product.specifications?.camera && (
                                    <li>Front Camera: {product.specifications.camera}</li>
                                )}
                                {product.specifications?.cameraFeatures && (
                                    <li>Front Camera Features: {product.specifications.cameraFeatures}</li>
                                )}
                                {product.specifications?.rearCamera && (
                                    <li>Rear Camera: {product.specifications.rearCamera}</li>
                                )}
                                {product.specifications?.rearCameraFeatures && (
                                    <li>Rear Camera Features: {product.specifications.rearCameraFeatures}</li>
                                )}
                                {product.specifications?.display && (
                                    <li>Screen Size: {product.specifications.display}</li>
                                )}
                                {product.specifications?.resolution && (
                                    <li>Screen Resolution: {product.specifications.resolution}</li>
                                )}
                                {product.specifications?.screenType && (
                                    <li>Screen Type: {product.specifications.screenType}</li>
                                )}
                                {product.specifications?.processor && (
                                    <li>Processor: {product.specifications.processor}</li>
                                )}
                                {product.specifications?.core && (
                                    <li>Core: {product.specifications.core}</li>
                                )}
                                {product.specifications?.os && (
                                    <li>Operating System: {product.specifications.os}</li>
                                )}
                                {product.specifications?.simType && (
                                    <li>SIM Type: {product.specifications.simType}</li>
                                )}
                                {product.specifications?.packageContents && (
                                    <li>Package: {product.specifications.packageContents}</li>
                                )}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPageWithGallery;

