import axios from 'axios';
import { apiUrl } from '../helpers/config';
import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	SET_MESSAGE
} from './type';


export function register (username, email, password, password_validate, phone_number) {
	return (dispatch) => {
		return axios.post(apiUrl + "/register", {
			username,
			email,
			password,
			password_validate,
			phone_number
		}).then(response => {
				dispatch({
						type: REGISTER_SUCCESS,
				});
				dispatch({
						type: SET_MESSAGE,
						payload: response.data.message,
				});
				return Promise.resolve();
			}, error => {
					dispatch({
							type: REGISTER_FAILED,
					});
					dispatch({
							type: SET_MESSAGE,
							payload: error.toString(),
					});
					return Promise.reject();
			}  
		)
	}
};

export function login (email, password) {
	return (dispatch) => {
		return axios.post(apiUrl + "/login", {email, password})
		.then(response => {
			if (response.data.access_token) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		})
		.then(data => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { user: data },
			});
			return Promise.resolve();
		}, error => {
				dispatch({
					type: LOGIN_FAILED,
				});
				dispatch({
					type: SET_MESSAGE,
					payload: error.toString(),
				});
				return Promise.reject();
		}
	);
	}
};

export function logout() {
	return (dispatch) => {
		localStorage.removeItem("user");
		dispatch({
			type: LOGOUT,
		})
	}
}