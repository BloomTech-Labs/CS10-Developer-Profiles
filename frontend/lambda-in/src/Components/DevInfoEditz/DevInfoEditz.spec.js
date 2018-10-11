import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DevInfoEdit from './DevInfoEditz';
import BasicInfo from './SeekerEditUtils/BasicInfo';
import SocialLinks from './SeekerEditUtils/SocialLinks';
import BioSkills from './SeekerEditUtils/BioSkills';
import Projects from './SeekerEditUtils/Projects';
import Experience from './SeekerEditUtils/Experience';
import Education from './SeekerEditUtils/Education';
import { DEV_TEST_DATA } from '../testData';

configure({ adapter: new Adapter() });

/**
 * @todo test custom event listener attached to 'document'
 */
describe('DevInfoEditz component', () => {
  /**
   * Mock getting global state's userInfo data.
   */
  const mockGetGS = jest.fn(() => DEV_TEST_DATA);

  const mockSetGS = jest.fn(() => {});

  const devInfoEditzComponent = (
    <DevInfoEdit getGS={mockGetGS} setGS={mockSetGS} />
  );

  describe('Renders correctly', () => {
    it('should renders correctly', () => {
      const tree = renderer.create(devInfoEditzComponent).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Component did mount', () => {
    const DEV_TEST_DATA_KEYS = Object.keys(DEV_TEST_DATA);
    let mounted;
    let instance;
    beforeAll(() => {
      mounted = mount(devInfoEditzComponent);
      instance = mounted.instance();
    });
    it('should initialize "state"', () => {
      const { state } = instance;

      /**
       * 'this.state' shall have all global-state properties.
       */
      const isInitializedCorrectly = DEV_TEST_DATA_KEYS.reduce(
        (control, key) => (!(key in state) ? false : control),
        true,
      );
      expect(isInitializedCorrectly).toBeTruthy();
    });
    it('should initialize "userStateCopy"', () => {
      const { userStateCopy } = instance;

      /**
       * 'this.state' shall have all global-state properties.
       */
      const isInitializedCorrectly = DEV_TEST_DATA_KEYS.reduce(
        (control, key) => (!(key in userStateCopy) ? false : control),
        true,
      );
      expect(isInitializedCorrectly).toBeTruthy();
    });
  });
});
