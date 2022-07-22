import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginForm from "../auth-components/LoginForm.jsx";

describe("LoginForm.jsx Test Suite", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  test("1: The text on screen should render without crashing", () => {
    const heading1 = screen.getByText("K");
    const heading2 = screen.getByText("Sign in");
    const heading3 = screen.getByText("to enjoy all of our cool features");
    const heading4 = screen.getByText("LOGIN");
    const heading5 = screen.getByText("Don't have an account?");
    const heading6 = screen.getByText("Sign Up");

    expect(heading1).toBeDefined();
    expect(heading2).toBeDefined();
    expect(heading3).toBeDefined();
    expect(heading4).toBeDefined();
    expect(heading5).toBeDefined();
    expect(heading6).toBeDefined();
  });

  test("2: The buttons should render without crashing", () => {
    const button1 = screen.getByRole("button", { name: "LOGIN" });

    expect(button1).toBeDefined();
  });

  test("3: The Sign up link should render without crashing", () => {
    const signUpLink = screen.getByRole("link", { name: "Sign Up" });

    expect(signUpLink).toBeDefined();
  });
});
