import { motion } from "framer-motion";
import { useRef, useMemo, useState } from "react";

interface ScatterGridProps {
  children: React.ReactNode[];
  className?: string;
}

const ScatterGrid = ({ children, className = "" }: ScatterGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOrdered, setIsOrdered] = useState(false);

  const scatterOffsets = useMemo(
    () =>
      children.map(() => ({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 300,
        rotate: (Math.random() - 0.5) * 50,
        scale: 0.5 + Math.random() * 0.3,
      })),
    [children.length] 
  );

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => setIsOrdered(true)}
      onMouseLeave={() => setIsOrdered(false)}
    >
      {children.map((child, i) => {
        const scattered = scatterOffsets[i];
        return (
          <motion.div
            key={i}
            animate={
              isOrdered
                ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                : { x: scattered.x, y: scattered.y, rotate: scattered.rotate, scale: scattered.scale, opacity: 0.6 }
            }
            transition={{
              delay: isOrdered ? i * 0.05 : 0,
              duration: 0.7,
              type: "spring",
              stiffness: 70,
              damping: 14,
            }}
            whileHover={isOrdered ? { y: -8, scale: 1.04, transition: { duration: 0.25 } } : {}}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScatterGrid;
