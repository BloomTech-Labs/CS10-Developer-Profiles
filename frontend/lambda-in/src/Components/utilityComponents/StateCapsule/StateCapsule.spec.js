import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import StateCapsule from './StateCapsule';

describe('StateCapsule component', () => {
  const schema = {
    summary: 'summary',
    topSkills: 'topSkills',
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateCapsule schema={schema} object={schema}>
          {() => {}}
        </StateCapsule>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
