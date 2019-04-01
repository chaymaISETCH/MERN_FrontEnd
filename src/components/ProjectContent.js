import React from "react";
import Item from "./ProjectItem";
import { BrowserRouter as Link } from "react-router-dom";

export default class ProjectContent extends React.Component {
  constructor() {
    super();
    this.state = {
      projets: []
    };
  }

  componentWillMount() {
    this.getProjets();
  }
  getProjets() {
    fetch("http://localhost:8085/")
      .then(response => {
        if (response.ok) {
          for (let id in response) {
            console.log(id + ":  " + response[id]);
          }
          let c = response.json();
          return c;
        }
      })
      .then(data => {
        console.log(" length : " + data.length);
        let d = data[0];
        for (let id in d) {
          console.log("projet" + d[id]);
        }
        this.setState({ projets: data });
      })
      .catch(error => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <span
            style={{
              fontSize: "28px",
              fontFamily:
                'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif'
            }}
          >
            Liste des Projets
          </span>
          <button
            className="navbar-brand btn btn-outline-success"
            style={{ float: "right" }}
          >
            <Link to={"/createProject"}>Ajouter</Link>
          </button>
        </div>
        <div className="container">
          <table className="table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Projet</th>
                <th>Description</th>
                <th>Date début</th>
                <th>Duree</th>
                <th>Chef de projet</th>
                <th>détails</th>
                <th>Supprimer</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projets.map(projet => (
                <Item projet={projet} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
