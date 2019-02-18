import React, { Component } from "react";
import { render } from "react-dom";
import moment from "moment";
import TimeKeeper from "react-timekeeper";
import style from "../css/style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      task: [],
      date: "",
      ini: "12:00 pm",
      end: "12:00 pm",
      displayTimepicker: false,
      displayTimepicker2: false,
      _id: ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeChange2 = this.handleTimeChange2.bind(this);
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
          this.setState({
            title: "",
            description: "",
            _id: "",
            ini: "",
            end: ""
          });
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
          this.setState({ title: "", description: "", ini: "", end: "" });
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
  handleTimeChange(newTime) {
    this.setState({ ini: newTime.formatted });
  }
  handleTimeChange2(Time) {
    this.setState({ end: Time.formatted });
  }
  toggleTimekeeper(val) {
    this.setState({ displayTimepicker: val });
  }
  toggleTimekeeper2(value) {
    this.setState({ displayTimepicker2: value });
  }
  render() {
    return (
      <div>
        {/*NAV*/}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              <i className="material-icons">assignment</i>
              <i className="">Task</i>
            </a>
          </div>
        </nav>
        {/*END-NAV*/}
        <div className="container">
          <div className="row">
            <div className="col s3">
              {/*CARD-FORM*/}
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s6">
                        <input
                          name="ini"
                          value={this.state.ini}
                          onChange={this.handleChange}
                          className=""
                        />
                        {this.state.displayTimepicker ? (
                          <TimeKeeper
                            time={this.state.ini}
                            onChange={this.handleTimeChange}
                            onDoneClick={() => {
                              this.toggleTimekeeper(false);
                            }}
                            switchToMinuteOnHourSelect={true}
                          />
                        ) : (
                          false
                        )}
                        <a
                          className="buttom teal-text"
                          role="buttom"
                          onClick={() => this.toggleTimekeeper(true)}
                        >
                          Time Init
                        </a>
                      </div>
                      <div className="input-field col s6">
                        <input
                          name="end"
                          value={this.state.end}
                          onChange={this.handleChange}
                          className=""
                        />
                        {this.state.displayTimepicker2 ? (
                          <TimeKeeper
                            time={this.state.end}
                            onChange={this.handleTimeChange2}
                            onDoneClick={() => {
                              this.toggleTimekeeper2(false);
                            }}
                            switchToMinuteOnHourSelect={true}
                          />
                        ) : (
                          false
                        )}
                        <a
                          className="buttom teal-text"
                          role="buttom"
                          onClick={() => this.toggleTimekeeper2(true)}
                        >
                          Time End
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          value={this.state.title}
                          onChange={this.handleChange}
                          placeholder="Task Title"
                        />
                        <a className="teal-text">Title</a>
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
                        <a className="teal-text">Description</a>
                      </div>
                    </div>

                    {/*BUTTONS*/}

                    <button
                      className="btn-small waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Submit
                      <i class="material-icons right">send</i>
                    </button>
                  </form>
                </div>
              </div>
              {/*END-CARD-FORM*/}
            </div>
            <div className="card col s9">
              <table>
                <thead>
                  <tr>
                    <th>Init</th>
                    <th>End</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date of creation</th>
                    <th>Options</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.task.map(task => {
                    return (
                      <tr key={task._id}>
                        <td>{task.ini}</td>
                        <td>{task.end}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{moment(task.date).format("llll")}</td>
                        <td>
                          <button
                            className="blue darken-4 btn-small"
                            style={{ margin: "2px" }}
                          >
                            <i
                              className="material-icons"
                              onClick={() => this.editTask(task._id)}
                            >
                              edit
                            </i>
                          </button>
                          <button
                            className="red btn-small"
                            style={{ margin: "2px" }}
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
