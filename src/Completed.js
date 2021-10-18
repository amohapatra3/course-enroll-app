import React, { useState, useEffect } from "react";

class Completed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
    };
  }

  render() {
    return (
      <>
        <div>
          {" "}
          {this.props.data}
          <br />
          <select
            onChange={(e) => {
              const selectedRating = e.target.value;
              this.props.callbackFromCompleted(this.props.data, selectedRating);

              this.setState({ rating: selectedRating });
            }}
          >
            <option>none</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </>
    );
  }
}

export default Completed;
