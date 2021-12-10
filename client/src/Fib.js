import axios from "axios";
import { Component } from "react";

class Fib extends Component {
  state = {
    seenValues: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    let values = axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    let seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  renderSeenIndexes() {
    return this.state.seenValues.map(({ number }) => number).join(", ");
  }

  renderValues() {
    let entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} i calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/api/values", {
      index: this.state.index,
    });

    this.setState({ index: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index</label>
          <input
            value={this.state.index}
            onChange={(e) => this.setState({ index: e.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes i have seen :</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated Values :</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
