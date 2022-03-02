import { Component, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { PetApiResponse, Animal } from "./APIResponseTypes";

class Details extends Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    //lifecyclemethod
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
      //match.params.id is used to her url data
    );
    const json = (await res.json()) as PetApiResponse;
    this.setState(
      Object.assign(
        {
          loading: false, //set stage
        },
        json.pets[0] //parse json data instead of every data added sepretly
      )
    );
  }

  // when adding in curly brackets it does not override other values(if they are present)

  toogleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  render() {
    // throw new Error("it is broken"); // to test error

    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toogleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons"></div>
                <ThemeContext.Consumer>
                  {([theme]) => (
                    <button
                      onClick={this.adopt}
                      style={{ backgroundColor: theme }}
                    >
                      Yes
                    </button>
                  )}
                </ThemeContext.Consumer>
                <ThemeContext.Consumer>
                  {([theme]) => (
                    <button
                      onClick={this.toogleModal}
                      style={{ backgroundColor: theme }}
                    >
                      No
                    </button>
                  )}
                </ThemeContext.Consumer>
                {/* //todo validate how doubled themeContext can be merged */}
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

// error boundary
const DetailsErrorBoundary: FunctionComponent =
  function DetailsErrorBoundary() {
    return (
      <ErrorBoundary>
        <DetailsWithRouter />
      </ErrorBoundary>
    );
  };

export default DetailsErrorBoundary;
