import axios from "axios";

export default {
	getExisting: async function (findExistingUser) {
		const response = await axios.post('/api/user', findExistingUser);
		console.log(response.data)
		return response.data;
	},
	getCurrentUser: async function () {
		const response = await axios.get('/api/user/current');
		return response.data;
	},
	getUserProfile: async (getUserProfile) => {
		const response = await axios.get(`/api/user/one/${getUserProfile}`);
		return response.data;
	},
	saveUser: async function (newUser) {
		const response = await axios.post("/api/user/new", newUser);
		console.log('api res!...', response)
		return response.data;
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
