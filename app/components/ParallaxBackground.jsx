"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Deep Space Background Layer */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{ y: yBg1 }}
            >
                <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-cyber-purple/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px]" />
            </motion.div>

            {/* Floating Elements Layer */}
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{ y: yBg2 }}
            >
                <motion.div
                    className="absolute top-[40%] left-[20%] w-24 h-24 border border-white/20 rounded-full"
                    style={{ rotate: rotateBg }}
                />
                <motion.div
                    className="absolute top-[60%] right-[30%] w-16 h-16 border border-cyber-purple/30 rotate-45"
                    style={{ rotate: rotateBg }}
                />
            </motion.div>

            {/* Grid Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03]" />
        </div>
    );
}
