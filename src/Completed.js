import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function CompletedCourse() {
  const [course, setCourse] = useState([]);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed"
      );
      const data = await response.json();

      setCourse(data.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Card
        style={{
          width: "calc(20vw - 5px)",
          marginLeft: "5px",
          height: "calc(100vh - 52px)",
          position: "fixed",
        }}
      >
        <Card.Body>
          <Card.Title>Completed Courses</Card.Title>
          {course.map((element, index) => {
            return (
              <div>
                {" "}
                {element}
                <br />
                <select
                  onChange={(e) => {
                    const selectedRating = e.target.value;
                    setRating(selectedRating);
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
            );
          })}{" "}
          {console.log(rating)}
        </Card.Body>
      </Card>
    </>
  );
}

export default CompletedCourse;
