import React, { Fragment } from "react";
import ReactApexChart from "react-apexcharts";
import config from "./ChartConfiguration";

export default class Proficiency extends React.Component {
  constructor(props) {
    super(props);
    let skillCategories = [];
    let skills = [];
    skillCategories.push("");
    skills.push("");
    const propsValues = props.values;

    Object.keys(propsValues).map((key, value) => {
      if (key !== "label" && key !== "default") {
        skillCategories.push(key.toUpperCase());
        skills.push(propsValues[key].toString());
      }
    });
    this.state = config(skillCategories, skills);
  }

  render() {
    return (
      <Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="350"
        />
        <h5 className="retroShadow">Ratings</h5>
      </Fragment>
    );
  }
}
