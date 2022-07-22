import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import supabaseClient from "../auth-components/supabaseClient";
import Settings from "../settings-components/index.jsx";

describe("index.jsx Test Suite in settings-components", () => {
  beforeEach(async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Settings />
        </BrowserRouter>
      </ChakraProvider>
    );
    try {
      const { error } = await supabaseClient.auth.signIn({
        email: "user@example.com",
        password: "user123",
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  afterEach(() => {
    supabaseClient.auth.signOut();
  });

  test("1: The headers on screen should render without crashing", () => {
    const text1 = screen.getByRole("heading", { name: "Settings" });
    const text2 = screen.getByRole("heading", {
      name: "Update your account information",
    });
    const text3 = screen.getByRole("heading", { name: "About Us" });
    const text4 = screen.getByText(
      "The Koala Planner is an NUS Orbital Project for Summer AY21/22 done by Daniel Kok and Grace Yeh."
    );
    const text5 = screen.getByText("App version 2.0");

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
    expect(text3).toBeDefined();
    expect(text4).toBeDefined();
    expect(text5).toBeDefined();
  });
});
