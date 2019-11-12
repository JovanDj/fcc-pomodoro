import React from "react";

const Controls = ({ active }) => {
  return (
    <div className="controls">
      <button id="start_stop">
        {active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}
      </button>
      <button id="reset">&#8635;</button>
    </div>
  );
};

export default Controls;
