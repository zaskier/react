import { Component } from "react";
import { withRouter } from "react-router";

class Details extends Component {
  //class component
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    //lifecyclemethod
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
      //match.params.id is used to her url data
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false, //set stage
        },
        json.pets[0] //parse json data instead of every data added sepretly
      )
    ); // when adding in curly brackets it does not override other values(if they are present)
  }

  render() {
    if (this.state.loading) {
      return <h2> loading ...</h2>;
    }
    const { animal, breed, city, state, description, name } = this.state;
    return (
      <div className="details">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
      </div>
    );
  }
}
export default withRouter(Details); //withRouter added to pass details
