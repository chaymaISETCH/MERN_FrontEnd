import React, { Component } from "react";
import { Link } from "react-router-dom";
import pen from "../image/pen.png";
import del from "../image/delete.png";
import zoom from "../image/zoom.png";

export default class ProjectItem extends Component {
  render() {
    const { projet } = this.props;
    return (
      <tr>
        <td>{projet.nom_projet}</td>
        <td>{projet.description}</td>
        <td>{projet.date_debut}</td>
        <td>{projet.duree} Jours</td>
        <td>{projet.chef_projet}</td>
        <td>
          {/*passing id */}
          <Link to={"/taches/" + projet._id}>
            <img
              alt="details"
              src={zoom}
              width="30"
              onClick={this.onClickDET}
            />
          </Link>
        </td>
        <td>
          <img
            src={del}
            alt="delete project"
            width="30"
            onClick={e => {
              console.log("click click click");
              fetch("http://localhost:8085/deleteproject/" + projet._id, {
                method: "DELETE",
                headers: { "Content-Type": "text/plain" }
              })
                .then(res => console.log("deleting"))
                .catch(err => console.log(err));
              console.log("delete");
            }}
          />
        </td>
        <td>
          <Link to={"/mod/" + projet._id}>
            <img alt="edit" src={pen} width="30" onClick={this.onClickMOD} />
          </Link>
        </td>
      </tr>
    );
  }
}
