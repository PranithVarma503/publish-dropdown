import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Box, ChakraProvider } from "@chakra-ui/react";

function App() {
  const [publishedUrl, setPublishedUrl] = useState(
    "https://app.cloudpano.com/tours/demo"
  );
  const [queryParams, setQueryParams] = useState([]);

  const urlWithParams = `${publishedUrl}${
    queryParams.length ? `?disable=${queryParams.join(",")}` : ""
  }`;

  return (
    <ChakraProvider>
      <Box className="min-h-screen" bg="#4C92EB"> {/* Background color applied here */}
        <Navbar
          publishedUrl={publishedUrl}
          setPublishedUrl={setPublishedUrl}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        <Box mt={10} className="iframe-container">
          <iframe
            src={urlWithParams}
            title="Published Tour"
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
