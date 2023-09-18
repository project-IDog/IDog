import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders web3-boilerplate", () => {
  render(<App />);
  const linkElement = screen.getByText(/web3-boilerplate/i);
  expect(linkElement).toBeInTheDocument();
});
