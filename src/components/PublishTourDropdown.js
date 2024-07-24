import React, { useState } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  VStack,
  Text,
  Switch,
  useToast,
  Popover,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function PublishTourDropdown({
  publishedUrl,
  setPublishedUrl,
  queryParams,
  setQueryParams
}) {
  const publishOptions = [
    {
      name: "Publish now as a hosted tour",
      action: () => handlePublish()
    },
    {
      name: "Publish as MLS Compliant link",
      action: () => toast({
        title: "MLS Compliant link",
        description: "This option will publish your tour immediately as a hosted tour.",
        status: "info",
        duration: 5000,
        isClosable: true,
      })
    },
    {
      name: "Download and host on your own server",
      action: () => toast({
        title: "Download",
        description: "This option allows you to download the tour files and host them yourself.",
        status: "info",
        duration: 5000,
        isClosable: true,
      })
    },
    { name: "Publish to GSV", action: () => toast({
      title: "GSV",
      description: "This option will publish your tour immediately as a hosted tour.",
      status: "info",
      duration: 5000,
      isClosable: true,
    }) }
  ];

  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [publishCounter, setPublishCounter] = useState(0);
  const toast = useToast();

  const urlWithParams = `${publishedUrl}${
    queryParams.length ? `?disable=${queryParams.join(",")}` : ""
  }`;

  const handlePublish = () => {
    if (publishCounter > 0) {
      toast({
        title: "Already Published",
        description: "This tour has already been published.",
        status: "info",
        duration: 5000,
        isClosable: true
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPublished(true);
      setPublishCounter(publishCounter + 1);
      toast({
        title: "Published",
        description: "Your tour has been published successfully.",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    }, 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlWithParams);
    toast({
      title: "Link Copied",
      description: "The link has been copied to your clipboard.",
      status: "success",
      duration: 5000,
      isClosable: true
    });
  };

  const handlePublishClick = () => {
    if (isPublished) {
      toast({
        title: "Already Published",
        description: "Your tour is already published.",
        status: "info",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleToggle = (param) => {
    const newParams = queryParams.includes(param)
      ? queryParams.filter((p) => p !== param)
      : [...queryParams, param];
    setQueryParams(newParams);
  };

  return (
    <Box style={{ marginRight: "30px" }}>
      <Menu
        isOpen={menuOpen}
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
      >
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          onMouseEnter={() => {
            setMenuOpen(true);
            handlePublishClick();
          }}
          onMouseLeave={() => setMenuOpen(false)}
          className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          _hover={{ bg: "gray.200" }} // Change hover color
          onClick={handlePublishClick}
        >
          Publish
        </MenuButton>
        <MenuList
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <Box>
            {!isPublished ? (
              isLoading ? (
                <Box textAlign="center" padding={2}>
                  <Spinner size="lg" />
                </Box>
              ) : (
                publishOptions.map((item) => (
                  <Popover key={item.name}>
                    <PopoverTrigger>
                      <MenuItem
                        onClick={item.action}
                        _hover={{ bg: "gray.200" }} // Change hover color
                      >
                        <Button
                          w="full"
                          whiteSpace="normal"
                          textOverflow="clip"
                          colorScheme={
                            item.name === "Publish now as a hosted tour"
                              ? "blue"
                              : "gray"
                          }
                          variant={
                            item.name === "Publish now as a hosted tour"
                              ? "solid"
                              : "outline"
                          }
                        >
                          {item.name}
                        </Button>
                      </MenuItem>
                    </PopoverTrigger>
                  </Popover>
                ))
              )
            ) : (
              <Box width={400} padding={4}>
                <Button
                  w="full"
                  colorScheme="green"
                  whiteSpace="normal"
                  textOverflow="clip"
                  onClick={() => window.open(urlWithParams, "_blank")}
                  mb={4}
                >
                  Visit Tour
                </Button>
                <Button
                  w="full"
                  colorScheme="gray"
                  whiteSpace="normal"
                  textOverflow="clip"
                  onClick={handleCopyLink}
                  mb={4}
                >
                  Copy Link
                </Button>
                <Box mt={4}>
                  <Text fontWeight="semibold" mb={2}>
                    Toggle UI Elements
                  </Text>
                  <VStack align="start" spacing={4}>
                    {[
                      "logo",
                      "ribbon",
                      "controls",
                      "floorplan",
                      "request",
                      "leadgen",
                      "sound",
                      "watermark"
                    ].map((param) => (
                      <FormControl
                        key={param}
                        display="flex"
                        alignItems="center"
                      >
                        <FormLabel
                          htmlFor={param}
                          mb="0"
                          flexShrink={0}
                          width="85%"
                        >
                          {param}
                        </FormLabel>
                        <Switch
                          id={param}
                          onChange={() => handleToggle(param)}
                          isChecked={queryParams.includes(param)}
                        />
                      </FormControl>
                    ))}
                  </VStack>
                </Box>
              </Box>
            )}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
}
