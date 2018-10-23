import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import { DEV_TEST_DATA } from '../testData';
import DevInfoEdit from './DevInfoEditz';
import BasicInfo from './SeekerEditUtils/BasicInfo';
import BioSkills from './SeekerEditUtils/BioSkills';
import Education from './SeekerEditUtils/Education';
import Experience from './SeekerEditUtils/Experience';
import Projects from './SeekerEditUtils/Projects';
import SocialLinks from './SeekerEditUtils/SocialLinks';

configure({ adapter: new Adapter() });

/**
 * @todo test custom event listener attached to 'document'
 */
describe('DevInfoEditz component', () => {
  /**
   * Mock getting global state's userInfo data.
   */
  const mockGetGS = jest.fn(() => Object.assign({}, DEV_TEST_DATA));

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

  describe('Renders all children', () => {
    let mounted;
    beforeAll(() => {
      mounted = mount(devInfoEditzComponent);
    });

    it('shall renders <BasicInfo/> component', () => {
      const children = mounted.find(BasicInfo);
      expect(children).toHaveLength(1);
    });

    it('shall renders <SocialLinks/> component', () => {
      const children = mounted.find(SocialLinks);
      expect(children).toHaveLength(1);
    });

    it('shall renders <BioSkills/> component', () => {
      const children = mounted.find(BioSkills);
      expect(children).toHaveLength(1);
    });

    it('shall renders <Projects/> component', () => {
      const children = mounted.find(Projects);
      expect(children).toHaveLength(1);
    });

    it('shall renders <Experience/> component', () => {
      const children = mounted.find(Experience);
      expect(children).toHaveLength(1);
    });

    it('shall renders <Education/> component', () => {
      const children = mounted.find(Education);
      expect(children).toHaveLength(1);
    });

    it('shall renders <Button/> to confirm changes', () => {
      const children = mounted.find('.confirm-changes button'); // assumption based on snapshot
      expect(children).toHaveLength(1);
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

  describe('Event listeners: onBlur', () => {
    let mounted;

    beforeAll(() => {
      mounted = mount(devInfoEditzComponent);
    });

    it('should listen to onBlur events for "edit" fields', () => {
      const children = mounted.find(BasicInfo);
      const mockEvent = {
        target: {
          id: 'edit-firstName',
          value: 'onBlur listened!',
          dataset: {},
        },
      };

      const { userStateCopy } = mounted.instance();
      /**
       * Emit onBlurt event
       */
      children.simulate('blur', mockEvent);

      expect(userStateCopy.firstName).toMatch('onBlur listened!');
    });

    it('should listen to onBlur events for "new" fields and ignore them', async () => {
      const children = mounted.find(Projects);
      const mockEvent = {
        target: {
          id: 'new-title',
          dataset: {
            field: 'projects',
            itemtype: 'object',
            property: 'title',
            value: 'this shall be ignored',
          },
        },
      };

      const { onBlurState } = mounted.instance();
      /**
       * Emit onBlurt event
       */
      await children.simulate('blur', mockEvent);

      expect(onBlurState).toMatch('ignored');
    });
  });

  /**
   * @todo test custom event listener for 'onDeleteItem'
   */
  describe('Method: handleOnDeleteItem', () => {
    it('should remove the data in form`s state', () => {
      const mounted = mount(devInfoEditzComponent);

      /**
       * Local state is initialized getting data from the app.js component in 'componentDidMount'.
       * Because app.js is not mounted in this test, we initialize local state data manually
       */
      // Set state with DEV_TEST_DATA
      mounted.setState(mockGetGS());
      // Set `userStateCopy` property
      mounted.setProps({ userStateCopy: mockGetGS() });

      const mockEvent = {
        bubbles: true,
        detail: {
          field: 'projects',
          index: 0,
        },
      };

      const projectsArray = mounted.prop('userStateCopy').projects;

      expect(projectsArray).toHaveLength(2);

      mounted.instance().handleOnDeleteItem(mockEvent);

      expect(projectsArray).toHaveLength(1);
    });
  });

  /**
   * @todo test custom even listener 'onCreateItem'
   */
  describe('Method: handleCreateItem', () => {
    it('should create new entries in fields which data is an array of objects', () => {
      const mountedComponent = mount(devInfoEditzComponent);

      /**
       * Local state is initialized getting data from the app.js component in 'componentDidMount'.
       * Because app.js is not mounted in this test, we initialize local state data manually
       */
      // Set state with DEV_TEST_DATA
      mountedComponent.setState(mockGetGS());
      // Set `userStateCopy` property
      mountedComponent.setProps({ userStateCopy: mockGetGS() });

      const mockEvent = {
        bubbles: true,
        detail: {
          field: 'experience',
          newData: {
            title: 'new',
            company: 'new',
            location: {
              lat: -0.666,
              lng: -66.666,
              place: 'Madrid',
            },
            headline: 'new',
            description: 'new',
            startYear: '2018-09-27T19:10:21.809Z',
            endYear: '2018-09-27T19:10:21.809Z',
          },
        },
      };

      const experienceArray = mountedComponent.prop('userStateCopy').experience;

      expect(experienceArray).toHaveLength(2);

      mountedComponent.instance().handleCreateItem(mockEvent);

      expect(experienceArray).toHaveLength(3);
    });
  });
});
