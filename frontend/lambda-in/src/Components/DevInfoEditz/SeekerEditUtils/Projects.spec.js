import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import Projects from './Projects';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot.
 *
 * @see ArraySection.spec.js for specific test related to its fucntionality.
 */
describe('Projects component', () => {
  const userInfo = {
    projects: [
      {
        tech: ['NODE', 'Express', 'Mongoose', 'React'],
        title: 'Dev profiles',
        description: 'A meeting places for employers and talent developers',
        img: '/nice.img.edit',
        link: 'go.to.project.com',
        repo: 'github.my-repo',
      },
      {
        tech: ['JavaScript', 'Express', 'Mongoose', 'NPM'],
        title: 'Router Factroy',
        description: 'A DRY library for express-mongoose',
        img: '/nice.img',
        link: 'go.to.project.com',
        repo: 'github.my-repo',
      },
    ],
  };
  const projectsComponent = <Projects userInfo={userInfo} />;

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
