import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import MapDropDownDisplay from './MapDropDownDisplay';
import { DEV_TEST_DATA } from '../../testData';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('MapDropDown component', () => {
  /**
   * @todo include 'tech' field int to the schema and projects.
   */
  const schema = {
    title: 'Title',
    description: 'Description',
    img: 'Image',
    link: 'Link',
    repo: 'Repository',
    // tech: ['Stack'], // TODO
  };
  const props = {
    array: DEV_TEST_DATA.projects,
    propsAndLabels: Object.entries(schema),
  };
  const mapDropDownDisplay = (
    <MapDropDownDisplay
      array={props.array}
      propsAndLabels={props.propsAndLabels}
    />
  );

  it('should renders correctly', () => {
    const tree = renderer.create(mapDropDownDisplay).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Renders all items and its properties', () => {
    const mounted = mount(
      <TestWrapper>{() => mapDropDownDisplay}</TestWrapper>,
    );
    const items = mounted.find('.dropdown-item');
    const allProperties = mounted.find('.mpadropdowndisplay-item--propperty');

    it('should renders all items in the array', () => {
      expect(items).toHaveLength(2);
    });

    it('should renders all properties for each item in the array', () => {
      /**
       * Sample array's length is 2.
       * Each item in the array has 5 properties.
       * Total number of rendered properties shall be 20.
       */
      expect(allProperties).toHaveLength(10);
    });
  });
});
