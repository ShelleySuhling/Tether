import * as React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'
import MockDate from 'mockdate'

import Events from '../containers/Events/Events';
import EventBlock from '../components/Events/EventBlock'
import EventHeader from '../components/Events/EventHeader'
import Mobile from '../components/Mobile'
import Default from '../components/Default'

import configureStore from '../store/configureStore';
const { store } = configureStore()

describe('Events', () => {
  MockDate.set('1/1/2018');
  const eventsComponentWrapper = shallow(<Events store={store} />).dive();

  eventsComponentWrapper.setState({
    view_context: "this",
    view_time: "week",
    events: [{
      id: 1,
      title: "first event",
      location: "sample location",
      startTime: moment("2018-01-05 4:30", "YYYY-MM-DD HH:mm"),
      endTime: moment("2018-01-05 7:30", "YYYY-MM-DD HH:mm"),
      isMandatory: true,
    },
    {
      id: 2,
      title: "second event",
      location: "sample location",
      startTime: moment("2018-01-06 4:30", "YYYY-MM-DD HH:mm"),
      endTime: moment("2018-01-06 7:30", "YYYY-MM-DD HH:mm"),
      isMandatory: false,
    },
    {
      id: 3,
      title: "third event",
      location: "sample location",
      startTime: moment("2018-01-10 4:30", "YYYY-MM-DD HH:mm"),
      endTime: moment("2018-01-10 7:30", "YYYY-MM-DD HH:mm"),
      isMandatory: false,
    },
    {
      id: 4,
      title: "fourth event",
      location: "sample location",
      startTime: moment("2018-02-10 4:30", "YYYY-MM-DD HH:mm"),
      endTime: moment("2018-02-10 7:30", "YYYY-MM-DD HH:mm"),
      isMandatory: false,
    }]
  })
  it('matches snapshot', () => {
    expect(eventsComponentWrapper).toMatchSnapshot();
  });
  it('has responsive components', () => {
    expect(eventsComponentWrapper.find(Mobile).getElements()).toHaveLength(1)
    expect(eventsComponentWrapper.find(Default).getElements()).toHaveLength(1)
  })
  it('has 2 EventHeader components', () => {
    expect(eventsComponentWrapper.find(Mobile).find(EventHeader).getElements()).toHaveLength(1)
    expect(eventsComponentWrapper.find(Default).find(EventHeader).getElements()).toHaveLength(1)
  })
  it('has 2 EventBlock components - this week', () => {
    expect(eventsComponentWrapper.find(Mobile).find(EventBlock).getElements()).toHaveLength(2)
    expect(eventsComponentWrapper.find(Default).find(EventBlock).getElements()).toHaveLength(2)
  })
  it('has 4 EventBlock components - next week', () => {
    eventsComponentWrapper.setState({
      view_context: "next",
      view_time: "week",
    })
    expect(eventsComponentWrapper.find(Mobile).find(EventBlock).getElements()).toHaveLength(1)
    expect(eventsComponentWrapper.find(Default).find(EventBlock).getElements()).toHaveLength(1)
  })
  it('has 2 EventBlock components - this month', () => {
    eventsComponentWrapper.setState({
      view_context: "this",
      view_time: "month",
    })
    expect(eventsComponentWrapper.find(Mobile).find(EventBlock).getElements()).toHaveLength(3)
    expect(eventsComponentWrapper.find(Default).find(EventBlock).getElements()).toHaveLength(3)
  })
  it('has 4 EventBlock components - next month', () => {
    eventsComponentWrapper.setState({
      view_context: "next",
      view_time: "month",
    })
    expect(eventsComponentWrapper.find(Mobile).find(EventBlock).getElements()).toHaveLength(1)
    expect(eventsComponentWrapper.find(Default).find(EventBlock).getElements()).toHaveLength(1)
  })
  it('correctly filters view_events - this week', () => {
    eventsComponentWrapper.setState({
      view_context: "this",
      view_time: "week",
    })
    expect(eventsComponentWrapper.instance().collectEventsByView()).toHaveLength(2)
  })
  it('correctly filters view_events - next week', () => {
    eventsComponentWrapper.setState({
      view_context: "next",
      view_time: "week",
    })
    expect(eventsComponentWrapper.instance().collectEventsByView()).toHaveLength(1)
  })
  it('correctly filters view_events - this month', () => {
    eventsComponentWrapper.setState({
      view_context: "this",
      view_time: "month",
    })
    expect(eventsComponentWrapper.instance().collectEventsByView()).toHaveLength(3)
  })
  it('correctly filters view_events - next month', () => {
    eventsComponentWrapper.setState({
      view_context: "next",
      view_time: "month",
    })
    expect(eventsComponentWrapper.instance().collectEventsByView()).toHaveLength(1)
  })
  it('correctly handles view change', () => {
    eventsComponentWrapper.instance().handleViewChange('view_context', 'this')
    eventsComponentWrapper.instance().handleViewChange('view_time', 'week')
    expect(eventsComponentWrapper.state('view_context')).toEqual('this')
    expect(eventsComponentWrapper.state('view_time')).toEqual('week')
  })
});