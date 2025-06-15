import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import AnimatedButton from "../../atoms/Button";
import { FaHome } from "react-icons/fa";

const MotionBox = motion(Box);

const NotFound = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)",
    "linear(to-br, gray.900, gray.800)"
  );

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Helmet>

      <Box
        minH="calc(100vh - 64px)"
        bgGradient={bgGradient}
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <VStack spacing={8}>
              <Heading
                as="h1"
                size="4xl"
                bgGradient="linear(to-r, brand.500, accent.500)"
                bgClip="text"
              >
                404
              </Heading>

              <Heading
                as="h2"
                size="xl"
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Page Not Found
              </Heading>

              <Text
                fontSize="lg"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                The page you're looking for doesn't exist or has been moved.
              </Text>

              <AnimatedButton
                as={RouterLink}
                to="/"
                variant="primary"
                size="lg"
                leftIcon={<FaHome />}
              >
                Go Home
              </AnimatedButton>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
