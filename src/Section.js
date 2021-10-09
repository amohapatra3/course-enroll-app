import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends React.Component {
  constructor() {
    super();
    this.buttonClicked = 0;
    this.isSectionInCart = false;
  }
  addButton(key) {
    // console.log(this.props.disableButton);
    if (this.props.cartMode) {
      return (
        <>
          <button
            onClick={() => this.addSectionToCart(key)}
            disabled={this.props.disableButton}
          >
            Add section to cart
          </button>{" "}
          <br /> <br />
        </>
      );
    }
  }
  addSectionToCart(key) {
    this.buttonClicked++;
    this.props.callbackFromSections(key);
  }
  disableButton() {
    if (this.props.cartMode) {
      this.props.cart.map((element, i) => {
        this.props.sections.map((key, index) => {
          if (element.location === key.location) {
            this.isSectionInCart = true;
          } else {
            this.isSectionInCart = false;
          }
        });
      });
      return this.isSectionInCart;
    }
  }
  render() {
    let m = 0;

    return (
      <div>
        {this.props.sections.map((key, index) => (
          <>
            <h1> Section</h1>
            {this.addButton(key)}
            <ul>
              <li key={key.number}> Section Number: {key.number} </li>
              <li key={key.instructor}>Instructor: {key.instructor} </li>
              <li key={key.location}>Location: {key.location} </li>
              <li> Meeting Times: </li>
              {Object.keys(key.time).map((obj, i) => {
                return (
                  <ul>
                    <li key={obj}>
                      {" "}
                      {obj} {key.time[obj]}
                    </li>
                  </ul>
                );
              })}

              <h2> Subsections</h2>
              {key.subsections.length === 0 ? (
                <span>None</span>
              ) : (
                <Subsection
                  key={++m}
                  data={key.subsections}
                  cartMode={this.props.cartMode}
                  callbackFromSubsections={this.props.callbackFromSubsections}
                  disableButton={this.disableButton()}
                  cart={this.props.cart}
                />
              )}
            </ul>
          </>
        ))}
      </div>
    );
  }
}

export default Section;

//maintain global state as Cart state
//use function to manipulate state
//array of objects
//course name, list of sections, list of subsections
