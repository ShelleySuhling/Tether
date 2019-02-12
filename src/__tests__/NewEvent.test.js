import * as React from 'react';
import { shallow } from 'enzyme';

import NewEvent from '../containers/Events/NewEvent';

import configureStore from '../store/configureStore';
const { store } = configureStore()

describe('NewEvent', () => {
    const newEventWrapper = shallow(<NewEvent store={store} />).dive()
    it('matches snapshot', () => {
        expect(newEventWrapper).toMatchSnapshot()
    })
    it('has an empty event object in state', () => {
        expect(newEventWrapper.state('event')).toEqual({})
    })
    it('onSubmit calls requestCreateEvent action', () => {
        const request_create_event_mock = jest.fn()
        newEventWrapper.instance().props.eventsActions.requestCreateEvent = request_create_event_mock

        newEventWrapper.instance().onSubmit()
        expect(request_create_event_mock).toHaveBeenCalled()
    })
    it('redirects to events page when event is made', () => {
        const redirect_to_events_mock = jest.fn()
        newEventWrapper.instance().redirectToEvents = redirect_to_events_mock
        newEventWrapper.instance().props.events.newEvent = true

        newEventWrapper.instance().forceUpdate()
        expect(redirect_to_events_mock).toHaveBeenCalled()
    })
})