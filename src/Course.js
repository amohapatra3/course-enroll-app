import React from "react";
import { Accordion } from "react-bootstrap";
import "./App.css";
import Section from "./Section";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.courseInCart = false;
  }
  requisites() {
    let requisite = "";
    let j = 0;
    if (this.props.data.requisites.length === 0) {
      return "None";
    } else if (
      this.props.data.requisites.length === 1 &&
      this.props.data.requisites[0].length === 1
    ) {
      return this.props.data.requisites[0];
    } else {
      this.props.data.requisites.forEach((element) => {
        for (let index = 0; index < element.length; index++) {
          let req = "(" + this.props.data.requisites[j][index];
          if (index < this.props.data.requisites[j].length - 1) {
            requisite += req + " OR ";
          } else {
            requisite += req + ")";
          }
        }
        if (
          this.props.data.requisites.length > 1 &&
          j !== this.props.data.requisites.length - 1
        ) {
          requisite += " AND ";
        }
        j++;
      });
    }
    return requisite;
  }
  addButton() {
    if (this.props.cartMode) {
      return (
        <>
          <button onClick={() => this.addCourseToCart()}>
            Add course to cart
          </button>{" "}
          <br /> <br />
        </>
      );
    }
  }
  disableButton() {
    this.props.cart.map((element, i) => {
      console.log(element.instructor);
      if (
        element.instructor ===
        "All " + this.props.data.number + " sections and subsections"
      ) {
        this.isCourseInCart = true;
      } else {
        this.isCourseInCart = false;
      }
    });
  }
  accordionStyle() {
    return this.props.cartMode ? { maxWidth: "50%" } : null;
  }
  addCourseToCart() {
    this.props.callbackFromCourses(this.props.data);
  }
  render() {
    if (this.props.cartMode && this.props.cart.length === 0) {
      this.isSectionInCart = false;
    }

    return (
      <div>
        <Accordion style={this.accordionStyle()}>
          <Accordion.Item eventKey={this.props.data.number}>
            <Accordion.Header>
              {this.props.data.number}: {this.props.data.name}
            </Accordion.Header>
            <Accordion.Body>
              {this.addButton()}
              Credits: {this.props.data.credits} <br /> <br />
              Description: {this.props.data.description} <br /> <br />
              Requisites: {this.requisites()} <br /> <br />
              Keywords: {this.props.data.keywords.join()} <br /> <br />
              Subject: {this.props.data.subject} <br /> <br />
              <br />
              {this.props.cartMode ? this.disableButton() : null}
              <Section
                sections={this.props.data.sections}
                cartMode={this.props.cartMode}
                callbackFromSections={this.props.callbackFromSections}
                callbackFromSubsections={this.props.callbackFromSubsections}
                disableButton={this.isCourseInCart}
                cart={this.props.cart}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}
export default Course;

//pass contents of cart state from app -> coursearea and so on
//isCourseDisabled within coyrse.js
//if course is already in cart, change iscoursedisabled else false
