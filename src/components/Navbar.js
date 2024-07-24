import React from "react";
import { Box, Flex, Spacer, Image } from "@chakra-ui/react";
import PublishTourDropdown from "./PublishTourDropdown";
import logo from "./logo.png"; // Adjust the path as needed

const Navbar = ({ publishedUrl, setPublishedUrl, queryParams, setQueryParams }) => {
  return (
    <Box borderBottom="0.5mm solid" borderColor="white">
      <Flex align="center" p={4}>
        <Box>
          <Image
            src={logo}
            alt="CloudPano Logo"
            maxWidth="150px" // Adjust the maximum width as needed
            height="auto"   // Automatically adjust height based on width
            objectFit="contain" // Ensure the entire logo is visible
          />
        </Box>
        <Spacer />
        <PublishTourDropdown
          publishedUrl={publishedUrl}
          setPublishedUrl={setPublishedUrl}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
