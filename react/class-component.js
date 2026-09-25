// How to use reducer in a React class component - mapstatetoprops & dispatchtoprops example

import React, { Component } from "react";
import { connect } from "react-redux";

class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;

    return (
      <div>
        <h2>Count: {count}</h2>

        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}

// Redux state → component props
const mapStateToProps = (state) => ({
  count: state.count,
});

// Dispatch → component props
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
