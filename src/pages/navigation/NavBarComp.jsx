import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GradeCalculator from "../GradeCalculator/GradeCalculator";
import TodoList from "../TodoList/TodoList";
import Flashcard from "../FlashCard/Flashcard";
// import App from "../../App";
import LandingPage from "../LandingPage/LandingPage";
import Pomodoro from "../Pomodoro/Pomodoro";
import IndividualFlashcard from "../FlashCard/IndividualFlashcard";

export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/grade-calculator">
                  Grade Calculator
                </Nav.Link>
                <Nav.Link as={Link} to="/todo-list">
                  ToDoList
                </Nav.Link>
                <Nav.Link as={Link} to="/pomodoro">
                  Pomodoro
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/todo-list">
                  Notes
                </Nav.Link> */}
                <Nav.Link as={Link} to="/Flashcard">
                  FlashCard
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/grade-calculator" element={<GradeCalculator />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/FlashCard" element={<Flashcard />} />
          <Route path="/flashcard/:id" element={<IndividualFlashcard />} />
        </Routes>
      </Router>
    );
  }
}
