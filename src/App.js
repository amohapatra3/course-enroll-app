import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Card } from "react-bootstrap";
import Recommended from "./Recommended";
import Completed from "./Completed";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
      filteredCourses: [],
      subjects: [],
      keywords: [],
      completedCourses: [],
      recommendedCourses: [],
      cartCourses: {},
    };
  }

  componentDidMount() {
    this.loadInitialState();
  }

  async loadInitialState() {
    let courseURL = "http://cs571.cs.wisc.edu:53706/api/react/classes";
    let courseData = await (await fetch(courseURL)).json();
    const response = await fetch(
      "http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed"
    );
    const data = await response.json();
    this.setState({
      allCourses: courseData,
      filteredCourses: courseData,
      subjects: this.getSubjects(courseData),
      keywords: this.getKeywords(courseData),
      completedCourses: data.data,
    });
  }

  getKeywords(data) {
    let keywords = [];
    keywords.push("All");
    for (let i = 0; i < data.length; i++) {
      data[i].keywords.forEach((element) => {
        if (keywords.indexOf(element) === -1) keywords.push(element);
      });
    }

    return keywords;
  }
  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (let i = 0; i < data.length; i++) {
      if (subjects.indexOf(data[i].subject) === -1)
        subjects.push(data[i].subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  addCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses)); // I think this is a hack to deepcopy
    let courseIndex = this.state.allCourses.findIndex((x) => {
      return x.number === data.course;
    });
    if (courseIndex === -1) {
      return;
    }

    if ("subsection" in data) {
      if (data.course in this.state.cartCourses) {
        if (data.section in this.state.cartCourses[data.course]) {
          newCartCourses[data.course][data.section].push(data.subsection);
        } else {
          newCartCourses[data.course][data.section] = [];
          newCartCourses[data.course][data.section].push(data.subsection);
        }
      } else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        newCartCourses[data.course][data.section].push(data.subsection);
      }
    } else if ("section" in data) {
      if (data.course in this.state.cartCourses) {
        newCartCourses[data.course][data.section] = [];

        for (
          let i = 0;
          i <
          this.state.allCourses[courseIndex].sections[data.section].subsections
            .length;
          i++
        ) {
          newCartCourses[data.course][data.section].push(
            this.state.allCourses[courseIndex].sections[data.section]
              .subsections[i]
          );
        }
      } else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        for (
          let i = 0;
          i <
          this.state.allCourses[courseIndex].sections[data.section].subsections
            .length;
          i++
        ) {
          newCartCourses[data.course][data.section].push(
            this.state.allCourses[courseIndex].sections[data.section]
              .subsections[i]
          );
        }
      }
    } else {
      newCartCourses[data.course] = {};

      for (
        let i = 0;
        i < this.state.allCourses[courseIndex].sections.length;
        i++
      ) {
        newCartCourses[data.course][i] = [];

        for (
          let c = 0;
          c < this.state.allCourses[courseIndex].sections[i].subsections.length;
          c++
        ) {
          newCartCourses[data.course][i].push(
            this.state.allCourses[courseIndex].sections[i].subsections[c]
          );
        }
      }
    }
    this.setState({ cartCourses: newCartCourses });
  }

  removeCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses));

    if ("subsection" in data) {
      newCartCourses[data.course][data.section].forEach((_subsection) => {
        if (_subsection.number === data.subsection.number) {
          newCartCourses[data.course][data.section].splice(
            newCartCourses[data.course][data.section].indexOf(_subsection),
            1
          );
        }
      });
      if (newCartCourses[data.course][data.section].length === 0) {
        delete newCartCourses[data.course][data.section];
      }
      if (Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    } else if ("section" in data) {
      delete newCartCourses[data.course][data.section];
      if (Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    } else {
      delete newCartCourses[data.course];
    }
    this.setState({ cartCourses: newCartCourses });
  }

  getCartData() {
    let cartData = [];

    for (const courseKey of Object.keys(this.state.cartCourses)) {
      let course = this.state.allCourses.find((x) => {
        return x.number === courseKey;
      });

      cartData.push(course);
    }
    return cartData;
  }

  callbackFromCompleted = (completedCourse, rating) => {
    if (rating < 4) {
      return null;
    }
    let incompleteCourses = [];
    let keywords = [];
    this.state.allCourses.forEach((element) => {
      if (!this.state.completedCourses.includes(element.number)) {
        incompleteCourses.push(element);
      } else if (element.number === completedCourse) {
        keywords = element.keywords;
      }
    });
    incompleteCourses.forEach((element) => {
      for (const keyword of element.keywords) {
        if (keywords.includes(keyword)) {
          this.setState((prevState) => {
            return {
              recommendedCourses: [...prevState.recommendedCourses, element],
            };
          });
        }
      }
    });
  };
  renderCompletedCourses() {
    let completedCourseComponents = [];
    for (let i = 0; i < this.state.completedCourses.length; ++i) {
      completedCourseComponents.push(
        <Completed
          data={this.state.completedCourses[i]}
          callbackFromCompleted={this.callbackFromCompleted}
        />
      );
    }
    return completedCourseComponents;
  }

  render() {
    console.log(this.state.recommendedCourses);
    return (
      <>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Tab eventKey="search" title="Search" style={{ paddingTop: "5vh" }}>
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
              keywords={this.state.keywords}
            />

            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.state.filteredCourses}
                cartMode={false}
                addCartCourse={(data) => this.addCartCourse(data)}
                removeCartCourse={(data) => this.removeCartCourse(data)}
                cartCourses={this.state.cartCourses}
              />
            </div>
          </Tab>
          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.getCartData()}
                cartMode={true}
                addCartCourse={(data) => this.addCartCourse(data)}
                removeCartCourse={(data) => this.removeCartCourse(data)}
                cartCourses={this.state.cartCourses}
              />
            </div>
          </Tab>
          <Tab
            eventKey="completed"
            title="Completed Courses"
            style={{ paddingTop: "5vh" }}
          >
            <div style={{ marginLeft: "20vw" }}>
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
                  {this.renderCompletedCourses()}
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab
            eventKey="recommended"
            title="Recommended Courses"
            style={{ paddingTop: "5vh" }}
          >
            <div style={{ marginLeft: "20vw" }}></div>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
