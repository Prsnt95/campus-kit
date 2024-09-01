import React from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const time = 25;
  return (
    <div className="Pomodoro_wrapper">
      <span className="pomo-title">Pomodoro</span>
      <div className="pomo-nav">
        <span className="pomo-span">Short Break</span>{" "}
        <span className="pomo-span">Pomodoro</span>{" "}
        <span className="pomo-span">Long Break</span>
      </div>
      <div className="pomo-circle">
        <span>{time}</span>
      </div>
      <div className="ext-text">
        Start Pomodoro <hr></hr>
        Timer Settings<hr></hr>
        <div className="settings">
          <label>Long Break</label>
          <input className="pomo-settings" placeholder=""></input>
          <label>Pomodoro</label>
          <input className="pomo-settings" placeholder=""></input>
          <label>Short Break</label>
          <input className="pomo-settings" placeholder=""></input>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
