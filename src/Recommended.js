import React from "react";
import { Accordion } from "react-bootstrap";

class Recommended extends React.Component {
  render() {
    return (
      <>
        <Accordion>
          <Accordion.Item eventKey={this.props.data.number}>
            <Accordion.Header>
              {this.props.data.number}: {this.props.data.name}
            </Accordion.Header>
            <Accordion.Body>
              Credits: {this.props.data.credits} <br /> <br />
              Description: {this.props.data.description} <br /> <br />
              Recommended based on courses you took previously and rated 5/5.
              <br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }
}

export default Recommended;
