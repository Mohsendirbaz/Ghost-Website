import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../context/LanguageContext";
import Publications from "./Publications";

test("renders all 42 publications and marks unavailable PDFs", () => {
  render(
    <LanguageProvider>
      <Publications />
    </LanguageProvider>
  );

  const entries = screen.getAllByRole("heading", { level: 3 });
  expect(entries).toHaveLength(42);
  expect(entries[2]).toHaveTextContent("Constitutional Geometry of Adaptive Systems");
  expect(screen.getByText(
    "A Formal Theory of Admissibility, State, Evidence, and Governed Transformation"
  )).toBeInTheDocument();
  expect(screen.getAllByText("PDF coming soon")).toHaveLength(40);
  expect(screen.getAllByRole("link", { name: /Download PDF/i })).toHaveLength(2);
  expect(screen.getAllByRole("link", { name: /^View$/i })).toHaveLength(2);
});
