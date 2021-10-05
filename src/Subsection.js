import React from "react";
import "./App.css";

class Subsection extends React.Component {
  render() {
    let l = 0;
    return (
      <div>
        {this.props.data.map((key, index) => (
          <>
            {Object.values(key.subsections).map((obj, i) => {
              return (
                <>
                  <ul>
                    <li key={obj.number}> Number: {obj.number}</li>
                    <li key={obj.location}> Location: {obj.location}</li>
                    <li key={++l}> Meeting Times: </li>
                    {Object.keys(obj.time).map((day, j) => {
                      return (
                        <ul>
                          <li key={day}>
                            {" "}
                            {day} {obj.time[day]}
                          </li>
                        </ul>
                      );
                    })}
                  </ul>
                  <br />
                </>
              );
            })}
          </>
        ))}
      </div>
    );
  }
}

export default Subsection;
