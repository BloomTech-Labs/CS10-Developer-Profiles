import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import MapChips from './MapChips';
import { DEV_TEST_DATA } from '../../testData';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('MapChips component', () => {
  // prettier-ignore
  const removeItem = jest.fn((field, index) => e => Object.assign({}, e, { field }, { index }));

  const props = {
    itemsWithIcons: {
      field: 'topSkills',
      array: DEV_TEST_DATA.topSkills,
      classes: {
        container: 'container-class',
        item: 'item-class',
      },
      removeItem,
    },
    onlyArray: {
      array: DEV_TEST_DATA.topSkills,
      classes: {
        container: 'container-class',
        item: 'item-class',
      },
    },
  };

  const mapChips = {
    itemsWithIcons: <MapChips {...props.itemsWithIcons} />,
    onlyArray: <MapChips {...props.onlyArray} />,
  };

  describe('Renders correctly', () => {
    it('sholud renders whit delete icon', () => {
      const tree = renderer.create(mapChips.itemsWithIcons).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('sholud renders whitout delete icon', () => {
      const tree = renderer.create(mapChips.onlyArray).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Renders only array items and no icons', () => {
    const mounted = mount(
      <TestWrapper>{() => mapChips.onlyArray}</TestWrapper>,
    );
    const items = mounted.find('span');
    const icons = mounted.find('svg');

    it('should render all items in the array', () => {
      expect(items).toHaveLength(6);
    });

    it('should no render icons', () => {
      expect(icons).toHaveLength(0);
    });
  });

  describe('Renders only array items and icons', () => {
    const mounted = mount(
      <TestWrapper>{() => mapChips.itemsWithIcons}</TestWrapper>,
    );
    const items = mounted.find('span');
    const icons = mounted.find('svg');

    it('should render all items in the array', () => {
      expect(items).toHaveLength(6);
    });

    it('should render all icons if passed as props', () => {
      expect(icons).toHaveLength(6);
    });

    it('should call `removeItem` function clicking on an icon', () => {
      icons.forEach((node) => {
        node.simulate('click');
      });

      /**
       * removeItem creates a closure and retunr an event handler: So it is called 12 times.
       * - 6 times setting up the onClick event handlers for each item in the array.
       * - 6 times on 'clicking' each array-item delete icon.
       */
      expect(removeItem.mock.calls.length).toBe(12);
    });
  });
});
