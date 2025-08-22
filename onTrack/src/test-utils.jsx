// test-utils.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Custom wrapper (useful for future Context, Providers, Router, etc.)
const customRender = (ui, options = {}) => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};


// Re-export everything
export * from "@testing-library/react";
export { customRender as render, screen, fireEvent, expect };