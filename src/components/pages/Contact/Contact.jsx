import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Icon,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  SimpleGrid,
  Flex,
  Divider,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaPaperPlane,
  FaUser,
  FaCommentDots,
  FaHeart,
  FaCode,
  FaRocket,
} from "react-icons/fa";
import {
  sendContactEmail,
  sendEmailViaFormspree,
  sendEmailViaWeb3Forms,
} from "../../../services/emailService";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const toast = useToast();

  const bgGradient = useColorModeValue(
    "linear(to-br, accent.50, brand.50, purple.50)",
    "linear(to-br, gray.900, gray.800, purple.900)"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Contact information
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "neoldums@gmail.com",
      href: "mailto:neoldums@gmail.com",
      color: "red.500",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Turkey (UTC +03:00)",
      color: "blue.500",
    },
    {
      icon: FaClock,
      title: "Response Time",
      value: "Usually within 24 hours",
      color: "green.500",
    },
    {
      icon: FaCode,
      title: "Specialization",
      value: "Full Stack Development",
      color: "purple.500",
    },
  ];

  // Social links
  const socialLinks = [
    {
      icon: FaGithub,
      name: "GitHub",
      href: "https://github.com/sneoldum",
      color: "gray.700",
      description: "Check out my code",
    },
    {
      icon: FaLinkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/selahaddin-samil-neoldum/",
      color: "blue.600",
      description: "Professional network",
    },
    {
      icon: FaTwitter,
      name: "Twitter",
      href: "https://twitter.com/NeoldumS",
      color: "blue.400",
      description: "Follow my journey",
    },
    {
      icon: FaEnvelope,
      name: "Email",
      href: "mailto:neoldums@gmail.com",
      color: "red.500",
      description: "Direct contact",
    },
  ];

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Try to send email using CloudMailin API first
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        toast({
          title: "Message sent successfully!",
          description:
            result.message ||
            "Thank you for reaching out. I'll get back to you soon.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      } else {
        // If CloudMailin API fails, try Web3Forms as backup
        console.log("CloudMailin API failed, trying Web3Forms...");
        const web3FormsResult = await sendEmailViaWeb3Forms(formData);

        if (web3FormsResult.success) {
          setSubmitStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });

          toast({
            title: "Message sent successfully!",
            description:
              "Thank you for reaching out. I'll get back to you soon.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // Final fallback to Formspree
          console.log("Web3Forms failed, trying Formspree...");
          const formspreeResult = await sendEmailViaFormspree(formData);

          if (formspreeResult.success) {
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });

            toast({
              title: "Message sent successfully!",
              description:
                "Thank you for reaching out. I'll get back to you soon.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } else {
            throw new Error("All email services failed");
          }
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      toast({
        title: "Failed to send message",
        description:
          "Please try again or contact me directly via email at neoldums@gmail.com",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <>
      <Helmet>
        <title>Contact - Selahaddin Şamil Neoldum</title>
        <meta
          name="description"
          content="Get in touch with Selahaddin Şamil Neoldum for collaboration opportunities, project discussions, or any development-related inquiries."
        />
      </Helmet>

      <Box minH="calc(100vh - 64px)" bgGradient={bgGradient} py={20}>
        <Container maxW="container.xl">
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <VStack spacing={16} align="stretch">
              {/* Hero Section */}
              <MotionBox variants={itemVariants} textAlign="center">
                <Heading
                  as="h1"
                  size="3xl"
                  mb={4}
                  bgGradient="linear(to-r, accent.500, brand.500, purple.500)"
                  bgClip="text"
                >
                  Let's Work Together
                </Heading>
                <Text fontSize="xl" color={textColor} maxW="2xl" mx="auto">
                  Have a project in mind? Want to collaborate? Or just want to
                  say hello? I'd love to hear from you! Let's create something
                  amazing together.
                </Text>
              </MotionBox>

              {/* Main Content Grid */}
              <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12}>
                {/* Contact Form */}
                <MotionBox variants={itemVariants}>
                  <Card bg={cardBg} shadow="xl" borderRadius="2xl">
                    <CardBody p={8}>
                      <VStack spacing={6} align="stretch">
                        <Box>
                          <Heading
                            size="lg"
                            mb={2}
                            color={useColorModeValue("gray.800", "white")}
                          >
                            Send a Message
                          </Heading>
                          <Text color={textColor}>
                            Fill out the form below and I'll get back to you as
                            soon as possible.
                          </Text>
                        </Box>

                        <form onSubmit={handleSubmit}>
                          <VStack spacing={4}>
                            <FormControl isInvalid={errors.name}>
                              <FormLabel
                                color={useColorModeValue(
                                  "gray.700",
                                  "gray.300"
                                )}
                              >
                                <HStack>
                                  <Icon as={FaUser} />
                                  <Text>Full Name</Text>
                                </HStack>
                              </FormLabel>
                              <Input
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                                bg={useColorModeValue("gray.50", "gray.700")}
                                border="2px solid transparent"
                                _focus={{
                                  bg: useColorModeValue("white", "gray.600"),
                                  borderColor: "brand.500",
                                  boxShadow:
                                    "0 0 0 1px var(--chakra-colors-brand-500)",
                                }}
                              />
                              <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.email}>
                              <FormLabel
                                color={useColorModeValue(
                                  "gray.700",
                                  "gray.300"
                                )}
                              >
                                <HStack>
                                  <Icon as={FaEnvelope} />
                                  <Text>Email Address</Text>
                                </HStack>
                              </FormLabel>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                bg={useColorModeValue("gray.50", "gray.700")}
                                border="2px solid transparent"
                                _focus={{
                                  bg: useColorModeValue("white", "gray.600"),
                                  borderColor: "brand.500",
                                  boxShadow:
                                    "0 0 0 1px var(--chakra-colors-brand-500)",
                                }}
                              />
                              <FormErrorMessage>
                                {errors.email}
                              </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.subject}>
                              <FormLabel
                                color={useColorModeValue(
                                  "gray.700",
                                  "gray.300"
                                )}
                              >
                                <HStack>
                                  <Icon as={FaCommentDots} />
                                  <Text>Subject</Text>
                                </HStack>
                              </FormLabel>
                              <Input
                                placeholder="What's this about?"
                                value={formData.subject}
                                onChange={(e) =>
                                  handleInputChange("subject", e.target.value)
                                }
                                bg={useColorModeValue("gray.50", "gray.700")}
                                border="2px solid transparent"
                                _focus={{
                                  bg: useColorModeValue("white", "gray.600"),
                                  borderColor: "brand.500",
                                  boxShadow:
                                    "0 0 0 1px var(--chakra-colors-brand-500)",
                                }}
                              />
                              <FormErrorMessage>
                                {errors.subject}
                              </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.message}>
                              <FormLabel
                                color={useColorModeValue(
                                  "gray.700",
                                  "gray.300"
                                )}
                              >
                                <HStack>
                                  <Icon as={FaPaperPlane} />
                                  <Text>Message</Text>
                                </HStack>
                              </FormLabel>
                              <Textarea
                                placeholder="Tell me about your project, idea, or just say hello..."
                                rows={6}
                                value={formData.message}
                                onChange={(e) =>
                                  handleInputChange("message", e.target.value)
                                }
                                bg={useColorModeValue("gray.50", "gray.700")}
                                border="2px solid transparent"
                                _focus={{
                                  bg: useColorModeValue("white", "gray.600"),
                                  borderColor: "brand.500",
                                  boxShadow:
                                    "0 0 0 1px var(--chakra-colors-brand-500)",
                                }}
                                resize="vertical"
                              />
                              <FormErrorMessage>
                                {errors.message}
                              </FormErrorMessage>
                            </FormControl>

                            <Button
                              type="submit"
                              size="lg"
                              width="full"
                              colorScheme="brand"
                              isLoading={isSubmitting}
                              loadingText="Sending..."
                              leftIcon={<Icon as={FaRocket} />}
                              _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "lg",
                              }}
                              transition="all 0.3s"
                            >
                              Send Message
                            </Button>
                          </VStack>
                        </form>

                        {submitStatus === "success" && (
                          <Alert status="success" borderRadius="lg">
                            <AlertIcon />
                            <Box>
                              <AlertTitle>Success!</AlertTitle>
                              <AlertDescription>
                                Your message has been sent successfully. I'll
                                get back to you soon!
                              </AlertDescription>
                            </Box>
                          </Alert>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </MotionBox>

                {/* Contact Information */}
                <MotionBox variants={itemVariants}>
                  <VStack spacing={8} align="stretch">
                    {/* Contact Info Cards */}
                    <Card bg={cardBg} shadow="xl" borderRadius="2xl">
                      <CardBody p={8}>
                        <VStack spacing={6} align="stretch">
                          <Box>
                            <Heading
                              size="lg"
                              mb={2}
                              color={useColorModeValue("gray.800", "white")}
                            >
                              Contact Information
                            </Heading>
                            <Text color={textColor}>
                              Here's how you can reach me directly.
                            </Text>
                          </Box>

                          <VStack spacing={4} align="stretch">
                            {contactInfo.map((info, index) => (
                              <MotionBox
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.5,
                                }}
                              >
                                <HStack
                                  p={4}
                                  bg={useColorModeValue("gray.50", "gray.700")}
                                  borderRadius="xl"
                                  _hover={{
                                    bg: useColorModeValue(
                                      "gray.100",
                                      "gray.600"
                                    ),
                                  }}
                                  transition="all 0.3s"
                                  as={info.href ? Link : Box}
                                  href={info.href}
                                  isExternal={!!info.href}
                                  textDecoration="none !important"
                                >
                                  <Icon
                                    as={info.icon}
                                    boxSize={6}
                                    color={info.color}
                                  />
                                  <Box>
                                    <Text
                                      fontWeight="semibold"
                                      color={useColorModeValue(
                                        "gray.800",
                                        "white"
                                      )}
                                    >
                                      {info.title}
                                    </Text>
                                    <Text color={textColor} fontSize="sm">
                                      {info.value}
                                    </Text>
                                  </Box>
                                </HStack>
                              </MotionBox>
                            ))}
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Social Links */}
                    <Card bg={cardBg} shadow="xl" borderRadius="2xl">
                      <CardBody p={8}>
                        <VStack spacing={6} align="stretch">
                          <Box>
                            <Heading
                              size="lg"
                              mb={2}
                              color={useColorModeValue("gray.800", "white")}
                            >
                              Connect With Me
                            </Heading>
                            <Text color={textColor}>
                              Find me on social media and professional networks.
                            </Text>
                          </Box>

                          <SimpleGrid columns={2} spacing={4}>
                            {socialLinks.map((social, index) => (
                              <MotionBox
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.5,
                                }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Link
                                  href={social.href}
                                  isExternal
                                  textDecoration="none !important"
                                >
                                  <VStack
                                    p={4}
                                    bg={useColorModeValue(
                                      "gray.50",
                                      "gray.700"
                                    )}
                                    borderRadius="xl"
                                    _hover={{
                                      bg: useColorModeValue(
                                        "gray.100",
                                        "gray.600"
                                      ),
                                      transform: "translateY(-2px)",
                                      shadow: "md",
                                    }}
                                    transition="all 0.3s"
                                    spacing={3}
                                  >
                                    <Icon
                                      as={social.icon}
                                      boxSize={8}
                                      color={social.color}
                                    />
                                    <Box textAlign="center">
                                      <Text
                                        fontWeight="semibold"
                                        color={useColorModeValue(
                                          "gray.800",
                                          "white"
                                        )}
                                      >
                                        {social.name}
                                      </Text>
                                      <Text color={textColor} fontSize="xs">
                                        {social.description}
                                      </Text>
                                    </Box>
                                  </VStack>
                                </Link>
                              </MotionBox>
                            ))}
                          </SimpleGrid>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </MotionBox>
              </Grid>

              {/* Call to Action */}
              <MotionCard
                variants={itemVariants}
                bg={cardBg}
                shadow="xl"
                borderRadius="2xl"
              >
                <CardBody p={8} textAlign="center">
                  <VStack spacing={6}>
                    <Icon as={FaHeart} boxSize={12} color="red.500" />
                    <Heading
                      size="lg"
                      color={useColorModeValue("gray.800", "white")}
                    >
                      Ready to Start Something Great?
                    </Heading>
                    <Text color={textColor} fontSize="lg" maxW="2xl">
                      Whether you have a specific project in mind, need
                      consulting, or just want to discuss technology trends, I'm
                      here to help. Let's turn your ideas into reality!
                    </Text>
                    <Divider />
                    <Text color={textColor} fontSize="sm" fontStyle="italic">
                      "The best way to predict the future is to create it." -
                      Let's create yours together.
                    </Text>
                  </VStack>
                </CardBody>
              </MotionCard>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
