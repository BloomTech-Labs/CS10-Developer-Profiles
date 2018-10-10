import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import MapDropDown from './MapDropDown';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('MapDropDown component', () => {
  /**
   * @todo include 'tech' field int to the schema and projects.
   */
  const projects = [
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
  ];
  const schema = {
    title: 'Title',
    description: 'Description',
    img: 'Image',
    link: 'Link',
    repo: 'Repository',
    // tech: ['Stack'], // TODO
  };
  const props = {
    array: projects,
    schema,
    field: 'projects',
    itemType: 'object',
    propsAndLabels: Object.entries(schema),
  };
  const mapDropDown = (
    <MapDropDown
      array={props.array}
      field={props.field}
      itemType={props.itemType}
      schema={props.schema}
      propsAndLabels={props.propsAndLabels}
    />
  );

  it('should renders correctly', () => {
    const tree = renderer.create(mapDropDown).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Renders all items and its properties', () => {
    const mounted = mount(<TestWrapper>{() => mapDropDown}</TestWrapper>);
    const items = mounted.find('.dropdown-item-list');
    const allButtons = mounted.find('button');
    const allProperties = mounted.find('.inputFieldLargeMultiline');

    it('should renders all items in the array', () => {
      expect(items).toHaveLength(4);
    });

    it('should renders a button for each item in the array', () => {
      expect(allButtons).toHaveLength(4);
    });

    it('should renders all properties for each item in the array', () => {
      /**
       * Sample array's length is 4.
       * Each item in the array has 5 properties.
       * Total number of rendered properties shall be 20.
       */
      expect(allProperties).toHaveLength(20);
    });
  });
});
