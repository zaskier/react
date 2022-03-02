import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";

interface StateType {
  hasError: boolean;
  redirect: boolean;
}
class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError(): { hasError: boolean; redirect: boolean } {
    return { hasError: true, redirect: false };
  }
  public componentDidCatch(error: Error, info: ErrorInfo): void {
    //todo add monitoring here
    console.error("ErrorBoundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render(): ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
