import "./welcome.css";
import { facts } from "./fun-facts/facts";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Container,
  Square,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function WelcomePage() {
  const navigate = useNavigate();
  const positions = [
    { left: "70rem", top: "3rem" },
    { left: "60rem", top: "20rem" },
    { left: "38rem", top: "30rem" },
    { left: "15rem", top: "36rem" },
  ];
  const getFunFact = () => {
    const randomInt = Math.floor(Math.random() * 3); // Returns a random integer from 0 to 2
    const title = facts[randomInt].title[randomInt];
    const description = facts[randomInt].description;
    return [title, description];
  };
  const [title, description] = getFunFact();
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
              <strong>{title}</strong> {description}{" "}
              <Link href="https://en.wikipedia.org/wiki/Koala" isExternal>
                Wikipedia source
                <ExternalLinkIcon mx="2px" />
              </Link>
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
        {positions.map((value, index) => (
          <div key={index} className="paw-print-1" style={value}>
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
