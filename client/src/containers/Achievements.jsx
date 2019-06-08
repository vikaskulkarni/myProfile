import React from "react";
import "./Achievements.scss";

const Achievements = props => (
  <main className="achievements-cls">
    {props.values.list.map((achievement, idx) => (
      <p key={`a${idx}`}>{achievement}</p>
    ))}
  </main>
);
export default Achievements;
