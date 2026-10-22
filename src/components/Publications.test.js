import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../context/LanguageContext";
import Publications from "./Publications";

test("renders all 42 publications consistently with contact information", () => {
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
  )).toHaveClass("text-foreground");
  expect(screen.getAllByRole("link", { name: /Contact us/i })).toHaveLength(42);
  expect(screen.queryByText("PDF coming soon")).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Download PDF|View/i })).not.toBeInTheDocument();
});
