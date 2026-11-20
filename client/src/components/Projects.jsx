import React from "react";
import { gql } from "@apollo/client";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import { useQuery } from "@apollo/client/react";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`;

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      {data.projects.length > 0 ? (
        <>
          <div className="row mt-5">
            {data.projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </>
      ) : (
        <p>No projects to display</p>
      )}
    </>
  );
};

export default Projects;
