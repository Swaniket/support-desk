import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <Container>
      <section>
        <h1 className="heading">Welcome, Swaniket</h1>
        <p className="heading-sub custom-text-secondary">
          Choose an option below
        </p>
      </section>

      <Container>
        <Col>
          <Row>
            <Link to="/new-ticket" className="btn btn-dark btn-lg" style={{marginBottom: "20px"}}>
              <FaQuestionCircle /> Create new ticket
            </Link>
          </Row>
          <Row>
            <Link to="/tickets" className="btn btn-light btn-lg">
              <FaTicketAlt /> View my tickets
            </Link>
          </Row>
        </Col>
        </Container>
      
    </Container>
  );
}

export default Home;
