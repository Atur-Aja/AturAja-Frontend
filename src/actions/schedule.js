import axios from 'axios';
import { baseUrl } from '../helpers/config';
import { GET_USER_SCHEDULE } from './type';

export function getSchedule() {
	return (dispatch) => {
		return axios.get(baseUrl + "/api/user/coba/schedules")
			.then((response) => {
				dispatch({
					type: GET_USER_SCHEDULE,
          payload: response.data
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}
}