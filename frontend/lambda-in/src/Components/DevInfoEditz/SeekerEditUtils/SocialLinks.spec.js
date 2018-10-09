import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import SocialLinks from './SocialLinks';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import StateCapsule from '../../utilityComponents/StateCapsule/StateCapsule';
import DropDown from '../../utilityComponents/DropDown/DropDown';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot.
 *
 * @see StateCapsule.spec.js for specific test related to its fucntionality.
 * @see DropDown.spec.js for specific test related to its fucntionality.
 */
describe('SocialLinks component', () => {
  const userInfo = {
    github: 'http://github.devprofiles',
    linkedin: 'http://linkedin.devprofiles',
    portfolio: 'http://portfolio.devprofiles',
  };
  const socialLinksComponent = <SocialLinks userInfo={userInfo} />;

  it('should renders correctly', () => {
    const tree = renderer.create(socialLinksComponent);
    expect(tree).toMatchSnapshot();
  });

  describe('Renders children components', () => {
    const mounted = mount(
      <TestWrapper>{() => socialLinksComponent}</TestWrapper>,
    );

    it('should renders a SteceCapsule component', () => {
      const stateCapsule = mounted.find(StateCapsule);
      expect(stateCapsule).toHaveLength(1);
    });

    it('should renders a DropDown component', () => {
      const dropDown = mounted.find(DropDown);
      expect(dropDown).toHaveLength(1);
    });
  });
});
