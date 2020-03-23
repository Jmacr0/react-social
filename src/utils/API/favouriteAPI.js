import axios from "axios";

export default {
	saveFavourite: async function (saveFavourite) {
		const response = await axios.post('/api/favourite/new', saveFavourite, { withCredentials: true });
		console.log(response.data)
		return response.data;
	},
	removeFavourite: async function (removeFavourite) {
		const response = await axios.delete('/api/favourite/remove', removeFavourite, { withCredentials: true });
		console.log(response.data)
		return response.data;
	}
}