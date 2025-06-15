import React from "react";
import { Box, Image, Text, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Logo = ({ size = "md", showText = true, ...props }) => {
  const sizeMap = {
    sm: { image: 24, text: "sm" },
    md: { image: 32, text: "lg" },
    lg: { image: 40, text: "xl" },
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      cursor="pointer"
      {...props}
    >
      <HStack spacing={showText ? 3 : 0}>
        <Image
          src="/images/favicon.png"
          alt="Logo"
          width={`${sizeMap[size].image}px`}
          height={`${sizeMap[size].image}px`}
          borderRadius="full"
          objectFit="cover"
          fallback={
            <Box
              width={`${sizeMap[size].image}px`}
              height={`${sizeMap[size].image}px`}
              bg="brand.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                color="white"
                fontWeight="bold"
                fontSize={sizeMap[size].text}
              >
                SS
              </Text>
            </Box>
          }
        />
        {showText && (
          <Text
            fontSize={sizeMap[size].text}
            fontWeight="bold"
            bgGradient="linear(to-r, brand.500, accent.500)"
            bgClip="text"
            letterSpacing="tight"
          >
            SSN
          </Text>
        )}
      </HStack>
    </MotionBox>
  );
};

export default Logo;
