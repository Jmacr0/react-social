import axios from "axios";

export default {
	getReviews: async function () {
		const response = await axios.get("/api/review/all");
		return response.data;
	},
	// // Gets the book with the given id
	getReview: async function (id) {
		const response = await axios.get("/api/review/one/" + id);
		return response.data;
	},
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
}