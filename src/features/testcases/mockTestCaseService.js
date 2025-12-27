import { mockTestCases } from "./mockTestCases";
import { mockTestCaseDetails } from "./mockTestCaseDetails";

// Simulate API fetch by ID
export const getTestCaseById = (id) => {
  // For list → edit
  const basic = mockTestCases.find((tc) => tc.id === id);

  if (!basic) return null;

  // Merge with detailed structure
  return {
    ...mockTestCaseDetails,
    id: basic.id,
    title: basic.title,
    priority: basic.priority,
    type: basic.type,
    suite: basic.suite,
  };
};
