import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      task: [],
      _id: ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.fetchTasks();
  }
  fetchTasks() {
    fetch("/api/task")
      .then(res => res.json())
      .then(data => {
        this.setState({ task: data });
        console.log(this.state.task);
      });
  }

  addTask(e) {
    if (this.state._id) {
      fetch(`/api/task/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: "Update Task" });
          this.setState({ title: "", description: "", _id: "" });
          this.fetchTasks();
        });
    } else {
      fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: "Saved Task" });
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch(err => console.log(err));
    }
    e.preventDefault();
  }

  deleteTask(id) {
    if (confirm("Are you sure you want to delete")) {
      fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: "Delete Task" });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/task/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        {/*NAV*/}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              <i className="material-icons">assignment</i>
              <a className="">HVG task app</a>
            </a>
          </div>
        </nav>
        <br />
        <br />
        <br />

        {/*END-NAV*/}
        <div className="container">
          <div className="row">
            <div className="col s5">
              {/*CARD-FORM*/}
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          type="text"
                          value={this.state.title}
                          onChange={this.handleChange}
                          placeholder="Task Title"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          placeholder="Task Description"
                          className="materialize-textarea"
                        />
                      </div>
                    </div>
                    {/*BUTTONS*/}
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
              {/*END-CARD-FORM*/}
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.task.map(task => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "5px" }}
                          >
                            <i
                              className="material-icons"
                              onClick={() => this.editTask(task._id)}
                            >
                              edit
                            </i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "5px" }}
                          >
                            <i
                              className="material-icons"
                              onClick={() => this.deleteTask(task._id)}
                            >
                              delete
                            </i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
