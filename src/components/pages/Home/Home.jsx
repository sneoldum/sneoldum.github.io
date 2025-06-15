import React, { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  useColorModeValue,
  Card,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { FaUser, FaRocket, FaArrowRight, FaEnvelope } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnimatedButton from "../../atoms/Button";
import CodeBlock from "../../molecules/CodeBlock";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const Home = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, brand.50, accent.50, brand.100)",
    "linear(to-br, gray.900, gray.800, brand.900)"
  );

  const cardBg = useColorModeValue("white", "gray.800");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const heroVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Selahaddin Şamil Neoldum - Web Developer</title>
        <meta
          name="description"
          content="Professional web developer creating beautiful, responsive web experiences with modern technologies like React, JavaScript, and Node.js."
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        minH="100vh"
        bgGradient={bgGradient}
        display="flex"
        alignItems="center"
        position="relative"
        overflow="hidden"
      >
        {/* Background Animation */}
        <MotionBox
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <Container maxW="container.xl" py={20}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={12}
            alignItems="center"
          >
            <GridItem>
              <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <VStack spacing={6} align="flex-start">
                  <MotionText
                    variants={itemVariants}
                    fontSize="lg"
                    color={useColorModeValue("gray.600", "gray.400")}
                    fontWeight="medium"
                  >
                    Hello, I'm
                  </MotionText>

                  <MotionHeading
                    variants={itemVariants}
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, brand.500, accent.500)"
                    bgClip="text"
                    lineHeight="1.2"
                  >
                    Selahaddin Şamil Neoldum
                  </MotionHeading>

                  <MotionHeading
                    variants={itemVariants}
                    as="h2"
                    size="xl"
                    color={useColorModeValue("gray.700", "gray.300")}
                    fontWeight="medium"
                  >
                    Web Developer
                  </MotionHeading>

                  <MotionText
                    variants={itemVariants}
                    fontSize="xl"
                    color={useColorModeValue("gray.600", "gray.400")}
                    maxW="500px"
                    lineHeight="relaxed"
                  >
                    I create beautiful, responsive web experiences that bring
                    ideas to life. Passionate about clean code, modern design,
                    and user-centered development.
                  </MotionText>

                  <MotionBox variants={itemVariants}>
                    <HStack spacing={4} flexWrap="wrap">
                      <AnimatedButton
                        as={RouterLink}
                        to="/about"
                        variant="primary"
                        size="lg"
                        rightIcon={<FaArrowRight />}
                      >
                        Learn More
                      </AnimatedButton>

                      <AnimatedButton
                        as={RouterLink}
                        to="/contact"
                        variant="secondary"
                        size="lg"
                        rightIcon={<FaEnvelope />}
                      >
                        Get In Touch
                      </AnimatedButton>
                    </HStack>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </GridItem>

            <GridItem>
              <MotionBox
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CodeBlock />
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
