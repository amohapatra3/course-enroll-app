import React from "react";

class Cart extends React.Component {
  removeFromCart(item) {
    this.props.resetButton();
    this.props.callbackFromCart(
      this.props.cart.filter(
        (element) => element.courseNumber !== item.courseNumber
      )
    );
  }
  render() {
    return (
      <div>
        <h1> Cart </h1>
        {this.props.cart.map((item, i) => {
          return (
            <>
              <p key={item.courseNumber}>
                {item.courseNumber} {item.courseName}
              </p>
              <p key={item.instructor}>{item.instructor}</p>
              <p key={item.location}>{item.location}</p>
              <p key={item.number}>{item.number}</p>

              {Object.keys(item.time).map((day, j) => {
                return (
                  <ul>
                    <li key={day}>
                      {" "}
                      {day} {item.time[day]}
                    </li>
                  </ul>
                );
              })}
              <button onClick={() => this.removeFromCart(item)}>
                {" "}
                Remove from cart
              </button>
            </>
          );
        })}
      </div>
    );
  }
}

export default Cart;
