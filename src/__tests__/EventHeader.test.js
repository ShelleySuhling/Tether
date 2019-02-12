import * as React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate'

import EventHeader from '../components/Events/EventHeader';

beforeAll(() => {
    MockDate.set('1/1/2018');
})
describe('EventHeader', () => {
    const mock_session = {
        user: {
            fullName: "Test User"
        }
    }
    let handle_change_mock = jest.fn()

    const eventHeaderWrapper = shallow(<EventHeader session={mock_session} handleViewChange={handle_change_mock} />);
    it('matches snapshot', () => {
        expect(eventHeaderWrapper).toMatchSnapshot();
    });
    it('handles view filtering', () => {
        eventHeaderWrapper.instance().handleChange("event", { name: "name", value: "value" })
        expect(handle_change_mock).toHaveBeenCalled()
    });
});