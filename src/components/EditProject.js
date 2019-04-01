import React, { Component } from "react";

export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_projet: "",
      description: "",
      date_debut: Date.now,
      duree: 0,
      chef_projet: ""
    };
  }

  componentWillMount() {
    this.getProjets();
  }
  getProjets() {
    //get all projects
    //promise
    fetch("http://localhost:8085/getprojectbyid/" + this.props.match.params.id)
      //parsing to json
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
        this.setState({
          nom_projet: data["nom_projet"],
          description: data["description"],
          date_debut: data["date_debut"],
          duree: data["duree"],
          chef_projet: data["chef_projet"]
        });
      })
      .catch(error => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const cssbutton = { marginTop: 20 };
    const cssbutton2 = { width: 500 };
    const projet = this.props.projet;
    return (
      <div className="text-center cssbutton" style={cssbutton2}>
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Ajouter un projet</h1>
          <input
            type="text"
            value={this.state.nom_projet}
            className="form-control"
            placeholder="Nom"
            required
            onChange={e =>
              this.setState({
                nom_projet: e.target.value
              })
            }
          />
          <input
            type="text"
            value={this.state.description}
            className="form-control"
            placeholder="Description"
            onChange={e => this.setState({ description: e.target.value })}
          />
          <label>Date</label>
          <input
            type="date"
            value={this.state.date_debut.date}
            className="form-control"
            placeholder="Date"
            onChange={e => this.setState({ date_debut: e.target.value })}
          />
          <input
            type="number"
            value={this.state.duree}
            className="form-control"
            placeholder="durée"
            onChange={e => this.setState({ duree: e.target.value })}
          />
          <input
            type="text"
            value={this.state.chef_projet}
            className="form-control"
            placeholder="Chef de projet"
            onChange={e => this.setState({ chef_projet: e.target.value })}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={e => {
              e.preventDefault();
              let projet = {
                nom_projet: this.state.nom_projet,
                description: this.state.description,
                date_debut: this.state.date_debut,
                duree: this.state.duree,
                chef_projet: this.state.chef_projet
              };
              fetch("http://localhost:8085/addproject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projet)
              })
                .then(res => console.log("added"))
                .catch(err => console.log(err));
              console.log(this.state);

              this.props.history.push("/projets");
            }}
            style={cssbutton}
            type="submit"
          >
            Valider
          </button>
          <p className="mt-5 mb-3 text-muted">© 2019 Chayma Trabelsi</p>
        </form>
      </div>
    );
  }
}
