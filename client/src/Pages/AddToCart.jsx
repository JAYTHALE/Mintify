import { useContext } from "react";
import { Trash2, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import NavBar from "../components/User/Navbar";
import { CartContext } from "../components/User/CardContext";

export default function AddToCart() {
    const { cartItems, removeFromCart, updateQty } = useContext(CartContext);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return <>
        <NavBar />
        <div className="max-w-6xl mx-auto p-6 mt-6">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="text-[#559E5F]" size={27} />
                <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
            </div>

            {/* LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start gap-5">
                                <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                                    <div className="mt-1 text-sm text-gray-600 space-y-1">
                                        <p>Color: <span className="font-medium">{item.color}</span></p>
                                        <p>Variant: <span className="font-medium">{item.variant}</span></p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-4">
                                        <button onClick={() => updateQty(item, -1)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100">-</button>
                                        <span className="font-semibold text-gray-800">{item.qty}</span>
                                        <button onClick={() => updateQty(item, 1)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100">+</button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-900">₹{(item.price * item.qty).toLocaleString()}</p>
                                    <button onClick={() => removeFromCart(item)} className="mt-3 text-red-500 hover:text-red-600">
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cartItems.length === 0 && (
                        <p className="text-center text-gray-500 py-10 text-lg font-medium">Your cart is empty</p>
                    )}
                </div>

                {/* PRICE SUMMARY */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-fit">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Summary</h2>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                        <div className="flex justify-between text-green-600 font-medium"><span>Shipping</span><span>FREE</span></div>
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between text-gray-900 font-bold text-xl"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                    <button className="w-full mt-6 py-2 rounded-xl text-white font-semibold text-[15px] shadow-md hover:opacity-90" style={{ backgroundColor: "#559E5F" }}>Proceed to Checkout</button>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700"><Truck size={18} className="text-[#559E5F]" />Fast Delivery within 3–7 Days</div>
                        <div className="flex items-center gap-2 text-sm text-gray-700"><ShieldCheck size={18} className="text-[#559E5F]" />100% Secure Checkout</div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
