import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	SET_MESSAGE
} from '../actions/type';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user 
  ? {isLoggedIn: true, user} 
	: {isLoggedIn: false, user: null};

export default function auth(state = initialState, action) {
	switch(action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
			};
		case REGISTER_FAILED:
			return {
				...state,
				isLoggedIn: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: action.payload.user,
			};
		case LOGIN_FAILED:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
}