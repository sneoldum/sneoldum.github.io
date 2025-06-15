import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box as="main" flex="1" pt="64px">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
