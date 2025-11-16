import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br bg-[#E8FDF3]">
            {/* Glassmorphism Card */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#3AA76D] mb-3 tracking-tight">
                            Mintify
                        </h2>
                        <p className="text-sm leading-relaxed text-[#2E3A45]/80">
                            Building the future of digital finance.
                            Simplify, automate & scale your payments securely with confidence.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#2E3A45]">Product</h3>
                        <ul className="space-y-2 text-sm text-[#2E3A45]/75">
                            <li><a href="#" className="hover:text-[#3AA76D] transition">Features</a></li>
                            <li><a href="#" className="hover:text-[#3AA76D] transition">Pricing</a></li>
                            <li><a href="#" className="hover:text-[#3AA76D] transition">Integrations</a></li>
                            <li><a href="#" className="hover:text-[#3AA76D] transition">API Docs</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#2E3A45]">Company</h3>
                        <ul className="space-y-2 text-sm text-[#2E3A45]/75">
                            <li><a href="#" className="hover:text-[#3AA76D] transition">About Us</a></li>
                            <li><a href="#" className="hover:text-[#3AA76D] transition">Careers</a></li>
                            <li><a href="#" className="hover:text-[#3AA76D] transition">Newsroom</a></li>
                            <li><a href="#" className="hover:text-[#3AA76D] transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#2E3A45]">Connect</h3>
                        <div className="flex items-center gap-4 text-[#3AA76D]">
                            <a href="#" className="hover:text-[#2E3A45] transition"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-[#2E3A45] transition"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-[#2E3A45] transition"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-[#2E3A45] transition"><Linkedin size={20} /></a>
                        </div>
                        <p className="text-xs text-[#2E3A45]/60 mt-4">
                            Join 10k+ professionals using  Mintify every day.
                        </p>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="text-center text-sm text-[#2E3A45]/70 mt-10 border-t border-[#CFE3D5] pt-5">
                    © {new Date().getFullYear()} <span className="font-semibold text-[#3AA76D]"> Mintify Pvt Ltd</span>. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
