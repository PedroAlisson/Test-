import React, { useEffect, useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      console.log("Response", response);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProjects() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Pedim",
    });
    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="homepage" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProjects}>
        Adicionar Projecto
      </button>
    </>
  );
}
