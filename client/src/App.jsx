import "./App.css";
import { Button, Box, Container } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Box
        bg="tomato"
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
          There are many benefits to a joint design and development system. Not
          only does it bring benefits to the design team, but it also brings
          benefits to engineering teams. It makes sure that our experiences have
          a consistent look and feel, not just in our design specs, but in
          production
        </Container>
      </Box>
    </>
  );
}

export default App;
