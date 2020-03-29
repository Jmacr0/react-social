import axios from "axios";

export default {
	saveComment: async function (saveComment) {
		const response = await axios.post('/api/comment/new', saveComment, { withCredentials: true });
		console.log(response.data)
		return response.data;
	},
	getComment: async (id) => {
		const response = await axios.get('/api/comment/one/edit/' + id);
		console.log(response.data);
		return response.data;
	},
	updateComment: async (updateComment) => {
		const response = await axios.patch('/api/comment/one/edit', updateComment, { withCredentials: true });
		console.log(response.data);
		return response.data;
	},
	deleteComment: async (deleteComment) => {
		const response = await axios.delete('/api/comment/one/delete', {
			data: deleteComment,
			withCredentials: true
		})
		console.log(response);
		return response.data;
	}
}
