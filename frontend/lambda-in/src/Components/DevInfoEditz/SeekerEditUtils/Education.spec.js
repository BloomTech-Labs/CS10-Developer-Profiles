import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import Education from './Education';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot.
 *
 * @see ArraySection.spec.js for specific test related to its fucntionality.
 */
describe('Education component', () => {
  const userInfo = {
    education: [
      {
        school: 'Lambda School',
        degree: 'Software developer',
        fieldOfStudy: 'CS',
        startYear: '2018/04/01',
        endYear: '2018/10/12',
        description:
          'A CS and Software development master with a focus on web technologies.',
      },
      {
        school: 'UNED',
        degree: 'Economics',
        fieldOfStudy: 'Social sciences',
        startYear: '2012/04/01',
        endYear: '2017/10/12',
        description: 'Economics studies.',
      },
    ],
  };
  const educationComponent = <Education userInfo={userInfo} />;

  it('should renders correctly', () => {
    const tree = renderer.create(educationComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should renders an <ArraySection/> component', () => {
    const mounted = mount(
      <TestWrapper>{() => educationComponent}</TestWrapper>,
    );
    const arraySection = mounted.find(ArraySection);
    expect(arraySection).toHaveLength(1);
  });
});
