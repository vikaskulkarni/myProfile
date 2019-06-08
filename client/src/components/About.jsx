import React from "react";
import "./About.scss";

const About = props => (
  <div className="aboutThis">
    <p id="start">About this site in a glimpse&hellip;</p>

    <h1>
      VIKAS KULKARNI's profile site<sub>details and credits in CSS3</sub>
    </h1>

    <div id="titles">
      <div id="titlecontent">
        <p className="center">
          EPISODE I
          <br />A NEW LOOK FOR MY PROFILE
        </p>

        <p>
          It is a period of Javascript wars. And everybody wants to be a full
          stack developer
        </p>

        <p>
          This is a demonstration and boasting of my frontend and backend
          skills. Wait... there are third party libraries that I have leveraged
          to achieve this result
        </p>

        <p className="center">
          <u>FRONT-END</u>
          <br />
          ReactJS
        </p>

        <p className="center">
          <u>BACK-END</u>
          <br />
          AWS Lambdas
        </p>

        <p className="center">
          <u>MIDDLE TIER</u>
          <br />
          NodeJS
        </p>

        <p className="center">
          <u>DATABASE</u>
          <br />
          DYNAMODB
        </p>

        <p className="center">
          <u>REACT Libraries CREDITS...</u>
        </p>
        <p className="center">
          "Proficiency" horizontal bar graph&nbsp;
          <a
            href="https://github.com/apexcharts/react-apexcharts"
            target="_blank"
          >
            React Apexcharts
          </a>
          <br />
          "Experience and Qualifications" Pie chart&nbsp;
          <a
            href="https://github.com/toomuchdesign/react-minimal-pie-chart"
            target="_blank"
          >
            React minimal pie chart
          </a>
          <br />
          "Project" Details&nbsp;
          <a
            href="https://www.npmjs.com/package/react-sortable-tree"
            target="_blank"
          >
            React sortable tree
          </a>
        </p>

        <p className="center">
          Last but not the least, the link to this Star War's CSS scrolling
          article is at:
          <a href="http://www.sitepoint.com/css3-starwars-scrolling-text/">
            sitepoint.com/
            <br />
            css3-starwars-scrolling-text/
          </a>
          <br />
          Finally, the github source for this project is at:
          <br />
          <a href="https://github.com/vikaskulkarni/myProfile">
            vikaskulkarni/myProfile
          </a>
        </p>
      </div>
    </div>
  </div>
);
export default About;
