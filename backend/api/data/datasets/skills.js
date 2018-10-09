const { shuffle } = require('faker').helpers;
const { getRandomInt } = require('../utils/getRandomInt');

const tech = [
  'JavaScript',
  'C Programming',
  'C++',
  'C#',
  'Java',
  'Kotlin',
  'Python',
  'SQL',
  'Swift',
  'Objective-C',
  'Node JS',
  'Express JS',
  'React',
  'Redux',
  'Bootstrap',
  'jQuery',
  'HTML',
  'CSS',
  'MongoDB',
  'PostgreSQL',
  'Django',
  'LESS',
  'RESTful Architecture',
  'Responsive Design',
  'Single Page Application',
  'TypeScript',
  'AngularJS',
  'Vue.js',
  'Go',
  'Ruby',
  'Ruby on Rails',
  'MySQL',
  'Ember.js',
  'Flask',
  'Rust',
  'NumPy',
  'SciPy',
  'Scikit-learn',
  'pandas',
  'TensorFlow',
];

const skills = {
  FSW: [
    'JavaScript',
    'C Programming',
    'C++',
    'C#',
    'Java',
    'Python',
    'SQL',
    'Node JS',
    'Express JS',
    'React',
    'Redux',
    'Bootstrap',
    'jQuery',
    'HTML',
    'CSS',
    'Git',
    'MongoDB',
    'PostgreSQL',
    'Django',
    'Agile Project Management',
    'Algorithms',
    'Automated Unit Testing',
    'Integration Testing',
    'Big-O Notation',
    'Computer Architecture',
    'Data Structures',
    'LESS',
    'Project Management',
    'RESTful Architecture',
    'Relational Databases',
    'Responsive Design',
    'Single Page Applications',
    'Teamwork & Collaboration',
    'Time Management Techniques',
    'TypeScript',
    'AngularJS',
    'Vue.js',
    'Go',
    'Ruby',
    'Ruby on Rails',
    'MySQL',
    'Ember.js',
    'Flask',
    'Rust',
  ],
  IOS: [
    'Swift',
    'Objective-C',
    'C Programming',
    'Python',
    'Django',
    'Xcode',
    'Git',
    'UIKit',
    'Core Data',
    'Unit Testing',
    'XCTesting',
    'AppKit',
    'Agile Project Management',
    'Algorithms',
    'Big-O Notation',
    'Computer Architecture',
    'Data Structures',
    'Project Management',
    'Teamwork & Collaboration',
    'Time Management Techniques',
  ],
  AND: [
    'Java',
    'Kotlin',
    'C Programming',
    'Python',
    'Django',
    'Android Studio',
    'Git',
    'Unit Testing',
    'Agile Project Management',
    'Algorithms',
    'Big-O Notation',
    'Computer Architecture',
    'Data Structures',
    'Project Management',
    'Teamwork & Collaboration',
    'Time Management Techniques',
  ],
  DS: [
    'Python',
    'C Programming',
    'NumPy',
    'SciPy',
    'Scikit-learn',
    'pandas',
    'TensorFlow',
    'Agile Project Management',
    'Algorithms',
    'Big-O Notation',
    'Data Structures',
    'Project Management',
    'Relational Databases',
    'Teamwork & Collaboration',
    'Time Management Techniques',
    'Statistics',
    'Linear Algebra',
    'Data Modeling',
    'R',
    'Data Mining',
    'Data Visualization',
    'Big Data',
  ],
  UX: [
    'HTML',
    'CSS',
    'Sketch',
    'InVision',
    'Adobe XD',
    'JavaScript',
    'React',
    'Redux',
    'Swift',
    'UIKit',
    'Core Data',
    'Agile Project Management',
    'LESS',
    'Project Management',
    'Responsive Design',
    'Single Page Applications',
    'Teamwork & Collaboration',
    'Time Management Techniques',
    'User Experience Design',
    'User Interaction Design',
    'Product Design',
    'Web Design',
  ],
};

const numSkills = {
  FSW: {
    TS: {
      min: 5,
      max: 8,
    },
    AS: {
      min: 5,
      max: 8,
    },
    FW: {
      min: 8,
      max: 12,
    },
  },
  IOS: {
    TS: {
      min: 3,
      max: 5,
    },
    AS: {
      min: 3,
      max: 5,
    },
    FW: {
      min: 3,
      max: 5,
    },
  },
  AND: {
    TS: {
      min: 3,
      max: 5,
    },
    AS: {
      min: 3,
      max: 5,
    },
    FW: {
      min: 3,
      max: 5,
    },
  },
  DS: {
    TS: {
      min: 4,
      max: 6,
    },
    AS: {
      min: 4,
      max: 6,
    },
    FW: {
      min: 4,
      max: 6,
    },
  },
  UX: {
    TS: {
      min: 4,
      max: 6,
    },
    AS: {
      min: 4,
      max: 6,
    },
    FW: {
      min: 4,
      max: 6,
    },
  },
};

const getSkills = (track) => {
  const skillsByTrack = shuffle(skills[track].slice(0));
  const TS = Array(getRandomInt(numSkills[track].TS.min, numSkills[track].TS.max)).fill(0);
  const AS = Array(getRandomInt(numSkills[track].AS.min, numSkills[track].AS.max)).fill(0);
  const FW = Array(getRandomInt(numSkills[track].FW.min, numSkills[track].FW.max)).fill(0);

  return {
    topSkills: TS.map(() => skillsByTrack.pop()),
    additionalSkills: AS.map(() => skillsByTrack.pop()),
    familiarWith: FW.map(() => skillsByTrack.pop()),
  };
};

const getTechStack = (min, max, blank) => {
  const rand = Math.random();
  const numTech = blank && (rand >= 0 && rand < blank / 100) ? 0 : getRandomInt(min, max);
  const allTech = shuffle(tech.slice(0));
  const techStack = [];

  for (let i = 0; i < numTech; i += 1) {
    techStack.push(allTech.pop());
  }

  return techStack;
};

module.exports = {
  getSkills,
  getTechStack,
};
