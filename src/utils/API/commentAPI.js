import axios from "axios";

export default {
	saveComment: async function (saveComment) {
		const response = await axios.post('/api/comment/new', saveComment, { withCredentials: true });
		console.log(response.data)
		return response.data;
	}
}
