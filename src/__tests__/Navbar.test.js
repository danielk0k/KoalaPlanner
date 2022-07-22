import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../ui-components/Navbar.jsx";

describe("Navbar.jsx Test Suite in settings-components", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  test("1: The button on screen should render without crashing", () => {
    const button = screen.getByRole("button", { name: "open menu" });

    expect(button).toBeDefined();
  });
});
