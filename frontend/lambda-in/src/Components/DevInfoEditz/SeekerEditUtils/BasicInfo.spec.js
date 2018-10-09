import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
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
  const userInfo = {
    firstName: 'Happy',
    lastName: 'User',
    desiredTitle: 'Software developer',
    currentLocation: 'Madrid',
  };
  const basicInfo = <BasicInfo userInfo={userInfo} />;

  it('should renders correctly', () => {
    const tree = renderer.create(basicInfo);
    expect(tree).toMatchSnapshot();
  });
});
