import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../TestWrapper/TestWrapper';
import MapChips from './MapChips';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('MapChips component', () => {
  // prettier-ignore
  const removeItem = jest.fn((field, index) => e => Object.assign({}, e, { field }, { index }));

  const props = {
    fullOneItem: {
      field: 'topSkills',
      array: ['JS'],
      classes: {
        container: 'container-class',
        item: 'item-class',
      },
      removeItem,
    },
    full: {
      field: 'topSkills',
      array: ['JS', 'React', 'TDD', 'Full stack developer'],
      classes: {
        container: 'container-class',
        item: 'item-class',
      },
      removeItem,
    },
    onlyArray: {
      array: ['JS', 'React', 'TDD', 'Full stack developer'],
      classes: {
        container: 'container-class',
        item: 'item-class',
      },
    },
  };

  const mapChips = {
    full: <MapChips {...props.full} />,
    fullOneItem: <MapChips {...props.fullOneItem} />,
    onlyArray: <MapChips {...props.onlyArray} />,
  };

  describe('Renders correctly', () => {
    it('sholud renders whit delete icon', () => {
      const tree = renderer.create(mapChips.full).toJSON();
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
      expect(items).toHaveLength(4);
    });

    it('should no render icons', () => {
      expect(icons).toHaveLength(0);
    });
  });

  describe('Renders only array items and icons', () => {
    const mounted = mount(<TestWrapper>{() => mapChips.full}</TestWrapper>);
    const items = mounted.find('span');
    const icons = mounted.find('svg');

    it('should render all items in the array', () => {
      expect(items).toHaveLength(4);
    });

    it('should render all icons if passed as props', () => {
      expect(icons).toHaveLength(4);
    });

    it('should call `removeItem` function clicking on an icon', () => {
      icons.forEach((node) => {
        node.simulate('click');
      });

      /**
       * removeItem creates a closure: So it is called 8 times.
       * - 4 times setting up the onClick event handlers.
       * - 4 times on 'clicking' each icon.
       */
      expect(removeItem.mock.calls.length).toBe(8);
    });
  });
});
