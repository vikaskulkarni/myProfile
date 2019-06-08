import React, { Component, Fragment } from "react";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import * as AppUtility from "../utilities/AppUtility";
import "./PieChart.scss";

const defaultLabelStyle = {
  fontFamily:
    '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif',
  fontSize: "4px",
  textAlign: "center",
  textTransform: "uppercase",
  textRendering: "optimizeLegibility",

  color: "#005900",
  letterSpacing: "0.05em",
  textShadow: "#FFFCA8 3px 3px 0px, #9C9C9C 5px 5px 0px"
};

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [],
      modifiedData: []
    };

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const getPieValue = val => {
      let retVal = val.score;
      if (retVal) return retVal;

      const dates = AppUtility.getFromAndToDates(val);
      return AppUtility.getNumberOfMonths(dates.from, dates.to);
    };

    if (
      nextProps.selectedItem.values &&
      nextProps.selectedItem.values.length > 0
    ) {
      let pieValues = [];
      const selectedItemValues = nextProps.selectedItem.values;
      selectedItemValues.map((selectedItem, index) => {
        pieValues.push({
          title: selectedItem.degree || selectedItem.company,
          value: getPieValue(selectedItem),
          color: nextProps.colors[index],
          selectedItem
        });
      });

      return { originalData: pieValues, modifiedData: pieValues };
    }
    return null;
  }

  onMouseOut(e, d, i) {
    this.setState({
      modifiedData: this.state.originalData
    });
  }

  onMouseOver(e, d, i) {
    const me = this;
    const modifiedData = d.map((entry, index) => {
      if (index === i) {
        me.props.onMouseOverPie(entry);
        return { ...entry, color: "#FF851B" };
      } else return entry;
    });

    this.setState({
      modifiedData
    });
  }

  customiseLabel = ({ data, dataIndex }) => {
    const details = data[dataIndex];
    if (this.props.selectedItem.label === "experience") {
      const compDuration = details.value;
      const durationValue =
        compDuration >= 12
          ? Math.floor(compDuration / 12) + "." + (compDuration % 12)
          : "0." + compDuration;
      return durationValue + "(" + details.title + ")";
    } else
      return (
        details.value +
        "% (" +
        AppUtility.getQualificationLabel(details.title) +
        ")"
      );
  };

  render() {
    return (
      <Fragment>
        <h5 className="retroShadow">
          {this.props.selectedItem.label === "experience"
            ? "Company to Duration ratio (in Years)"
            : "Qualification to Score ratio"}
        </h5>
        <ReactMinimalPieChart
          data={this.state.modifiedData}
          label={this.customiseLabel}
          labelStyle={defaultLabelStyle}
          segmentsStyle={{ transition: "stroke .3s" }}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          animate
        />
      </Fragment>
    );
  }
}
