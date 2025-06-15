import React from "react";
import { HStack, Link, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const NavMenu = ({
  items,
  direction = "horizontal",
  spacing = 8,
  ...props
}) => {
  const location = useLocation();
  const activeColor = useColorModeValue("brand.500", "brand.300");
  const inactiveColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("brand.600", "brand.200");

  const linkVariants = {
    hover: {
      y: -2,
    },
    tap: {
      y: 0,
    },
  };

  const Container = direction === "horizontal" ? HStack : React.Fragment;

  const containerProps = direction === "horizontal" ? { spacing } : {};

  return (
    <Container {...containerProps} {...props}>
      {items.map(({ path, label, icon }) => {
        const isActive = location.pathname === path;

        return (
          <MotionLink
            key={path}
            as={RouterLink}
            to={path}
            position="relative"
            color={isActive ? activeColor : inactiveColor}
            fontWeight={isActive ? "semibold" : "medium"}
            fontSize="md"
            textDecoration="none"
            transition="all 0.2s"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            _hover={{
              color: hoverColor,
              textDecoration: "none",
            }}
            _after={{
              content: '""',
              position: "absolute",
              bottom: "-4px",
              left: 0,
              width: isActive ? "100%" : "0%",
              height: "2px",
              bg: "brand.500",
              transition: "width 0.3s ease",
            }}
            onHoverStart={() => {
              if (!isActive) {
                // Add hover effect
              }
            }}
          >
            {icon && (
              <motion.span
                style={{ marginRight: "8px" }}
                whileHover={{ scale: 1.1 }}
              >
                {icon}
              </motion.span>
            )}
            {label}
          </MotionLink>
        );
      })}
    </Container>
  );
};

export default NavMenu;
