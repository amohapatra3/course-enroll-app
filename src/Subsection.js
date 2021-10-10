import React from "react";
import "./App.css";

class Subsection extends React.Component {
  constructor() {
    super();
    this.buttonClicked = 0;
  }
  addButton(key) {
    console.log(this.props.disableButton);
    if (this.props.cartMode) {
      return (
        <>
          <button
            onClick={() => this.addSubsectionToCart(key)}
            disabled={this.props.disableButton}
          >
            Add subsection to cart
          </button>{" "}
          <br /> <br />
        </>
      );
    }
  }

  addSubsectionToCart(key) {
    this.buttonClicked++;
    this.props.callbackFromSubsections(key);
  }
  render() {
    let l = 0;

    return (
      <div>
        {this.props.data.map((key, index) => (
          <>
            <ul>
              <li key={key.number}> Number: {key.number}</li>
              <li key={key.location}> Location: {key.location}</li>
              <li key={++l}> Meeting Times: </li>
              {Object.keys(key.time).map((day, j) => {
                return (
                  <ul>
                    <li key={day}>
                      {" "}
                      {day} {key.time[day]}
                    </li>
                  </ul>
                );
              })}
            </ul>

            <br />
            {this.addButton(key)}
          </>
        ))}
      </div>
    );
  }
}

export default Subsection;
