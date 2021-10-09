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

  callbackFromCart = (dataFromCarts) => {
    console.log(dataFromCarts);
    this.setState({ cart: dataFromCarts });
  };

  resetButton = () => {
    this.setState((prevState) => {
      return { resetButton: !prevState.resetButton };
    });
  };
  callbackFromCourses = (dataFromCourses) => {
    this.setState((prevState) => {
      let cartData = {};
      cartData.courseName = dataFromCourses.name;
      cartData.courseNumber = dataFromCourses.number;
      cartData.instructor = "All sections and subsections";
      cartData.time = {};
      return { cart: [...prevState.cart, cartData] };
    });
  };
  callbackFromSections = (dataFromSections) => {
    let cartData = {};

    cartData.instructor = dataFromSections.instructor;
    cartData.number = dataFromSections.number;
    cartData.time = dataFromSections.time;
    cartData.location = dataFromSections.location;
    cartData.courseName = " ";
    cartData.courseNumber = " ";
    this.state.allCourses.map((obj, index) => {
      Object.keys(obj.sections).forEach((element) => {
        if (
          obj.sections[element].instructor === dataFromSections.instructor &&
          obj.sections[element].location === dataFromSections.location
        ) {
          cartData.courseName = obj.name;
          cartData.courseNumber = obj.number;
        }
      });

      return null;
    });

    this.setState((prevState) => {
      return { cart: [...prevState.cart, cartData] };
    });
  };

  callbackFromSubsections = (dataFromSubsections) => {
    let cartData = {};
    cartData.number = dataFromSubsections.number;
    cartData.location = dataFromSubsections.location;
    cartData.time = dataFromSubsections.time;
    cartData.instructor = " ";
    cartData.courseName = " ";
    cartData.courseNumber = " ";
    Object.values(this.state.allCourses).forEach((element) => {
      Object.keys(element.sections).forEach((data) => {
        element.sections[data].subsections.forEach((obj) => {
          if (
            obj.location === cartData.location &&
            obj.number === cartData.number
          ) {
            cartData.instructor = element.sections[data].instructor;
            cartData.courseName = element.name;
            cartData.courseNumber = element.number;
          }
        });
      });
    });

    this.setState((prevState) => {
      return { cart: [...prevState.cart, cartData] };
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
            <div style={{ display: "flex" }}>
              <CourseArea
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartMode={true}
                callbackFromCourses={this.callbackFromCourses}
                callbackFromSections={this.callbackFromSections}
                callbackFromSubsections={this.callbackFromSubsections}
                cart={this.state.cart}
              />

              <div>
                <Cart
                  data={this.state.filteredCourses}
                  cart={this.state.cart}
                  callbackFromCart={this.callbackFromCart}
                  resetButton={this.resetButton}
                />
              </div>
            </div>
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
//hm console.log(Object.keys(obj)).find((key) => obj[key] === dataFromSections)
//render buttons in cartmode
