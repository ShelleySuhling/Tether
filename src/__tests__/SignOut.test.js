import * as React from 'react';
import { shallow } from 'enzyme';

import SignOut from '../containers/Session/SignOut';

import configureStore from '../store/configureStore';
const { store } = configureStore()

describe('SignOut', () => {
    const signOutWrapper = shallow(<SignOut store={store} />).dive()

    it('matches snapshot', () => {
        expect(signOutWrapper).toMatchSnapshot();
    })
    it('mounts and requests sign out', () => {
        const request_sign_out_mock = jest.fn()
        signOutWrapper.instance().props.sessionActions.requestSignOut = request_sign_out_mock

        signOutWrapper.instance().componentWillMount()
        expect(request_sign_out_mock).toHaveBeenCalled()
    })
    it('correctly displays loading screen', () => {
        signOutWrapper.instance().state.loading = true
        signOutWrapper.instance().forceUpdate()
        expect(signOutWrapper.text()).toEqual('Signing you out')
    })
    it('correctly displays successful sign out', () => {
        signOutWrapper.instance().state.loading = false
        signOutWrapper.instance().forceUpdate()
        expect(signOutWrapper.text()).toEqual('You\'ve been successfully signed out')
    })
})