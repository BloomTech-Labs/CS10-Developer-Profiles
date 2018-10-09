import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import ArraySectionDisplay from './ArraySectionDisplay';
import DropDown from '../DropDown/DropDown';
import MapDropDownDisplay from '../MapArrays/MapDropDownDisplay';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('ArraySectionDisplay component', () => {
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
    header: 'Projects',
    userInfo,
    field: 'projects',
    schema,
  };
  const arraySectionDisplay = (
    <ArraySectionDisplay
      header={props.header}
      userInfo={props.userInfo}
      field={props.field}
      schema={props.schema}
    />
  );

  const numberOfProjects = userInfo.projects.length;

  it('should renders correctly', () => {
    const tree = renderer.create(arraySectionDisplay).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Renders nested components', () => {
    const mounted = mount(
      <TestWrapper>{() => arraySectionDisplay}</TestWrapper>,
    );

    /**
     * For this specific test, there shall be 5 DropDown components rendered.
     * - 1 redered by ArraySectionDisplay.js (see line 22 on its file)
     * - 4 redered by MapDropDownDisplay.js (one for each project in 'userInfo.projects)
     */
    it('should renders <DropDown/> components', () => {
      const dropDownComponents = mounted.find(DropDown);
      expect(dropDownComponents).toHaveLength(1 + numberOfProjects);
    });

    it('should renders a <MapDropDownDisplay/> component', () => {
      const mapDropDownDisplayComponent = mounted.find(MapDropDownDisplay);
      expect(mapDropDownDisplayComponent).toHaveLength(1);
    });
  });
});
