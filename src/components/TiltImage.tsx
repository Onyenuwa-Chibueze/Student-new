import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const TiltImage = ({ src, alt, className = "", width, height }: TiltImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const brightness = useTransform(x, [0, 0.5, 1], [0.9, 1, 1.1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{ perspective: 800, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        width={width}
        height={height}
        style={{ filter: `brightness(${brightness.get()})` }}
      />
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            x,
            [0, 0.5, 1],
            [
              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              "linear-gradient(135deg, transparent 0%, transparent 100%)",
              "linear-gradient(225deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
            ]
          ),
        }}
      />
    </motion.div>
  );
};

export default TiltImage;
