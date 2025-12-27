import { mockProjects } from "./mockProjects";

export const getProjectById = (id) => {
  return mockProjects.find((project) => project.id === id) || null;
};
