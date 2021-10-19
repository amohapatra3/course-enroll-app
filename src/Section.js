import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./App.css";
import Subsection from "./Subsection";

class Section extends React.Component {
  render() {
    return (
      <Accordion.Item
        key={this.props.sectionKey}
        eventKey={this.props.sectionKey}
      >
        <Accordion.Header
          variant="link"
          style={{ height: 63, display: "flex", alignItems: "center" }}
        >
          {"Section " + this.props.sectionKey}
          {this.getSectionButton(this.props.sectionKey)}
        </Accordion.Header>
        <Accordion.Body>
          <Card.Body>
            {JSON.stringify(this.props.data.time)}
            {this.getSubsections()}
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>
    );
  }
  // checkIfCourseIsTaken() {
  //   if (!this.props.cartMode) {
  //     if (this.props.completedCourses.includes(this.props.course.number)) {
  //       alert("You have already taken this course");
  //     }
  //   }
  // }
  checkCourseRequisites() {
    if (!this.props.cartMode) {
      let j = 0;
      if (this.props.requisites === 0) {
        return null;
      } else if (
        this.props.requisites === 1 &&
        this.props.requisites[0].length === 1
      ) {
        if (
          !this.props.completedCourses.includes(this.props.requisites[0][0])
        ) {
          alert("Course requisites not met");
        }
      } else {
        this.props.requisites.forEach((element) => {
          for (let index = 0; index < element.length; index++) {
            if (
              !this.props.completedCourses.includes(
                this.props.requisites[j][index]
              )
            ) {
              alert("Course requisites not met");
              break;
            }
          }

          j++;
        });
      }
    }
  }
  getSubsections() {
    let subsections = [];

    for (let i = 0; i < this.props.data.subsections.length; i++) {
      subsections.push(
        <Subsection
          key={this.props.data.subsections[i].number}
          data={this.props.data.subsections[i]}
          addCartCourse={this.props.addCartCourse}
          removeCartCourse={this.props.removeCartCourse}
          cartCourses={this.props.cartCourses}
          courseKey={this.props.courseKey}
          sectionKey={this.props.sectionKey}
          requisites={this.props.requisites}
          cartMode={this.props.cartMode}
          completedCourses={this.props.completedCourses}
          course={this.props.course}
          subsectionKey={i}
        />
      );
    }

    return <Accordion defaultActiveKey="0">{subsections}</Accordion>;
  }

  getSectionButton(section) {
    let buttonVariant = "dark";
    let buttonOnClick = (e) => {
      this.addSection(e, section);
      this.checkCourseRequisites();
      // this.checkIfCourseIsTaken();
    };
    let buttonText = "Add Section";

    if (this.props.courseKey in this.props.cartCourses) {
      if (section in this.props.cartCourses[this.props.courseKey]) {
        buttonVariant = "outline-dark";
        buttonOnClick = (e) => this.removeSection(e, section);
        buttonText = "Remove Section";
      }
    }

    return (
      <Button
        as="a"
        variant={buttonVariant}
        onClick={buttonOnClick}
        style={{ position: "absolute", right: 50 }}
      >
        {buttonText}
      </Button>
    );
  }

  addSection(e, section) {
    e.stopPropagation();
    this.props.addCartCourse({
      course: this.props.courseKey,
      section: section,
    });
  }

  removeSection(e, section) {
    e.stopPropagation();
    this.props.removeCartCourse({
      course: this.props.courseKey,
      section: section,
    });
  }
}

export default Section;
