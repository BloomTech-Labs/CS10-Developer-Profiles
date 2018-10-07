import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import StateCapsule from './StateCapsule';

configure({ adapter: new Adapter() });

describe('StateCapsule component', () => {
  /**
   * Shortans for StateCapsule: 'sc' || 'SC'
   */
  const schema = {
    summary: 'Summary',
    topSkills: ['Top Skills'],
  };

  const data = {
    summary: 'Some summary here',
    topSkills: ['JS', 'React', 'TDD', 'Full stack developer'],
  };

  const stateCapsules = {
    basic: (
      <StateCapsule schema={schema} object={data}>
        {() => {}}
      </StateCapsule>
    ),
    withChildren: (
      <StateCapsule schema={schema} object={data}>
        {({ stateCapsule, removeItem }) => (
          <div>
            <input id="edit-summary" type="text" value={stateCapsule.summary} />
            <input
              id="edit-topSkills_edit"
              type="text"
              value={stateCapsule.summary}
            />
            <ul>
              {stateCapsule.topSkills.map((skill, index) => (
                <div key={`${Math.random()}-${Date.now()}`}>
                  <li>
                    {skill}
                    <button
                      type="button"
                      onClick={removeItem('topSkills', index)}
                    >
                      X
                    </button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </StateCapsule>
    ),
  };

  it('should renders correctly', () => {
    const tree = renderer.create(stateCapsules.basic).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should initialize state with schema`s properties', () => {
    const shallowSC = shallow(stateCapsules.basic);

    const scState = shallowSC.state();

    expect(scState).toHaveProperty('summary', 'Some summary here');
    expect(scState).toHaveProperty('topSkills_edit');
    expect(scState).toHaveProperty('topSkills', [
      'JS',
      'React',
      'TDD',
      'Full stack developer',
    ]);
  });

  it('should renders children correctly', () => {
    const tree = renderer.create(stateCapsules.withChildren).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should update state onChange', () => {
    const shallowSC = shallow(stateCapsules.withChildren);

    // Before any 'onChange' event
    expect(shallowSC.state().topSkills_edit).toMatch('');

    shallowSC.find('.state-capsule').simulate('change', {
      target: {
        id: 'edit-topSkills_edit',
        value: 'JavaScrip',
      },
      stopPropagation: () => {},
    });

    // After an 'onChange' event
    expect(shallowSC.state().topSkills_edit).toMatch('JavaScrip');
  });

  it('should update state`s array-like property onClick', () => {
    const shallowSC = shallow(stateCapsules.withChildren);
    const originalArray = ['JS', 'React', 'TDD', 'Full stack developer'];
    const modifiedArray = ['JS', 'React', 'TDD'];

    // Before any 'onChange' event
    expect(shallowSC.state().topSkills).toEqual(
      expect.arrayContaining(originalArray),
    );

    shallowSC.find('.state-capsule').simulate('click', {
      target: {
        field: 'topSkills',
        index: 3,
      },
      stopPropagation: () => {},
    });

    // After an 'onChange' event
    expect(shallowSC.state().topSkills).toEqual(
      expect.arrayContaining(modifiedArray),
    );
  });
});
