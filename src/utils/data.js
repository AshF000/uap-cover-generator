export const uniName = "University of Asia Pacific";
export const uniLogo = "/.assets/UAP-logo.png";

export const departments = [
  { full: "Computer Science & Engineering", short: "CSE" },
  { full: "Electrical & Electronic Engineering", short: "EEE" },
  { full: "Civil Engineering", short: "CE" },
  { full: "Architecture", short: "Arch" },
  { full: "Pharmacy", short: "Pharm" },
  { full: "Business Administration", short: "BBA" },
  { full: "Law", short: "Law" },
  { full: "English", short: "Eng" },
];

export const semesters = [
  "1.1",
  "1.2",
  "2.1",
  "2.2",
  "3.1",
  "3.2",
  "4.1",
  "4.2",
];

export const sections = [
  "A",
  "A1",
  "A2",
  "B",
  "B1",
  "B2",
  "C",
  "C1",
  "C2",
  "D",
  "D1",
  "D2",
  "E",
  "E1",
  "E2",
];

// Formats course code: "cse-301" or "cse - 301" → "CSE - 301"
export const formatCourseCode = (code) => {
  if (!code) return "";
  // Remove extra spaces, split by hyphen, uppercase, rejoin with " - "
  return code
    .split(/\s*-\s*/)
    .map((part) => part.trim().toUpperCase())
    .join(" - ");
};

// Formats date: "2026-02-25" → "25 February, 2026"
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
