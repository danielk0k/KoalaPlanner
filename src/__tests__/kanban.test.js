import ReactDOM from "react-dom/client";
import { act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import Board from "../kanban-components/index";

let container;

beforeEach(async () => {
  container = document.createElement("div");
  document.body.appendChild(container);
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
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
  document.body.removeChild(container);
  container = null;
  supabaseClient.auth.signOut();
});

it("Test 1: Kanban board renders without crashing", () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Board />
      </BrowserRouter>
    );
  });
  const header = container.querySelector("h2");
  expect(header.innerHTML === "Board").toBeTruthy();
});
