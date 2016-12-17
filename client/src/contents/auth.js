//holds all auth level wrappers
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

export const UserIsSudo = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/login',
	wrapperDisplayName: 'UserIsSudo',
	predicate: user => user.getIn(['permission', 'sudo'])
})

export const UserIsDistrict = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/login',
	wrapperDisplayName: 'UserIsDistrict',
	predicate: user => user.getIn(['permission', 'district'])
})

export const UserIsSchool = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/login',
	wrapperDisplayName: 'UserIsSchool',
	predicate: user => user.getIn(['permission', 'school'])
})

export const UserIsDrill = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/login',
	wrapperDisplayName: 'UserIsDrill',
	predicate: user => user.getIn(['permission', 'drill'])
})

export const UserIsNotLoggedIn = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/',
	wrapperDisplayName: 'UserIsDrill',
	predicate: user => user.get("permission") == undefined,
	allowRedirectBack: false
})