import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Credential from "../settings-components/Credential.jsx";

describe("Credential.jsx Test Suite", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Credential />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  test("1: The text on screen should render without crashing", () => {
    const text1 = screen.getByText("Email");
    const text2 = screen.getByText("Password");

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
  });

  test("2: The save button should render without crashing", () => {
    const button = screen.getByRole("button", { name: "SAVE" });

    expect(button).toBeDefined();
  });
});
