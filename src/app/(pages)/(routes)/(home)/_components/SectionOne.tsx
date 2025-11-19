
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React from "react";

// Tip xətasını 100% aradan qaldıran ən təmiz üsul:
const fadeInVariants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: (index = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.5,     // hər şəkilə 0.5s gecikmə
      duration: 0.8,
      ease: "easeOut" as const,  // bu vacibdir
    },
  }),
};

const SectionOne = () => {
  return (
    <div className="mx-auto container lg:mt-8 md:mt-44 mt-64">
      <div className="flex flex-col md:flex-row gap-8 px-3 lg:px-28">
        {/* 1-ci şəkil */}
        <motion.div
          className="group overflow-hidden relative rounded-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={fadeInVariants}
          custom={0}   // 0 * 0.5 = 0s delay
        >
          <Image
            alt="Travel destination 1"
            src="/home/1.jpg"
            width={1260}
            height={590}
            className="rounded-xl transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full"
            priority
          />
        </motion.div>

        {/* 2-ci şəkil */}
        <motion.div
          className="group overflow-hidden relative rounded-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={fadeInVariants}
          custom={1}   // 1 * 0.5 = 0.5s delay
        >
          <Image
            alt="Travel destination 2"
            src="/home/2.jpg"
            width={1260}
            height={590}
            className="rounded-xl transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionOne;
