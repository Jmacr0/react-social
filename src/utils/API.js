import axios from "axios";

export default {
	// Gets all books
	getReviews: async function () {
		const response = await axios.get("/api/review/all");
		return response.data;
	},
	// // Gets the book with the given id
	// getBook: function (id) {
	// 	return axios.get("/api/books/" + id);
	// },
	// // Deletes the book with the given id
	// deleteBook: function (id) {
	// 	return axios.delete("/api/books/" + id);
	// },
	// Saves a review to the database
	saveReview: async function (newReview) {
		const response = await axios.post("/api/review/new", newReview, { withCredentials: true });
		console.log(response)
		return response.data;
	},
	// Saves a new user to the database
	saveUser: async function (newUser) {
		const response = await axios.post("/api/user/new", newUser);
		return response;
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
		const response = await axios.get('/api/user/authenticate')
		console.log(response.data)
		return response.data;
	}
};
