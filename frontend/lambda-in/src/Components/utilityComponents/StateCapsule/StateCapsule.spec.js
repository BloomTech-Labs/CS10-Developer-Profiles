import React from 'react';
import renderer from 'react-test-renderer';
import StateCapsule from './StateCapsule';

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
