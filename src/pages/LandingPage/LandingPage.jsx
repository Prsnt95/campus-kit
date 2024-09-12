import React from "react";
import "../../styles/LandingPage.css";
import calculatorImage from "../../Resources/calculator-img.png";
import todoImg from "../../Resources/TodoImg.png";
import pomodoro from "../../Resources/pomodoro.png";
import flashcards from "../../Resources/flashcards.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="LandingPage_wrapper">
      <h1 className="landingPage--title">Campuskit</h1>
      <span class="current_text">Current Resources:</span>
      <div class="card__container">
        <article class="card__article">
          <Link to="/Flashcard">
            <img src={flashcards} alt="img" class="card__img" />

            <div class="card__data">
              <span class="card__description">
                Create and study flashcards to improve your learning and
                retention of various subjects.
              </span>
              <h2 class="card__title">Flashcards</h2>
              {/* <a href="#" class="card__button">Read More</a> */}
            </div>
          </Link>
        </article>

        <article class="card__article">
          <Link to="/grade-calculator">
            <img
              src={calculatorImage}
              alt="Grade Calculator"
              className="card__img"
            />

            <div class="card__data">
              <span class="card__description">A simple grade calculator</span>
              <h2 class="card__title">Grade Calculator</h2>
              {/* <a href="#" class="card__button">Read More</a> */}
            </div>
          </Link>
        </article>

        <article class="card__article">
          <Link to="/todo-list">
            <img src={todoImg} alt="img" class="card__img" />

            <div class="card__data">
              <span class="card__description">
                A to-do list to help you organize your tasks efficiently and
                stay productive throughout the day
              </span>
              <h2 class="card__title">To-Do List</h2>
              {/* <a href="#" class="card__button">Read More</a> */}
            </div>
          </Link>
        </article>

        <article class="card__article">
          <Link to="/pomodoro">
            <img src={pomodoro} alt="img" class="card__img" />

            <div class="card__data">
              <span class="card__description">
                Pomodoro Technique to enhance focus and productivity by breaking
                work into intervals.
              </span>
              <h2 class="card__title">Pomodoro </h2>
              {/* <a href="#" class="card__button">Read More</a> */}
            </div>
          </Link>
        </article>
      </div>
    </div>
  );
};

export default LandingPage;
