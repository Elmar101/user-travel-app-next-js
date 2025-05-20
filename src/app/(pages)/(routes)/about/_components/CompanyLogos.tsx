"use client"
import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";


const CompanyLogos = () => {

    const companyLogos = [
        "/company/1.png",
        "/company/2.png",
        "/company/3.png",
        "/company/4.png",
        "/company/5.png",
        "/company/6.png",
        "/company/7.png",
        "/company/8.png",
    ];
    return (
        <div className="bg-gray-100 py-8">
            <h2 className="text-center text-2xl lg:text-4xl font-bold text-gray-800 mb-6">
                Trusted by Leading Companies
            </h2>
            <Marquee
                speed={100}
                
            >
                {companyLogos.map((logo, index) => (
                    <div key={index}
                        className="flex items-center justify-center w-96 h-auto "
                    >
                        <Image
                            width={700}
                            height={500}
                            src={logo}
                            alt={`Company ${index + 1}`}
                            className="w-full h-full object-contain"
                        />

                    </div>
                ))}

            </Marquee>

        </div>
    )
}

export default CompanyLogos