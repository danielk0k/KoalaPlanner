import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RegisterForm from "../auth-components/RegisterForm.jsx";

describe("RegisterForm.jsx Modal Test Suite", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  test("1: The Text should render without crashing", () => {
    const text1 = screen.getByRole("heading", { name: "K" });
    const text2 = screen.getByRole("heading", { name: "Sign up" });
    const text3 = screen.getByText("to enjoy all of our cool features");

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
    expect(text3).toBeDefined();
  });

  test("2: The button should render without crashing", () => {
    const button1 = screen.getByRole("button", { name: "REGISTER" });

    expect(button1).toBeDefined();
    expect(button1).toBeTruthy();
  });

  test("3: The link should render without crashing", () => {
    const link1 = screen.getByRole("link", { name: "Login here" });

    expect(link1).toBeDefined();
  });
});
