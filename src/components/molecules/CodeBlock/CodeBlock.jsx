import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const CodeBlock = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [highlightedLine, setHighlightedLine] = useState(null);

  const bg = useColorModeValue("gray.900", "gray.800");
  const headerBg = useColorModeValue("gray.800", "gray.700");
  const glowColor = useColorModeValue(
    "rgba(99, 102, 241, 0.4)",
    "rgba(99, 102, 241, 0.6)"
  );

  const codeContent = [
    {
      line: "class Developer {",
      type: "keyword",
    },
    {
      line: "  constructor() {",
      type: "keyword",
    },
    {
      line: '    this.name = "Selahaddin Şamil";',
      type: "property",
    },
    {
      line: '    this.role = "Full Stack Developer";',
      type: "property",
    },
    {
      line: "    this.skills = [",
      type: "property",
    },
    {
      line: '      "React", "Node.js", "TypeScript",',
      type: "string",
    },
    {
      line: '      "Python", "MongoDB", "AWS"',
      type: "string",
    },
    {
      line: "    ];",
      type: "punctuation",
    },
    {
      line: '    this.passion = "Building amazing UX";',
      type: "property",
    },
    {
      line: "  }",
      type: "keyword",
    },
    {
      line: "",
      type: "empty",
    },
    {
      line: "  createMagic() {",
      type: "method",
    },
    {
      line: '    return "✨ Magic happens here! ✨";',
      type: "string",
    },
    {
      line: "  }",
      type: "keyword",
    },
    {
      line: "}",
      type: "keyword",
    },
  ];

  const typeColors = {
    keyword: "#C792EA",
    property: "#82AAFF",
    string: "#C3E88D",
    method: "#FFCB6B",
    punctuation: "#89DDFF",
    empty: "transparent",
  };

  useEffect(() => {
    if (currentLine < codeContent.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentLine, codeContent.length]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const highlightTimer = setInterval(() => {
      const randomLine = Math.floor(Math.random() * currentLine);
      setHighlightedLine(randomLine);
      setTimeout(() => setHighlightedLine(null), 1000);
    }, 3000);
    return () => clearInterval(highlightTimer);
  }, [currentLine]);

  return (
    <MotionBox
      position="relative"
      maxW="480px"
      w="full"
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        z: 50,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Glassmorphism container */}
      <Box
        position="relative"
        borderRadius="24px"
        overflow="hidden"
        backdropFilter="blur(20px)"
        background="linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.2)"
        boxShadow="0 25px 45px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(79, 70, 229, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)",
          borderRadius: "24px",
          zIndex: -1,
        }}
      >
        {/* Animated background particles */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
          borderRadius="24px"
        >
          {[...Array(6)].map((_, i) => (
            <MotionBox
              key={i}
              position="absolute"
              w="4px"
              h="4px"
              bg="rgba(147, 51, 234, 0.4)"
              borderRadius="full"
              animate={{
                x: [0, Math.random() * 400, 0],
                y: [0, Math.random() * 300, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </Box>

        {/* Header with gradient and controls */}
        <Box
          background="linear-gradient(90deg, rgba(147, 51, 234, 0.2) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)"
          px={6}
          py={4}
          borderBottom="1px solid rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(10px)"
        >
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <MotionBox
                w={3}
                h={3}
                bg="linear-gradient(135deg, #FF6B6B, #FF8E8E)"
                borderRadius="full"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
              <MotionBox
                w={3}
                h={3}
                bg="linear-gradient(135deg, #FFD93D, #FFE55B)"
                borderRadius="full"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
              <MotionBox
                w={3}
                h={3}
                bg="linear-gradient(135deg, #6BCF7F, #8FE8A3)"
                borderRadius="full"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </HStack>

            <Text
              color="rgba(255, 255, 255, 0.9)"
              fontSize="sm"
              fontFamily="'JetBrains Mono', 'Fira Code', monospace"
              fontWeight="600"
              textShadow="0 0 10px rgba(147, 51, 234, 0.5)"
            >
              developer.js
            </Text>

            <HStack spacing={2}>
              <Box
                w={2}
                h={2}
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="full"
              />
              <Box
                w={2}
                h={2}
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="full"
              />
              <Box
                w={2}
                h={2}
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="full"
              />
            </HStack>
          </Flex>
        </Box>

        {/* Code content area */}
        <Flex>
          {/* Line numbers with gradient background */}
          <Box
            background="linear-gradient(180deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)"
            px={4}
            py={6}
            borderRight="1px solid rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(5px)"
          >
            <VStack spacing={1} align="flex-end">
              {codeContent.map((_, index) => (
                <MotionText
                  key={index}
                  color="rgba(255, 255, 255, 0.4)"
                  fontSize="xs"
                  fontFamily="'JetBrains Mono', 'Fira Code', monospace"
                  lineHeight="1.6"
                  minH="1.6em"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index < currentLine ? 0.6 : 0.2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </MotionText>
              ))}
            </VStack>
          </Box>

          {/* Main code area */}
          <Box flex="1" p={6} position="relative">
            <VStack spacing={1} align="flex-start">
              <AnimatePresence>
                {codeContent.map((code, index) => (
                  <MotionBox
                    key={index}
                    position="relative"
                    w="full"
                    initial={{ opacity: 0, x: -30, rotateX: -90 }}
                    animate={{
                      opacity: index < currentLine ? 1 : 0,
                      x: index < currentLine ? 0 : -30,
                      rotateX: index < currentLine ? 0 : -90,
                    }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    style={{ transformOrigin: "top center" }}
                  >
                    {/* Line highlight effect */}
                    {highlightedLine === index && (
                      <MotionBox
                        position="absolute"
                        top={0}
                        left={-4}
                        right={-4}
                        bottom={0}
                        background="linear-gradient(90deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2), rgba(59, 130, 246, 0.2))"
                        borderRadius="6px"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <Text
                      color={typeColors[code.type]}
                      fontSize="sm"
                      fontFamily="'JetBrains Mono', 'Fira Code', monospace"
                      lineHeight="1.6"
                      minH="1.6em"
                      whiteSpace="pre"
                      position="relative"
                      textShadow="0 0 20px currentColor"
                    >
                      {code.line}
                      {index === currentLine - 1 && (
                        <MotionBox
                          position="absolute"
                          top="50%"
                          transform="translateY(-50%)"
                          left={`${code.line.length * 0.6}em`}
                          w="2px"
                          h="1.2em"
                          bg="linear-gradient(180deg, #C792EA, #82AAFF)"
                          borderRadius="1px"
                          boxShadow="0 0 10px rgba(199, 146, 234, 0.8)"
                          opacity={showCursor ? 1 : 0}
                          transition={{ duration: 0.1 }}
                        />
                      )}
                    </Text>
                  </MotionBox>
                ))}
              </AnimatePresence>
            </VStack>
          </Box>
        </Flex>

        {/* Floating gradient orbs */}
        <MotionBox
          position="absolute"
          top="20%"
          right="10%"
          w="40px"
          h="40px"
          background="radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)"
          borderRadius="full"
          filter="blur(15px)"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <MotionBox
          position="absolute"
          bottom="30%"
          left="15%"
          w="30px"
          h="30px"
          background="radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)"
          borderRadius="full"
          filter="blur(10px)"
          animate={{
            y: [10, -10, 10],
            x: [-5, 5, -5],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </Box>

      {/* External glow effect */}
      <Box
        position="absolute"
        top="-20px"
        left="-20px"
        right="-20px"
        bottom="-20px"
        background="radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15), transparent 70%)"
        borderRadius="44px"
        zIndex={-1}
        filter="blur(20px)"
      />
    </MotionBox>
  );
};

export default CodeBlock;
