"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const SectionTwo = () => {
    return (
        <div className='bg-orange-100 mt-12'>
            <div className="mx-auto container text-center py-16 px-6  lg:px-28">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'WELCOME TO TRAVEL',
                            2000, // wait 1s before replacing "Mice" with "Hamsters"
                            'SEYAHATE HOŞ GELDİNİZ',
                            2000,
                            'WILLKOMMEN BEI TRAVEL',
                            2000,
                            'BIENVENUE À TRAVEL',
                            2000
                        ]}
                        wrapper="span"
                        speed={50}
                        className='className="text-2xl lg:text-4xl font-bold text-blue-600 mb-4"'
                        repeat={Infinity}
                    />
                
                <div className="flex justify-center items-center mb-6">
                    <hr className="border-gray-300 w-1/5" />
                    <span className="mx-3 text-gray-400 text-xl">&#128064;</span>
                    <hr className="border-gray-300 w-1/5" />
                </div>
                <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi animi numquam facere facilis rerum fugit eligendi assumenda, ea tempore dolore eius perferendis beatae quae deserunt cupiditate saepe iste delectus, maiores ex, dolorem ad. Suscipit recusandae praesentium fuga ipsa nihil dolore amet voluptatem odit, in animi possimus sint ut, velit omnis!
                </p>
                <div className="flex justify-center gap-4">
                    <motion.div
                        whileTap={{scale:0.9, y:80}}
                        whileHover={{scale:1.6}}
                    >

                   
                    <Button className="bg-green-500 text-white py-6 px-8 rounded-lg hover:bg-green-600 transition">
                        Detail
                    </Button>
                    </motion.div>

                    <motion.div
                        whileTap={{scale:0.9, rotate:-10}}
                        whileHover={{scale:1.6, rotate:5}}
                    >

                    <Button className="bg-orange-500 text-white py-6 px-8 rounded-lg hover:bg-orange-600 transition">
                        Browse
                    </Button>
                    </motion.div>

                </div>


            </div>
        </div>
    )
}

export default SectionTwo