import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.isSectionInCart = false;
  }
  addButton(key) {
    console.log(this.props.disableButton);
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
    this.props.callbackFromSections(key);
  }
  disableButton() {
    this.props.cart.map((element, i) => {
      this.props.sections.map((key, index) => {
        if (element.number === key.number) {
          this.isSectionInCart = true;
        } else {
          this.isSectionInCart = false;
        }
      });
    });
  }
  render() {
    let m = 0;
    if (this.props.cartMode && this.props.cart.length === 0) {
      this.isSectionInCart = false;
    }
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
              {this.props.cartMode ? this.disableButton() : null}
              <h2> Subsections</h2>
              {key.subsections.length === 0 ? (
                <span>None</span>
              ) : (
                <Subsection
                  key={++m}
                  data={key.subsections}
                  cartMode={this.props.cartMode}
                  callbackFromSubsections={this.props.callbackFromSubsections}
                  disableButton={this.isSectionInCart}
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
