import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DropDown from './DropDown';
import TestWrapper from '../TestWrapper/TestWrapper';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('DropDown component', () => {
  const dropDown = <DropDown header="Testing DropDown component" />;

  it('should renders correctly', () => {
    const tree = renderer.create(dropDown).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a `header` props', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>{() => dropDown}</TestWrapper>,
    );
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p');

    expect(p.innerHTML).toMatch('Testing DropDown component');
  });
});
