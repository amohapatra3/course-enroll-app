import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends React.Component {
  instructors() {
    let instructor = [];
    this.props.sections.forEach((element) => {
      instructor.push(element.instructor);
    });
    return instructor;
  }
  number() {
    let courseNumber = [];
    this.props.sections.forEach((element) => {
      courseNumber.push(element.number);
    });
    return courseNumber;
  }
  getKeys() {
    return Object.keys(this.props.sections);
  }
  getValues() {
    return Object.values(this.props.sections);
  }

  render() {
    return (
      <div>
        <h1> Sections </h1>
        {this.props.sections.map((key, index) => (
          <ul>
            <li> Section Number: {key.number} </li>
            <li>Instructor: {key.instructor} </li>
            <li>Location: {key.location} </li>
            <li> Meeting Times: </li>
            {Object.keys(key.time).map((obj, i) => {
              return (
                <ul>
                  <li>
                    {" "}
                    {obj} {key.time[obj]}
                  </li>
                </ul>
              );
            })}
          </ul>
        ))}
      </div>
    );
  }
}

export default Section;
