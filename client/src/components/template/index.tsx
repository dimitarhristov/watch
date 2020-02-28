// import React from "react";

// interface CounterProps {
//   from: number;
//   intervalId: string;
// }
// export class Counter extends React.Component<CounterProps> {
//   intervalId: NodeJS.Timeout;

//   state = {
//     current: 0
//   };

//   updateCounter() {
//     this.setState({ counter: this.state.current + 1 });
//   }

//   componentWillMount() {
//     this.setState({ counter: this.props.from || 0 });
//     this.intervalId = setInterval(this.updateCounter.bind(this), 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.intervalId);
//   }

//   render() {
//     return <span>{this.state.current}</span>;
//   }
// }
