import * as React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate'

import EmailPasswordForm from '../components/Forms/EmailPasswordForm'
import SignUp from '../containers/Session/SignUp';

import configureStore from '../store/configureStore';
const { store } = configureStore()

describe('SignUp', () => {
    MockDate.set('1/1/2018');
    let submit = jest.fn();
    const signUpWrapper = shallow(<SignUp store={store} />).dive()
    const formWrapper = signUpWrapper.find(EmailPasswordForm).dive()
    it('matches snapshot', () => {
        expect(signUpWrapper).toMatchSnapshot();
    })
    it('renders EmailPasswordForm component', () => {
        expect(signUpWrapper.find(EmailPasswordForm).getElements()).toHaveLength(1)
    })
    it('correctly handles input change and changes state', () => {
        const eventObject = { target: { type: 'email', value: 'fakeemail@email.com' } }
        signUpWrapper.instance().handleChange(eventObject)
        expect(signUpWrapper.instance().state.email).toEqual('fakeemail@email.com')
    })
    it('correctly handles submitting form', () => {
        const request_sign_up_mock = jest.fn()
        signUpWrapper.instance().props.sessionActions.requestSignUp = request_sign_up_mock

        formWrapper.find({ type: 'email' }).simulate('change', { target: { value: "fakeemail@email.com", type: 'email' } })
        formWrapper.find({ type: 'password' }).simulate('change', { target: { value: "password", type: 'password' } })
        formWrapper.find({ type: 'password-confirm' }).simulate('change', { target: { value: "password", type: 'password-confirm' } })
        formWrapper.find({ type: 'submit' }).simulate('click', { preventDefault() { } })
        expect(request_sign_up_mock).toHaveBeenCalled()
    })
    it('unmounts and calls to clear auth errors', () => {
        const clear_auth_errors_mock = jest.fn()
        signUpWrapper.instance().props.sessionActions.clearAuthErrors = clear_auth_errors_mock

        signUpWrapper.instance().componentWillUnmount()
        expect(clear_auth_errors_mock).toHaveBeenCalled()
    })
    it('redirects to events page when user is logged in', () => {
        const redirect_to_events_mock = jest.fn()
        signUpWrapper.instance().redirectToEvents = redirect_to_events_mock
        signUpWrapper.instance().props.session.user = { id: 3 }

        signUpWrapper.instance().forceUpdate()
        expect(redirect_to_events_mock).toHaveBeenCalled()
    })
})