import React from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionIconButton = motion(IconButton)

const Footer = () => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/sneoldum', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://www.twitter.com/neoldums', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/selahaddin-samil-neoldum/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/ssneoldum/', label: 'Instagram' },
  ]

  return (
    <Box bg={bg} borderTop="1px solid" borderColor={borderColor}>
      <Container maxW="container.xl" py={8}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            © {new Date().getFullYear()} Selahaddin Şamil Neoldum
          </Text>
          
          <HStack spacing={4}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <MotionIconButton
                key={label}
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                icon={<Icon />}
                variant="ghost"
                size="lg"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                _hover={{
                  bg: 'brand.500',
                  color: 'white',
                }}
              />
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer 