import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	SET_MESSAGE,
} from '../actions/type';

const initialState = {
	user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
	error: null,
}

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
			localStorage.setItem('user', JSON.stringify(action.payload));
			localStorage.setItem('user-token', action.payload.access_token)
			return {
				user: action.payload,
				error: null
			};
		case LOGIN_FAILED:
			return {
				user: null,
				error: action.payload
			};
		case LOGOUT:
			localStorage.removeItem('user');
			localStorage.removeItem('user-token');
			return {
				user: null,
				error: null
			};
		default:
			return state;
	}
}