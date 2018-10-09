import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import ArraySection from './ArraySection';
import MapDropDown from '../MapArrays/MapDropDown';
import StateCapsule from '../StateCapsule/StateCapsule';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are testing that:
 * - It renders it nested components (DropDown, StateCapsule and MapDropSown)
 * - It renders nested declared node Elements
 * We are not testing:
 * - Nested components fucntionalities => refer to each component test
 */
describe('ArraySection component', () => {
  const userInfo = {
    projects: [
      {
        // tech: ['NODE', 'Express', 'Mongoose'],
        title: 'A nice project',
        description: 'A DRY library for express-mongoose',
        img: '/nice.img.edit',
        link: 'go.to.project.com',
        repo: 'github.my-repo',
      },
      {
        // tech: ['NODE', 'Express', 'Mongoose'],
        title: 'router Factroy',
        description: 'A DRY library for express-mongoose',
        img: '/nice.img',
        link: 'go.to.project.com',
        repo: 'github.my-repo',
      },
      {
        // tech: [],
        title: 'proj 1',
        description: 'desc 1',
        img: 'new.img',
        link: 'link',
        repo: '',
      },
      {
        // tech: [],
        title: 'today',
        description: 'today',
        img: 'today',
        link: 'today',
        repo: 'today',
      },
    ],
  };
  const schema = {
    title: 'Title',
    description: 'Description',
    img: 'Image',
    link: 'Link',
    repo: 'Repository',
    // tech: ['Stack'], // TODO
  };
  const props = {
    header: 'Project',
    userInfo,
    field: 'projects',
    itemType: 'object',
    schema,
  };

  const numberOfProjects = userInfo.projects.length;
  const numOfProperties = Object.keys(userInfo.projects[0]).length;

  const arraySection = (
    <ArraySection
      header={props.header}
      userInfo={props.userInfo}
      field={props.field}
      itemType={props.itemType}
      schema={props.schema}
    />
  );

  it('should renders correctly', () => {
    const tree = renderer.create(arraySection).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Renders inner components and Elements', () => {
    const mounted = mount(<TestWrapper>{() => arraySection}</TestWrapper>);

    it('should have a node to create new items in the array', () => {
      const createSection = mounted.find('.arraysection-create');
      expect(createSection).toHaveLength(1);
    });

    it('should renders a <MapDropDown/> component', () => {
      const dropDownComponent = mounted.find(MapDropDown);
      expect(dropDownComponent).toHaveLength(1);
    });

    it('should renders a <StateCapsule/> component', () => {
      const stateCapsuleComponent = mounted.find(StateCapsule);

      /**
       * For this specific test there must be 5-StateCasule component rendered.
       * - 1 rendered by the ArraySection.js component, its declared in its code line 32.
       * - 4 rendered by the MapDropDown.js component ( 1 for each 'userInfo.project' )
       */
      expect(stateCapsuleComponent).toHaveLength(1 + numberOfProjects);
    });

    it('should renders a <button>', () => {
      const button = mounted.find('button.arraysection-button--create');
      expect(button).toHaveLength(1);
    });

    it('should renders 5 fields to create a new item', () => {
      const createInput = mounted.find('div.arraysection-field--new');
      expect(createInput).toHaveLength(numOfProperties);
    });
  });
});
