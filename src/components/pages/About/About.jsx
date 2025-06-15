import React, { useState, useEffect } from "react";
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
  Badge,
  Icon,
  SimpleGrid,
  Flex,
  Link,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCode,
  FaHeart,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaStar,
  FaUsers,
  FaProjectDiagram,
  FaAward,
  FaExternalLinkAlt,
  FaEye,
  FaCodeBranch,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  SiDotnet,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMongodb,
  SiMicrosoftsqlserver,
  SiOpencv,
  SiTensorflow,
  SiArduino,
  SiBootstrap,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiCsharp,
} from "react-icons/si";
import githubAPI from "../../../services/githubApi";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const About = () => {
  const [githubData, setGithubData] = useState(null);
  const [allRepositories, setAllRepositories] = useState([]);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAllRepos, setLoadingAllRepos] = useState(false);
  const [error, setError] = useState(null);

  const bgGradient = useColorModeValue(
    "linear(to-br, brand.50, accent.50, purple.50)",
    "linear(to-br, gray.900, gray.800, purple.900)"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Static skills data (can be enhanced with dynamic detection later)
  const skills = [
    { name: ".NET", icon: SiDotnet, color: "#512BD4" },
    { name: "C#", icon: SiCsharp, color: "#239120" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "SQL Server", icon: SiMicrosoftsqlserver, color: "#CC2927" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "Arduino", icon: SiArduino, color: "#00979D" },
  ];

  // Fetch GitHub data on component mount
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await githubAPI.getCompleteUserData();
        setGithubData(data);
      } catch (err) {
        setError("Failed to load GitHub data. Please try again later.");
        console.error("GitHub API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Fetch all repositories when "Show More" is clicked
  const fetchAllRepositories = async () => {
    if (allRepositories.length > 0) {
      setShowAllRepos(true);
      return;
    }

    try {
      setLoadingAllRepos(true);
      const allRepos = await githubAPI.getUserRepositories();

      // Transform all repositories data
      const transformedRepos = allRepos
        .filter((repo) => !repo.fork) // Filter out forked repositories
        .map((repo) => githubAPI.transformRepositoryData(repo));

      // Get languages for each repository
      const reposWithLanguages = await Promise.all(
        transformedRepos.map(async (repo) => {
          try {
            const languages = await githubAPI.getRepositoryLanguages(repo.name);
            const techStack = Object.keys(languages).slice(0, 3); // Top 3 languages
            return {
              ...repo,
              tech:
                techStack.length > 0
                  ? techStack
                  : [repo.language].filter(Boolean),
            };
          } catch (error) {
            console.warn(`Could not fetch languages for ${repo.name}:`, error);
            return {
              ...repo,
              tech: [repo.language].filter(Boolean),
            };
          }
        })
      );

      setAllRepositories(reposWithLanguages);
      setShowAllRepos(true);
    } catch (err) {
      console.error("Error fetching all repositories:", err);
    } finally {
      setLoadingAllRepos(false);
    }
  };

  // Toggle show more/less repositories
  const toggleShowRepos = () => {
    if (showAllRepos) {
      setShowAllRepos(false);
    } else {
      fetchAllRepositories();
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <VStack spacing={8} align="stretch">
      <Skeleton height="60px" />
      <Card bg={cardBg}>
        <CardBody p={8}>
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            <VStack align="start" spacing={4}>
              <Skeleton height="32px" width="300px" />
              <SkeletonText mt={4} noOfLines={4} spacing={4} />
              <HStack spacing={4}>
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="150px" />
              </HStack>
            </VStack>
            <VStack spacing={4}>
              <Skeleton height="60px" width="80px" />
              <Skeleton height="60px" width="80px" />
              <Skeleton height="60px" width="80px" />
            </VStack>
          </Grid>
        </CardBody>
      </Card>
      <SimpleGrid columns={{ base: 3, md: 5, lg: 8 }} spacing={6}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height="100px" borderRadius="xl" />
        ))}
      </SimpleGrid>
    </VStack>
  );

  // Error component
  const ErrorDisplay = () => (
    <Alert status="error" borderRadius="xl">
      <AlertIcon />
      <Box>
        <AlertTitle>Error Loading Data!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Box>
    </Alert>
  );

  return (
    <>
      <Helmet>
        <title>
          About - {githubData?.profile?.name || "Selahaddin Şamil Neoldum"}
        </title>
        <meta
          name="description"
          content={`Learn about ${githubData?.profile?.name || "Selahaddin Şamil Neoldum"}, a passionate full stack developer from Turkey specializing in .NET, React, and modern web technologies.`}
        />
      </Helmet>

      <Box minH="calc(100vh - 64px)" bgGradient={bgGradient} py={20}>
        <Container maxW="container.xl">
          {loading && <LoadingSkeleton />}
          {error && <ErrorDisplay />}
          {!loading && !error && githubData && (
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
                    bgGradient="linear(to-r, brand.500, accent.500, purple.500)"
                    bgClip="text"
                  >
                    About Me
                  </Heading>
                  <Text fontSize="xl" color={textColor} maxW="2xl" mx="auto">
                    {githubData.profile.bio ||
                      "A passionate full stack developer from Turkey, crafting digital experiences with modern technologies and innovative solutions."}
                  </Text>
                </MotionBox>

                {/* Introduction Card */}
                <MotionCard
                  variants={itemVariants}
                  bg={cardBg}
                  shadow="xl"
                  borderRadius="2xl"
                >
                  <CardBody p={8}>
                    <Grid
                      templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
                      gap={8}
                      alignItems="center"
                    >
                      <Box>
                        <Heading
                          size="lg"
                          mb={4}
                          color={useColorModeValue("gray.800", "white")}
                        >
                          Hello! I'm {githubData.profile.name}
                        </Heading>
                        <Text
                          color={textColor}
                          fontSize="lg"
                          lineHeight="relaxed"
                          mb={6}
                        >
                          I'm a Computer Engineering student at Marmara
                          University with a deep passion for full stack
                          development. I specialize in building robust
                          applications using .NET, modern web technologies, and
                          database systems. My journey in programming has led me
                          to create various automation systems, web
                          applications, and innovative solutions that solve
                          real-world problems.
                        </Text>
                        <HStack spacing={4} flexWrap="wrap">
                          <HStack>
                            <Icon as={FaGraduationCap} color="brand.500" />
                            <Text color={textColor}>Marmara University</Text>
                          </HStack>
                          {githubData.profile.location && (
                            <HStack>
                              <Icon as={FaMapMarkerAlt} color="brand.500" />
                              <Text color={textColor}>
                                {githubData.profile.location}
                              </Text>
                            </HStack>
                          )}
                          <HStack>
                            <Icon as={FaHeart} color="red.500" />
                            <Text color={textColor}>
                              Full Stack Development
                            </Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaClock} color="brand.500" />
                            <Text color={textColor}>
                              Coding since{" "}
                              {new Date(
                                githubData.profile.createdAt
                              ).getFullYear()}
                            </Text>
                          </HStack>
                        </HStack>
                      </Box>

                      <VStack spacing={4}>
                        <Box textAlign="center">
                          <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="brand.500"
                          >
                            {githubData.profile.followers}+
                          </Text>
                          <Text color={textColor}>Followers</Text>
                        </Box>
                        <Box textAlign="center">
                          <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="accent.500"
                          >
                            {githubData.profile.publicRepos}
                          </Text>
                          <Text color={textColor}>Repositories</Text>
                        </Box>
                        <Box textAlign="center">
                          <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="purple.500"
                          >
                            {githubData.profile.publicGists}
                          </Text>
                          <Text color={textColor}>Gists</Text>
                        </Box>
                      </VStack>
                    </Grid>
                  </CardBody>
                </MotionCard>

                {/* Skills Section */}
                <MotionBox variants={itemVariants}>
                  <Heading
                    size="xl"
                    mb={8}
                    textAlign="center"
                    color={useColorModeValue("gray.800", "white")}
                  >
                    Technical Skills
                  </Heading>
                  <SimpleGrid columns={{ base: 3, md: 5, lg: 8 }} spacing={6}>
                    {skills.map((skill, index) => (
                      <MotionBox
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <VStack
                          p={4}
                          bg={cardBg}
                          borderRadius="xl"
                          shadow="md"
                          _hover={{ shadow: "xl" }}
                          transition="all 0.3s"
                          spacing={3}
                        >
                          <Icon
                            as={skill.icon}
                            boxSize={8}
                            color={skill.color}
                          />
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            textAlign="center"
                          >
                            {skill.name}
                          </Text>
                        </VStack>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                </MotionBox>

                {/* GitHub Stats Section */}
                <MotionBox variants={itemVariants}>
                  <Heading
                    size="xl"
                    mb={8}
                    textAlign="center"
                    color={useColorModeValue("gray.800", "white")}
                  >
                    GitHub Stats
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
                    <Card
                      bg={cardBg}
                      shadow="lg"
                      borderRadius="xl"
                      textAlign="center"
                    >
                      <CardBody p={6}>
                        <Icon
                          as={FaProjectDiagram}
                          boxSize={12}
                          color="brand.500"
                          mb={4}
                        />
                        <Heading size="lg" color="brand.500">
                          {githubData.profile.publicRepos}
                        </Heading>
                        <Text color={textColor}>Public Repos</Text>
                      </CardBody>
                    </Card>
                    <Card
                      bg={cardBg}
                      shadow="lg"
                      borderRadius="xl"
                      textAlign="center"
                    >
                      <CardBody p={6}>
                        <Icon
                          as={FaUsers}
                          boxSize={12}
                          color="green.500"
                          mb={4}
                        />
                        <Heading size="lg" color="green.500">
                          {githubData.profile.followers}
                        </Heading>
                        <Text color={textColor}>Followers</Text>
                      </CardBody>
                    </Card>
                    <Card
                      bg={cardBg}
                      shadow="lg"
                      borderRadius="xl"
                      textAlign="center"
                    >
                      <CardBody p={6}>
                        <Icon
                          as={FaEye}
                          boxSize={12}
                          color="purple.500"
                          mb={4}
                        />
                        <Heading size="lg" color="purple.500">
                          {githubData.profile.following}
                        </Heading>
                        <Text color={textColor}>Following</Text>
                      </CardBody>
                    </Card>
                    <Card
                      bg={cardBg}
                      shadow="lg"
                      borderRadius="xl"
                      textAlign="center"
                    >
                      <CardBody p={6}>
                        <Icon
                          as={FaCode}
                          boxSize={12}
                          color="orange.500"
                          mb={4}
                        />
                        <Heading size="lg" color="orange.500">
                          {githubData.profile.publicGists}
                        </Heading>
                        <Text color={textColor}>Public Gists</Text>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </MotionBox>

                {/* Recent Projects Section */}
                <MotionBox variants={itemVariants}>
                  <Heading
                    size="xl"
                    mb={8}
                    textAlign="center"
                    color={useColorModeValue("gray.800", "white")}
                  >
                    {showAllRepos ? "All Projects" : "Recent Projects"}
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {(showAllRepos
                      ? allRepositories
                      : githubData.repositories
                    ).map((project, index) => (
                      <MotionCard
                        key={project.id}
                        bg={cardBg}
                        shadow="lg"
                        borderRadius="xl"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -5, shadow: "2xl" }}
                      >
                        <CardBody p={6}>
                          <Flex justify="space-between" align="start" mb={4}>
                            <Heading size="md">{project.title}</Heading>
                            <HStack spacing={2}>
                              <Badge colorScheme="brand" variant="subtle">
                                {project.type}
                              </Badge>
                              <Link href={project.repo} isExternal>
                                <Icon
                                  as={FaExternalLinkAlt}
                                  color="brand.500"
                                  boxSize={4}
                                  _hover={{
                                    color: "brand.600",
                                    transform: "scale(1.1)",
                                  }}
                                  transition="all 0.2s"
                                />
                              </Link>
                            </HStack>
                          </Flex>

                          <Text color={textColor} mb={4} lineHeight="relaxed">
                            {project.description}
                          </Text>

                          <HStack
                            spacing={4}
                            mb={4}
                            color={textColor}
                            fontSize="sm"
                          >
                            <HStack>
                              <Icon as={FaStar} />
                              <Text>{project.stars}</Text>
                            </HStack>
                            <HStack>
                              <Icon as={FaCodeBranch} />
                              <Text>{project.forks}</Text>
                            </HStack>
                            <Text>Updated: {formatDate(project.updated)}</Text>
                          </HStack>

                          <Flex justify="space-between" align="center">
                            <HStack spacing={2} flexWrap="wrap">
                              {project.tech.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  colorScheme="accent"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </HStack>
                            <Link href={project.repo} isExternal>
                              <HStack
                                spacing={1}
                                color="brand.500"
                                _hover={{ color: "brand.600" }}
                                transition="color 0.2s"
                                fontSize="sm"
                              >
                                <Icon as={FaGithub} boxSize={4} />
                                <Text fontWeight="medium">View Code</Text>
                              </HStack>
                            </Link>
                          </Flex>
                        </CardBody>
                      </MotionCard>
                    ))}
                  </SimpleGrid>

                  {/* Show More/Less Button */}
                  <Flex justify="center" mt={8}>
                    <Button
                      onClick={toggleShowRepos}
                      variant="outline"
                      colorScheme="brand"
                      size="lg"
                      isLoading={loadingAllRepos}
                      loadingText="Loading repositories..."
                      leftIcon={
                        <Icon as={showAllRepos ? FaChevronUp : FaChevronDown} />
                      }
                      _hover={{
                        bg: useColorModeValue("brand.50", "brand.900"),
                        transform: "translateY(-2px)",
                        shadow: "lg",
                      }}
                      transition="all 0.3s"
                    >
                      {showAllRepos
                        ? "Show Less"
                        : `Show All ${githubData.profile.publicRepos} Projects`}
                    </Button>
                  </Flex>
                </MotionBox>

                {/* Connect Section */}
                <MotionCard
                  variants={itemVariants}
                  bg={cardBg}
                  shadow="xl"
                  borderRadius="2xl"
                >
                  <CardBody p={8} textAlign="center">
                    <Heading
                      size="lg"
                      mb={6}
                      color={useColorModeValue("gray.800", "white")}
                    >
                      Let's Connect!
                    </Heading>
                    <Text
                      color={textColor}
                      fontSize="lg"
                      mb={8}
                      maxW="2xl"
                      mx="auto"
                    >
                      I'm always excited to collaborate on interesting projects
                      and connect with fellow developers. Feel free to reach
                      out!
                    </Text>
                    <HStack spacing={6} justify="center" flexWrap="wrap">
                      <Link href={githubData.profile.githubUrl} isExternal>
                        <VStack
                          p={4}
                          borderRadius="xl"
                          _hover={{
                            bg: useColorModeValue("gray.50", "gray.700"),
                          }}
                          transition="all 0.3s"
                        >
                          <Icon as={FaGithub} boxSize={8} />
                          <Text fontSize="sm">GitHub</Text>
                        </VStack>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/selahaddin-samil-neoldum/"
                        isExternal
                      >
                        <VStack
                          p={4}
                          borderRadius="xl"
                          _hover={{
                            bg: useColorModeValue("gray.50", "gray.700"),
                          }}
                          transition="all 0.3s"
                        >
                          <Icon as={FaLinkedin} boxSize={8} color="#0077B5" />
                          <Text fontSize="sm">LinkedIn</Text>
                        </VStack>
                      </Link>
                      {githubData.profile.twitterUsername && (
                        <Link
                          href={`https://twitter.com/${githubData.profile.twitterUsername}`}
                          isExternal
                        >
                          <VStack
                            p={4}
                            borderRadius="xl"
                            _hover={{
                              bg: useColorModeValue("gray.50", "gray.700"),
                            }}
                            transition="all 0.3s"
                          >
                            <Icon as={FaTwitter} boxSize={8} color="#1DA1F2" />
                            <Text fontSize="sm">Twitter</Text>
                          </VStack>
                        </Link>
                      )}
                      <Link href="mailto:neoldums@gmail.com">
                        <VStack
                          p={4}
                          borderRadius="xl"
                          _hover={{
                            bg: useColorModeValue("gray.50", "gray.700"),
                          }}
                          transition="all 0.3s"
                        >
                          <Icon as={FaEnvelope} boxSize={8} color="#EA4335" />
                          <Text fontSize="sm">Email</Text>
                        </VStack>
                      </Link>
                    </HStack>
                  </CardBody>
                </MotionCard>
              </VStack>
            </MotionBox>
          )}
        </Container>
      </Box>
    </>
  );
};

export default About;
