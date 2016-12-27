//holds all auth level wrappers
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

const UserIsSudo = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/unauthorized',
	wrapperDisplayName: 'UserIsSudo',
	predicate: user => user.getIn(['permission', 'sudo']),
	allowRedirectBack: false
})

const UserIsDistrict = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/unauthorized',
	wrapperDisplayName: 'UserIsDistrict',
	predicate: user => user.getIn(['permission', 'district']),
	allowRedirectBack: false
})

const UserIsSchool = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/unauthorized',
	wrapperDisplayName: 'UserIsSchool',
	predicate: user => user.getIn(['permission', 'school']),
	allowRedirectBack: false
})

const UserIsDrill = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/unauthorized',
	wrapperDisplayName: 'UserIsDrill',
	predicate: user => user.getIn(['permission', 'drill']),
	allowRedirectBack: false
})

const UserIsLoggedIn = UserAuthWrapper({
	authSelector: state => state.user.get("permission"),
	redirectAction: routerActions.replace,
	failureRedirectPath: '/login',
	wrapperDisplayName: 'UserIsLoggedIn'
})

//used for login page
export const IsNotLoggedIn = UserAuthWrapper({
	authSelector: state => state.user,
	redirectAction: routerActions.replace,
	failureRedirectPath: '/',
	wrapperDisplayName: 'UserIsDrill',
	predicate: user => user.get("permission") == undefined,
	allowRedirectBack: false
})


/*
will redirect to login if not logged in and will redirect to unauthorized if logged in and doesnt have the proper permissions
*/

export const IsSudo = (component) => {
	return UserIsLoggedIn(UserIsSudo(component))
}

export const IsDistrict = (component) => {
	return UserIsLoggedIn(UserIsDistrict(component))
}

export const IsSchool = (component) => {
	return UserIsLoggedIn(UserIsSchool(component))
}

export const IsDrill = (component) => {
	return UserIsLoggedIn(UserIsDrill(component))
}