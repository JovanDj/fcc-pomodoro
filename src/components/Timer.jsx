import React from "react";

const Timer = ({ mode, time }) => {
  return (
    <div className="timer text-center">
      <h1 id="timer-label">{mode === "session" ? "Session" : "Break"}</h1>
      <h1 className="py-2" id="time-left">
        {time}
      </h1>
    </div>
  );
};

export default Timer;
