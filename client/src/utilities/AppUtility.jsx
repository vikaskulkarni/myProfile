import Cookies from "universal-cookie";

const cookies = new Cookies();

const monthNumber = {
  january: 1,
  febraury: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
};

const labelCategory = {
  Frontend: "REACT, AngularJS, Bootstrap, Material",
  Platforms: "Spring Core, Boot, Jersey, REST, NodeJS",
  Backend: "JAVA, Microservices",
  Database: "Couchbase, Mongo, Cassandra, Postgres",
  Cloud: "AWS, Jenkins/Bamboo, Spinnaker, Ansible, Docker",
  Testing: "TDD, BDD, Junit, Jasmine",
  EnterpriseLogging: "Splunk, ELK"
};

const qualificationLabel = {
  "SSLC, KSSE, Bangalore": "10th",
  "PUC-II, PU Board, Bangalore": "12th",
  "B.E (Computer Science), VTU, Belgaum": "B.E CSc",
  "MS (SS), BITS PILANI": "M.S SS"
};

export const getMonthNumber = month => monthNumber[month.toLowerCase()];

export const setCookie = (name, value) => cookies.set(name, value);

export const getCookie = name => cookies.get(name);

export const getNumberOfMonths = (dateFrom, dateTo) => {
  let months;
  months = (dateTo.year - dateFrom.year) * 12;
  months -= dateFrom.month + 1;
  months += dateTo.month;
  return months <= 0 ? 0 : months;
};

export const getNumberOfYears = months => `${months / 12}.${months % 12}`;

export const getFromAndToDates = val => {
  let fromDate = {
    month: getMonthNumber(val.from.month),
    year: val.from.year
  };

  let toDate = val.to;
  if (toDate === "CURRENT") {
    const today = new Date();
    toDate = {
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };
  } else {
    toDate = {
      month: getMonthNumber(val.to.month),
      year: val.to.year
    };
  }

  return { from: fromDate, to: toDate };
};

export const getFromAndToDatesStrings = selected => {
  const fromDateStr = selected.from.month + " " + selected.from.year;
  const toDateStr =
    selected.to === "CURRENT"
      ? "CURRENT"
      : selected.to.month + " " + selected.to.year;

  return fromDateStr + " - " + toDateStr;
};

export const getCategoryLabel = category => labelCategory[category];

export const getQualificationLabel = qualification =>
  qualificationLabel[qualification];
