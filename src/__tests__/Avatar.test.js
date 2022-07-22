import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import supabaseClient from "../auth-components/supabaseClient";
import ProfilePicture from "../settings-components/Avatar.jsx";

describe("Avatar.jsx Test Suite", () => {
  beforeEach(async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <ProfilePicture />
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

  test("1: The text on screen should render without crashing", () => {
    const text = screen.getByText("Upload an avatar");

    expect(text).toBeDefined();
  });

  test("2: The image and its surrounding regions render without crashing", () => {
    const img = screen.getByRole("img", { name: "avatar" });

    expect(img).toBeDefined();
  });

  test("3: The button should render without crashing", () => {
    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toBeDefined();
  });

  test("4: The status alerts render without crashing", () => {
    const status = screen.getByRole("status");
    const alert = screen.getByRole("alert", {
      name: "Error in retrieving avatar.",
    });

    expect(status).toBeDefined();
    expect(alert).toBeDefined();
  });

  test("5: The list item should be defined", () => {
    const listItem = screen.getByRole("listitem");

    expect(listItem).toBeDefined();
  });
});
