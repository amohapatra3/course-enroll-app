import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends React.Component {
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
        <h2> Subsections</h2>
        <Subsection subsection={this.props.sections.subsections} />
      </div>
    );
  }
}

export default Section;
