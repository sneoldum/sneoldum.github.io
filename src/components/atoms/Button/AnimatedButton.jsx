import React from "react";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const AnimatedButton = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
    },
    tap: {
      scale: 0.98,
      y: 0,
    },
  };

  const iconVariants = {
    hover: {
      x: variant === "primary" ? 4 : 0,
      rotate: rightIcon ? 0 : 0,
    },
  };

  return (
    <MotionButton
      variant={variant}
      size={size}
      isLoading={isLoading}
      leftIcon={leftIcon}
      rightIcon={
        rightIcon && (
          <motion.div variants={iconVariants}>{rightIcon}</motion.div>
        )
      }
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default AnimatedButton;
