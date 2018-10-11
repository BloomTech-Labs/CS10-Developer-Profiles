import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import Projects from './Projects';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';
import { DEV_TEST_DATA } from '../../testData';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot.
 *
 * @see ArraySection.spec.js for specific test related to its fucntionality.
 */
describe('Projects component', () => {
  const projectsComponent = <Projects userInfo={DEV_TEST_DATA} />;

  it('should renders correctly', () => {
    const tree = renderer.create(projectsComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should renders an <ArraySection/> component', () => {
    const mounted = mount(<TestWrapper>{() => projectsComponent}</TestWrapper>);
    const arraySection = mounted.find(ArraySection);
    expect(arraySection).toHaveLength(1);
  });
});
