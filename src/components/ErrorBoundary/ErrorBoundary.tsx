import React, { Component, PropsWithChildren, ReactNode } from 'react';

type ErrorBoudaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren<ReactNode>, ErrorBoudaryState> {
  constructor(props: PropsWithChildren<ReactNode>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoudaryState {
    console.log(error);
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
