import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestWrapper from '../../utilityComponents/TestWrapper/TestWrapper';
import Experience from './Experience';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

configure({ adapter: new Adapter() });

/**
 * @author jesuarva
 * We are only testing proper rendering of inner components,
 * this is accomplish with a snapshot.
 *
 * @see ArraySection.spec.js for specific test related to its fucntionality.
 */
describe('Experience component', () => {
  const userInfo = {
    experience: [
      {
        title: 'LCAI',
        company: 'UAM research group',
        location: {
          loc: {
            coordinates: ['-0.666', '-66.666'],
            type: 'Point',
          },
          _id: '5bb748545cdfe308de503a2b',
          place: 'Madrid',
        },
        headline: 'Wedsite for an research group.',
        description:
          'A dynamic website with no know CRM and Backend hosted in google Spreadsheet.',
        startYear: '2018-09-27T19:10:21.809Z',
        endYear: '2018-09-27T19:10:21.809Z',
      },
      {
        title: 'Developer profiles',
        company: 'Lambda',
        location: {
          loc: {
            coordinates: ['10.666', '43.666'],
            type: 'Point',
          },
          _id: '5bb748545cdfe308de503a29',
          place: 'Califormia',
        },
        headline: 'Meeting point for employers looking for talent developers.',
        description: 'A place to match employer needs with a talent developer',
        startYear: '2018-09-27T19:10:21.809Z',
        endYear: '2018-10-12T19:10:21.809Z',
      },
    ],
  };
  const experienceComponent = <Experience userInfo={userInfo} />;

  it('should renders correctly', () => {
    const tree = renderer.create(experienceComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should renders an <ArraySection/> component', () => {
    const mounted = mount(
      <TestWrapper>{() => experienceComponent}</TestWrapper>,
    );
    const arraySection = mounted.find(ArraySection);
    expect(arraySection).toHaveLength(1);
  });
});
