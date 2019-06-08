import React, { Component } from "react";
import * as AppUtility from "../utilities/AppUtility";
import "./CardDetails.scss";

export default class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemValue: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedItemValue) {
      return { selectedItemValue: nextProps.selectedItemValue };
    }
    return null;
  }

  render() {
    const getDuration = selected => {
      if (selected.from) {
        const dates = AppUtility.getFromAndToDates(selected);
        selected = {
          duration: AppUtility.getNumberOfMonths(dates.from, dates.to)
        };
        if (selected.duration === 12) return "1 Year";
        return selected.duration > 12
          ? Math.floor(selected.duration / 12) +
              "." +
              (selected.duration % 12) +
              " years"
          : `${selected.duration} months`;
      }
      return selected.duration > 1
        ? `${selected.duration} years`
        : `${selected.duration} year`;
    };

    const selected = this.state.selectedItemValue;
    const dateStrings =
      selected.year ||
      (selected.from && AppUtility.getFromAndToDatesStrings(selected));

    return (
      <div className="card" className="cardShadow">
        <div className="card-header">{selected.degree || selected.company}</div>
        <div className="card-body">
          <h5 className="card-title">{dateStrings}</h5>
          <h6>Duration: {getDuration(selected)}</h6>
          {selected.score && (
            <p className="card-text">SCORE: {selected.score}%</p>
          )}
        </div>
      </div>
    );
  }
}
