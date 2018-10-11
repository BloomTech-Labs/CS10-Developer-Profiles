import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import BioSkills from './BioSkills';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import StateCapsule from '../../utilityComponents/StateCapsule/StateCapsule';
import DropDown from '../../utilityComponents/DropDown/DropDown';
import MapChips from '../../utilityComponents/MapArrays/MapChips';
import { DEV_TEST_DATA } from '../../testData';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot and some specific test.
 *
 * @see StateCapsule.spec.js for specific test related to its fucntionality.
 * @see DropDown.spec.js for specific test related to its fucntionality.
 * @see MapChips.spec.js for specific test related to its fucntionality.
 */
describe('BioSkills component', () => {
  const bioSkills = <BioSkills userInfo={DEV_TEST_DATA} />;

  it('should renders correctly', () => {
    const tree = renderer.create(bioSkills);
    expect(tree).toMatchSnapshot();
  });

  describe('Renders children components', () => {
    const mounted = mount(<TestWrapper>{() => bioSkills}</TestWrapper>);

    it('should renders a SteceCapsule component', () => {
      const stateCapsule = mounted.find(StateCapsule);
      expect(stateCapsule).toHaveLength(1);
    });

    it('should renders a DropDown component', () => {
      const dropDown = mounted.find(DropDown);
      expect(dropDown).toHaveLength(1);
    });

    it('should renders a MapChips component', () => {
      const mapChips = mounted.find(MapChips);
      expect(mapChips).toHaveLength(1);
    });
  });
});
