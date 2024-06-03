import "./App.css";
import {
  Button,
  Box,
  Container,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Text,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { shortenUrl } from "../api/apiCalls";
import { useState } from "react";

function App() {
  const toast = useToast();
  const [originalUrl, setOriginalUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleUrl = async () => {
    setIsLoading(true);
    if (!originalUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
    try {
      const data = await shortenUrl(originalUrl);
      setResponse(data);
      toast({
        title: "Success",
        description: "URL shortened successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      setOriginalUrl("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    }
  };
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  // console.log("data;", response);

  return (
    <>
      <Box
        bg="#06c9a2"
        w="100vw"
        h="100vh"
        p={4}
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Container>
          <Card>
            <CardHeader>
              <Heading size="md">Shorten your long URL</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box display="flex" flexDirection="column" gap={2}>
                  <Heading size="xs" textTransform="uppercase">
                    URl Link
                  </Heading>
                  <Input
                    placeholder="Copy paste your URL here"
                    size="md"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                  />
                </Box>

                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {response ? " Shorten URL" : "Shorten URL not generated"}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {response?.shortUrl}
                  </Text>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    mt={2}
                  >
                    <Button
                      colorScheme="gray"
                      size="md"
                      width="100%"
                      isDisabled={!response}
                      onClick={() => {
                        navigator.clipboard.writeText(response?.shortUrl);
                        toast({
                          title: "Success",
                          description: "URL copied to clipboard",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                          position: "top",
                        });
                        setResponse(null);
                      }}
                    >
                      Copy URL
                    </Button>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                  mt={2}
                >
                  <Button
                    colorScheme="gray"
                    size="md"
                    width="100%"
                    onClick={() => handleUrl()}
                    isLoading={isLoading}
                  >
                    Shorten URL
                  </Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default App;
