import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends React.Component {
  render() {
    let l = 0;
    return (
      <div>
        {this.props.sections.map((key, index) => (
          <>
            <h1> Section </h1>
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
              {key.subsections.length === 0 ? <span>None</span> : null}
              <Subsection key={++l} data={this.props.sections} />
            </ul>
          </>
        ))}
      </div>
    );
  }
}

export default Section;
