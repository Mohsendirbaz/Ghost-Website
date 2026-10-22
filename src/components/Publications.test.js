import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../context/LanguageContext";
import Publications from "./Publications";

test("shows view and download actions for the first two papers and contact for the new collection", () => {
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
  const contacts = screen.getAllByRole("link", { name: /Contact us/i });
  expect(contacts).toHaveLength(40);
  expect(
    contacts.every((link) => link.getAttribute("href") === "mailto:dirbaz.sharif@gmail.com")
  ).toBe(true);
  expect(screen.queryByText("PDF coming soon")).not.toBeInTheDocument();
  const downloads = screen.getAllByRole("link", { name: "Download PDF" });
  const views = screen.getAllByRole("link", { name: "View" });
  expect(downloads).toHaveLength(2);
  expect(views).toHaveLength(2);
  expect(downloads[0]).toHaveAttribute(
    "href",
    "/docs/pdf/Physics_Informed_Special_Function_Framework.pdf"
  );
  expect(downloads[0]).toHaveAttribute(
    "download",
    "Physics_Informed_Special_Function_Framework.pdf"
  );
  expect(views[0]).toHaveAttribute(
    "href",
    "/docs/pdf/Physics_Informed_Special_Function_Framework.pdf"
  );
  expect(views[0]).toHaveAttribute("target", "_blank");
  expect(downloads[1]).toHaveAttribute(
    "href",
    "/docs/pdf/Climate_Policy_Benefit_Distribution.pdf"
  );
  expect(downloads[1]).toHaveAttribute("download", "Climate_Policy_Benefit_Distribution.pdf");
  expect(views[1]).toHaveAttribute(
    "href",
    "/docs/pdf/Climate_Policy_Benefit_Distribution.pdf"
  );
});
