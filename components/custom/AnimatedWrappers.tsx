"use client";

import { HTMLMotionProps, motion, Variants } from "motion/react";

interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
}

export function AnimatedContainer({
  children,
  className,
  variants,
  initial = "hidden",
  animate = "visible",
  viewport = { once: true, amount: 0.2 },
  ...props
}: AnimatedContainerProps) {
  // ডিফল্ট ভ্যারিয়েন্ট
  const defaultVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial={initial}
      animate={animate}
      viewport={viewport}
      className={className}
      {...props} // এর মাধ্যমে whileHover, whileTap, drag ইত্যাদি সব সাপোর্ট 
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
}

export function AnimatedItem({
  children,
  className,
  variants,
  ...props
}: AnimatedItemProps) {
  // ডিফল্ট ভ্যারিয়েন্ট
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
