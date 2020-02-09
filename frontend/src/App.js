import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      list: []
    };
  }
  componentDidMount() {
    fetch("/list")
      .then(res => res.json())
      .then(list => this.setState({ list }));
  }

  changeUserInput(input) {
    this.setState({ task: input });
  }

  addToList(input) {
    let newList = this.state.list;
    newList.push(input);
    fetch("/list/add?task=input")
      .then(res => res.json())
      .then(list => this.setState({ list: newList, task: "" }));
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.task}
          onChange={e => this.changeUserInput(e.target.value)}
        />
        <button type="submit" onClick={() => this.addToList(this.state.task)}>
          add
        </button>
        <ul>
          {this.state.list.map(task => (
            <li>{task.task}</li>
          
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
