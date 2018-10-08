import React, { Component, Fragment } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DropDown from './DropDown';

configure({ adapter: new Adapter() });

describe('DropDown component', () => {
  const dropDown = <DropDown header="Testing DropDown component" />;

  class Wrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        header: 'Testing DropDown component',
      };
    }

    render() {
      // eslint-disable-next-line react/prop-types
      const { children } = this.props;
      return <Fragment>{children({ ...this.state })}</Fragment>;
    }
  }

  it('should renders correctly', () => {
    const tree = renderer.create(dropDown).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a `header` props', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Wrapper>{({ header }) => <DropDown header={header} />}</Wrapper>,
    );
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'p');

    expect(p.innerHTML).toMatch('Testing DropDown component');
  });
});
