import "./welcome.css";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Container,
  Square,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

function WelcomePage() {
  const navigate = useNavigate();
  const positions = [
    { left: "70rem", top: "3rem" },
    { left: "60rem", top: "20rem" },
    { left: "38rem", top: "30rem" },
    { left: "15rem", top: "36rem" },
  ];
  return (
    <>
      <Flex marginTop="5rem" padding="3rem">
        <Stack spacing={10}>
          <Square size="60px" bg="#2C3E50" rounded={"lg"}>
            <Heading textColor="#FFFFFF">K</Heading>
          </Square>
          <Stack spacing={8}>
            <Stack spacing={2}>
              <Heading size="2xl">Koala Planner</Heading>
              <Heading size="md" fontWeight="light">
                Who says Koalas aren't hardworking?
              </Heading>
            </Stack>
            <Text width={{ base: "100%", md: "50%" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              modi aspernatur quam est atque id alias accusantium quo
              voluptates. Error necessitatibus iusto rem velit nesciunt tempora
              dolores ratione blanditiis harum?
              <strong> This will be replaced with the fact of the day.</strong>
            </Text>
            <Button
              onClick={() => navigate("/app", { replace: true })}
              textColor="#f8f9fe"
              bgColor="#34495E"
              borderWidth="1px"
              width={{ base: "100%", md: "25%", lg: "15%" }}
              _hover={{
                backgroundColor: "#f8f9fe",
                textColor: "#34495E",
                borderColor: "#34495E",
                borderWidth: "1px",
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Container
        visibility={{
          base: "hidden",
          lg: "visible",
        }}
      >
        {positions.map((value) => (
          <div className="paw-print-1" style={value}>
            <div className="pad large"></div>
            <div className="pad small-1"></div>
            <div className="pad small-2"></div>
            <div className="pad small-3"></div>
            <div className="pad small-4"></div>
          </div>
        ))}
      </Container>
    </>
  );
}

export default WelcomePage;
