import React, { Component } from "react";
import "react-sortable-tree/style.css";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";
import "./ProjectHighlights.scss";

export default class ProjectHighlights extends Component {
  processedTreeData = allProjects => {
    const getLine = (descArr, startIdx, endIdx) => {
      let line = "";
      descArr.forEach((word, idx) => {
        if (idx >= startIdx && idx <= endIdx) {
          line += word + " ";
        }
      });
      return line;
    };
    let retData = [];
    let projectsDetails = {};

    allProjects.map(project => {
      let children = [];
      let projectChild = [];
      const descArr = project.description.split(" ");
      children.push({
        subtitle: (
          <div>
            {getLine(descArr, 0, 10)}
            <br />
            {getLine(descArr, 11, 20)}
            <br />
            {getLine(descArr, 21, 30)}
            <br />
            <div>&nbsp;</div>
          </div>
        )
      });
      children.push({ title: project.domain, subtitle: "Domain" });
      children.push({ title: project.role, subtitle: "Role" });
      const duration =
        project.duration.to === "CURRENT"
          ? `${project.duration.from.month} ${
              project.duration.from.year
            } - CURRENT`
          : `${project.duration.from.month} ${project.duration.from.year} - ${
              project.duration.to.month
            } ${project.duration.to.year}`;
      children.push({
        subtitle: "Duration",
        title: duration
      });

      let involvement = [];
      project.involvement.map(inv =>
        involvement.push({
          subtitle: inv
        })
      );

      let techStr = "";
      project.technology.map(tech => (techStr += tech + "  "));

      children.push({
        subtitle: "Technology",
        title: techStr
      });

      children.push({
        title: "Responsibilities",
        children: involvement
      });

      projectChild.push({
        title: `${project.title} [${project.projectDuration}]`,
        children,
        style: { backgroundColor: "red" }
      });

      const projectHeading = `${project.company} [${project.companyDuration}]`;

      let companyProjects = projectsDetails[projectHeading];
      if (companyProjects) {
        companyProjects.push(projectChild[0]);
        projectsDetails[projectHeading] = companyProjects;
      } else {
        projectsDetails[projectHeading] = projectChild;
      }
    });

    Object.keys(projectsDetails).map(projectHeading => {
      retData.push({
        title: projectHeading,
        subtitle: "Company/Client",
        children: projectsDetails[projectHeading],
        expanded: true
      });
    });

    return { treeData: retData };
  };

  constructor(props) {
    super(props);

    this.state = this.processedTreeData(props.values.values);
  }

  render() {
    return (
      <div
        id="projectDetails"
        style={{ height: "100%", boxShadow: "0px 15px 10px -15px #111" }}
      >
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
