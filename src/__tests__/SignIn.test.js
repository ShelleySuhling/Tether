import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme'
import MockDate from 'mockdate'
import firebase from '../firebase'
import EmailPasswordForm from '../components/Forms/EmailPasswordForm'
import sessionActions from '../actions/sessionActions'
import SignIn from '../containers/Session/SignIn';
import * as _ from 'lodash'
Enzyme.configure({ adapter: new Adapter() });

import configureStore from '../store/configureStore';
import { signIn } from '../firebase/auth';

const { store } = configureStore()
describe('SignIn', () => {
    MockDate.set('1/1/2018');
    const signInWrapper = shallow(<SignIn store={store} />).dive()
    const formWrapper = signInWrapper.find(EmailPasswordForm).dive()
    it('matches snapshot', () => {
        expect(signInWrapper).toMatchSnapshot();
    })
    it('renders EmailPasswordForm component', () => {
        expect(signInWrapper.find(EmailPasswordForm).getElements()).toHaveLength(1)
    })
    it('correctly handles input change and changes state', () => {
        const eventObject = { target: { type: 'email', value: 'fakeemail@email.com' } }
        signInWrapper.instance().handleChange(eventObject)
        expect(signInWrapper.instance().state.email).toEqual('fakeemail@email.com')
    })
    it('correctly handles submitting form', () => {
        const request_sign_in_mock = jest.fn()
        signInWrapper.instance().props.sessionActions.requestSignIn = request_sign_in_mock

        formWrapper.find({ type: 'email' }).simulate('change', { target: { value: "fakeemail@email.com", type: 'email' } })
        formWrapper.find({ type: 'password' }).simulate('change', { target: { value: "password", type: 'password' } })
        formWrapper.find({ type: 'submit' }).simulate('click', { preventDefault() { } })
        expect(request_sign_in_mock).toHaveBeenCalled()
    })
    it('unmounts and calls to clear auth errors', () => {
        const clear_auth_errors_mock = jest.fn()
        signInWrapper.instance().props.sessionActions.clearAuthErrors = clear_auth_errors_mock

        signInWrapper.instance().componentWillUnmount()
        expect(clear_auth_errors_mock).toHaveBeenCalled()
    })
    it('redirects to events page when user is logged in', () => {
        const redirect_to_events_mock = jest.fn()
        signInWrapper.instance().redirectToEvents = redirect_to_events_mock
        signInWrapper.instance().props.session.user = { id: 3 }

        signInWrapper.instance().forceUpdate()
        expect(redirect_to_events_mock).toHaveBeenCalled()
    })
})