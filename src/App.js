import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import Cart from "./Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cart: [],
    };
  }

  componentDidMount() {
    fetch("http://cs571.cs.wisc.edu:53706/api/react/classes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        })
      );
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  callbackFromCourses = (dataFromCourses) => {
    this.setState((prevState) => {
      return { cart: [...prevState.cart, dataFromCourses] };
    });
  };
  callbackFromSections = (dataFromSections) => {
    this.setState((prevState) => {
      return { cart: [...prevState.cart, dataFromSections] };
    });
    console.log(this.state.cart);
  };
  callbackFromSubsections = (dataFromSubsections) => {
    this.setState((prevState) => {
      return { cart: [...prevState.cart, dataFromSubsections] };
    });
  };
  render() {
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
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartMode={false}
              />
            </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}></div>
            <CourseArea
              data={this.state.filteredCourses}
              allData={this.state.allCourses}
              cartMode={true}
              callbackFromCourses={this.callbackFromCourses}
              callbackFromSections={this.callbackFromSections}
              callbackFromSubsections={this.callbackFromSubsections}
            />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;

//cart item state app.js
//pass into cart component cartMode true

//cart component with own state tracking section and subsection
//state variable inside a component. storing all the data related to component
//cart state where array initialized. add remove append to state
//change state rerender component
//unused
//hm
//render buttons in cartmode
