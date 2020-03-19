import axios from "axios";

export default {
	getUser: async function (findUser) {
		const response = await axios.post('/api/user', findUser);
		console.log(response.data)
		return response.data;
	},
	getCurrentUser: async function () {
		const response = await axios.get('/api/user/current');
		console.log(response.data)
		return response.data;
	},
	saveUser: async function (newUser) {
		const response = await axios.post("/api/user/new", newUser);
		return response;
	},
	updateUser: async function (updateUser) {
		const response = await axios.patch("/api/user", updateUser);
		return response;
	},
	updateUserPassword: async function (updateUser) {
		const response = await axios.patch("/api/user/password", updateUser);
		console.log('API res: ', response.data);
		return response.data;
	},
	// Logs the user in
	loginUser: async function (existingUser) {
		const response = await axios.post("/api/user/login", existingUser);
		return response.data;
	},
	logoutUser: async function () {
		const response = await axios.get("/api/user/logout");
		console.log(response.data)
		return response.data;
	},
	authenticateUser: async function () {
		const response = await axios.get('/api/user/authenticate');
		console.log(response.data.user)
		return response.data;
	}
}
