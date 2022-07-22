import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Username from "../settings-components/Username.jsx";

describe("Username.jsx Test Suite in settings-components", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Username />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  test("1: The text on screen should render without crashing", () => {
    const text1 = screen.getByRole("textbox", { name: "Username" });

    expect(text1).toBeDefined();
  });

  test("2: The button on screen should render without crashing", () => {
    const button = screen.getByRole("button", { name: "SAVE" });

    expect(button).toBeDefined();
  });
});
