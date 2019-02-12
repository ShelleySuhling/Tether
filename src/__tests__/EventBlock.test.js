import * as React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'

import MockDate from 'mockdate'
import EventBlock from '../components/Events/EventBlock';

beforeAll(() => {
  MockDate.set('1/1/2018');
})

describe('EventBlock', () => {
  let mock_event = {
    id: 3,
    title: "sample title",
    location: "sample location",
    startDate: moment("2018-01-05 4:30", "YYYY-MM-DD HH:mm"),
    endDate: moment("2018-01-05 7:30", "YYYY-MM-DD HH:mm"),
    isMandatory: true,
  }
  it('matches snapshot', () => {
    const wrapper = shallow(<EventBlock event={mock_event} user={{ role: "master" }} />);
    expect(wrapper).toMatchSnapshot();
  });
});