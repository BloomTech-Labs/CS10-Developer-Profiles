import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import StateCapsule from './StateCapsule';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 */
describe('StateCapsule component', () => {
  const schema = {
    forRemoveButton: {
      summary: 'Summary',
      topSkills: ['Top Skills'],
    },
    forCreateButton: {
      title: 'Title',
      description: 'Description',
      img: 'Image',
      link: 'Link',
      repo: 'Repository',
      // tech: ['Stack'], // TODO
    },
  };

  const data = {
    topSkills: ['JS', 'React', 'TDD', 'Full stack developer'],
    summary: 'Some summary here',
  };

  const stateCapsules = {
    basic: (
      <StateCapsule schema={schema.forRemoveButton} object={data}>
        {() => {}}
      </StateCapsule>
    ),
    withChildrenRemoveButton: (
      <StateCapsule schema={schema.forRemoveButton} object={data}>
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
                      className="button-remove"
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
    withChildrenCreateButton: (
      <StateCapsule schema={schema.forCreateButton} object={{}}>
        {({ stateCapsule, createItem }) => (
          <div>
            <button
              className="button-create"
              type="button"
              onClick={createItem('projects')}
            >
              Create
            </button>
            <ul>
              {// prettier-ignore
              Object.keys(stateCapsule).map(field => (
                <div key={`${Math.random()}-${Date.now()}`}>
                  <input
                    id={`new-${field}`}
                    type="text"
                    value={stateCapsule[field]}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </StateCapsule>
    ),
  };

  describe('Renders correctly', () => {
    it('should renders basic component', () => {
      const tree = renderer.create(stateCapsules.basic).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should renders children with remove functionality.', () => {
      const tree = renderer
        .create(stateCapsules.withChildrenRemoveButton)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should renders children with create functionality.', () => {
      const tree = renderer
        .create(stateCapsules.withChildrenCreateButton)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
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

  it('should update state onChange', () => {
    const shallowSC = shallow(stateCapsules.withChildrenRemoveButton);

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

  describe('Remove items from an array', () => {
    let shallowSC;

    // Initialized Array = ['JS', 'React', 'TDD', 'Full stack developer'];
    const modifiedArray = [];

    const mockDispatchEvent = jest.fn(() => {});
    const mockStopPropagation = jest.fn(() => {});
    // prettier-ignore
    const mockEvent = index => Object.assign({
      target: {
        field: 'topSkills',
        index,
        dispatchEvent: mockDispatchEvent,
      },
      stopPropagation: mockStopPropagation,
    });

    beforeAll(() => {
      shallowSC = shallow(stateCapsules.withChildrenRemoveButton);

      const buttons = shallowSC.find('.button-remove');

      /**
       * Simulate 'click' on each rendered button, thus all items are removed.
       */
      let aux = 0; // to mimic an index
      buttons.forEach((button) => {
        button.simulate('click', mockEvent(aux));
        aux += 1;
      });
    });

    it('should update state`s array-like property onClick', () => {
      // After on click event => array must be empty
      expect(shallowSC.state().topSkills).toEqual(
        expect.arrayContaining(modifiedArray),
      );
    });

    it('should call dispatchEvent', () => {
      expect(mockDispatchEvent).toHaveBeenCalledTimes(4);
    });

    it('should call stopPropagation', () => {
      expect(mockStopPropagation).toHaveBeenCalledTimes(4);
    });
  });

  describe('Create new array-item and push it to its array', () => {
    let shallowSC;
    let button;
    const mockDispatchEvent = jest.fn(() => {});
    const mockStopPropagation = jest.fn(() => {});
    const mockEvent = {
      target: {
        field: 'projects',
        dispatchEvent: mockDispatchEvent,
      },
      stopPropagation: mockStopPropagation,
    };

    beforeAll(() => {
      shallowSC = shallow(stateCapsules.withChildrenCreateButton);

      button = shallowSC.find('button.button-create');

      /**
       * Simulate user interaction typing some text in input fields.
       */
      shallowSC.setState({
        title: 'A happy user filling title field',
        description: 'A happy user filling description field',
        img: 'A happy user filling img field',
        link: 'A happy user filling link field',
        repo: 'A happy user filling repo field',
      });

      /**
       * Submit the form and create a new entry in the corresponding array.
       *
       * This user interaction shall also reset the state.
       */
      button.simulate('click', mockEvent);
    });

    it('should have only one create-button', () => {
      expect(button).toHaveLength(1);
    });

    it('should call dispatchEvent', () => {
      expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
    });

    it('should call stopPropagation', () => {
      expect(mockStopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should reset state', () => {
      expect(shallowSC.state()).toMatchObject({
        title: '',
        description: '',
        img: '',
        link: '',
        repo: '',
      });
    });
  });
});
