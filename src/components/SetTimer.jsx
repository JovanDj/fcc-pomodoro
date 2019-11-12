import React from "react";
import "./SetTimer.css";

const SetTimer = ({ type, label, value, handleClick }) => {
  return (
    <div className="set-timer">
      <div id={`${type}-label`}>{label}</div>

      <button
        onClick={() => handleClick(false, `${type}Value`)}
        id={`${type}-decrement`}
      >
        &darr;
      </button>

      <div id={`${type}-length`}>{value}</div>

      <button
        onClick={() => handleClick(true, `${type}Value`)}
        id={`${type}-increment`}
      >
        &uarr;
      </button>
    </div>
  );
};

export default SetTimer;
