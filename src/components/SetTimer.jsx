import React from "react";
import "./SetTimer.css";

const SetTimer = ({ type, value, setTimers }) => {
  return (
    <div className="set-timer">
      <div id={`${type}-label`}>
        {type === "session" ? "Session " : "Break "}Length
      </div>
      <button
        onClick={() => setTimers(false, `${type}Value`)}
        id={`${type}-decrement`}
      >
        &darr;
      </button>
      <div id={`${type}-length`}>{value}</div>
      <button
        onClick={() => setTimers(true, `${type}Value`)}
        id={`${type}-increment`}
      >
        &uarr;
      </button>
    </div>
  );
};

export default SetTimer;
