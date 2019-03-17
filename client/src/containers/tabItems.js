import React from 'react';
import OverallSummary from '../components/overallSummary/OverallSummary'
import Education from '../components/education/Education'
import ExperienceSummary from '../components/experienceSummary/ExperienceSummary'
import Proficiency from '../components/proficiency/Proficiency'
import Achievements from '../components/achievements/Achievements'
import ProjectsSummary from '../components/projectsSummary/ProjectsSummary'

const tabItems = [
  {
    key: 'overallSummary',
    label: 'Overall Summary',
    value: <OverallSummary />
  },
  {
    key: 'education',
    label: 'Education',
    value: <Education />
  },
  {
    key: 'experienceSummary',
    label: 'Experience Summary',
    value: <ExperienceSummary />
  },
  {
    key: 'proficiency',
    label: 'Proficiency',
    value: <Proficiency />
  },
  {
    key: 'achievements',
    label: 'Achievements',
    value: <Achievements />
  },
  {
    key: 'projectsSummary',
    label: 'Projects Summary',
    value: <ProjectsSummary />
  }
];

export default tabItems;
