import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "../profile-components/Dashboard.jsx";
import supabaseClient from "../auth-components/supabaseClient";

describe("Dashboard.jsx Test Suite", () => {
  let wrapper;

  beforeEach(() => {
    const email = "abc@gmail.com";
    const password = "12345678";

    const { error } = supabaseClient.auth.signIn({
      email,
      password,
    });

    const session = supabaseClient.auth.session();

    render(
      <ChakraProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ChakraProvider>
    );
  });

  test("1: The Text should render without crashing", () => {
    const text1 = screen.getByRole("heading", { name: "Profile" });
    const text2 = screen.getByRole("heading", {
      name: "View your achievements and statistics",
    });
    const text3 = screen.getByRole("heading", { name: "Welcome back" });

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
    expect(text3).toBeDefined();
  });

  test("2: The buttons should render without crashing", () => {
    const button1 = screen.getByRole("button", { name: "open menu" });
    const button2 = screen.getByRole("button", { name: "Close" });

    expect(button1).toBeDefined();
    expect(button2).toBeDefined();
  });

  test("3: The table and tabs should be render without crashing", () => {
    const tablist = screen.getByRole("tablist");
    const tab1 = screen.getByRole("tab", { name: "Due This Week" });
    const tab2 = screen.getByRole("tab", { name: "Completed This Week" });

    expect(tablist).toBeDefined();
    expect(tab1).toBeDefined();
    expect(tab2).toBeDefined();
  });

  test("4: The status alerts and list items should render without crashing", () => {
    const listItem = screen.getByRole("listitem");
    const statusTab = screen.getByRole("status");
    const alertNotif = screen.getByRole("alert", {
      name: "Error in retrieving user data.",
    });

    expect(listItem).toBeDefined();
    expect(statusTab).toBeDefined();
    expect(alertNotif).toBeDefined();
  });
});
