import React, { useState } from 'react';
import { Building2, Mail, Phone, Upload } from "lucide-react";

function SettingForm() {
    const [logoPreview, setLogoPreview] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <div className="p-6 space-y-7">
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Company Logo
                    </label>

                    <div className="flex items-center gap-5">
                        <div className="w-24 h-24 rounded-xl border border-neutral-700 bg-[#181818] flex items-center justify-center overflow-hidden">
                            {logoPreview ? (
                                <img
                                    src={logoPreview}
                                    alt="Company Logo"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Building2
                                    size={35}
                                    className="text-gray-600"
                                />
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="company-logo"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c] border border-neutral-700 hover:border-red-500 rounded-lg cursor-pointer transition"
                            >
                                <Upload size={17} />
                                <span className="text-sm">
                                    Upload Logo
                                </span>
                            </label>

                            <input
                                id="company-logo"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="hidden"
                                onChange={handleLogoChange}
                            />

                            <p className="text-xs text-gray-500 mt-2">
                                PNG, JPG or WEBP. Maximum size 2MB.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="company-name"
                        className="block text-sm font-medium mb-2"
                    >
                        Company Name
                    </label>

                    <div className="relative">
                        <Building2
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            id="company-name"
                            type="text"
                            placeholder="Enter company name"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-red-500 transition"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label
                            htmlFor="company-email"
                            className="block text-sm font-medium mb-2"
                        >
                            Company Email
                        </label>
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                id="company-email"
                                type="email"
                                placeholder="company@example.com"
                                className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-red-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="company-phone"
                            className="block text-sm font-medium mb-2"
                        >
                            Company Phone
                        </label>
                        <div className="relative">
                            <Phone
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                id="company-phone"
                                type="tel"
                                placeholder="+91 9876543210"
                                className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-red-500 transition"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingForm;