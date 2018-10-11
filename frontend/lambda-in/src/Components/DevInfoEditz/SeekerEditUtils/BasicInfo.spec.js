import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import { DEV_TEST_DATA } from '../../testData';
import StateCapsule from '../../utilityComponents/StateCapsule/StateCapsule';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import BasicInfo from './BasicInfo';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot.
 *
 * @see StateCapsule.spec.js for onChange functionality tests.
 * @todo Wire InputGeolocation.js component and test is rendering.
 */
describe('BasicInfo component', () => {
  const basicInfo = <BasicInfo userInfo={DEV_TEST_DATA} />;

  it('should renders correctly', () => {
    const tree = renderer.create(basicInfo);
    expect(tree).toMatchSnapshot();
  });

  it('should renders a SteceCapsule component', () => {
    const mounted = mount(<TestWrapper>{() => basicInfo}</TestWrapper>);

    const stateCapsule = mounted.find(StateCapsule);
    expect(stateCapsule).toHaveLength(1);
  });
});
