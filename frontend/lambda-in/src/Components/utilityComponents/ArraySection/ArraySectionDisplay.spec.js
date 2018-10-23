import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import ArraySectionDisplay from './ArraySectionDisplay';
import DropDown from '../DropDown/DropDown';
import MapDropDownDisplay from '../MapArrays/MapDropDownDisplay';
import { DEV_TEST_DATA } from '../../testData';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('ArraySectionDisplay component', () => {
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
    userInfo: DEV_TEST_DATA,
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
     * - 2 redered by MapDropDownDisplay.js (one for each project in 'DEV_TEST_DATA.projects)
     */
    it('should renders <DropDown/> components', () => {
      const dropDownComponents = mounted.find(DropDown);
      expect(dropDownComponents).toHaveLength(1 + 2);
    });

    it('should renders a <MapDropDownDisplay/> component', () => {
      const mapDropDownDisplayComponent = mounted.find(MapDropDownDisplay);
      expect(mapDropDownDisplayComponent).toHaveLength(1);
    });
  });
});
