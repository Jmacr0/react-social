import axios from "axios";

export default {
	getReviewsAll: async function () {
		const response = await axios.get("/api/review/all");
		return response.data;
	},
	getReviewsOneType: async function (type) {
		const response = await axios.get("/api/review/all/" + type);
		return response.data;
	},
	getReviewsSearch: async function (search) {
		const response = await axios.get("/api/review/all/search/" + search);
		return response.data;
	},
	// // Gets the book with the given id
	getReview: async function (id) {
		const response = await axios.get("/api/review/one/" + id);
		console.log(response)
		return response.data;
	},
	// // Deletes the book with the given id
	// deleteBook: function (id) {
	// 	return axios.delete("/api/books/" + id);
	// },
	// Saves a review to the database
	saveReview: async function (newReview) {
		const response = await axios.post("/api/review/new", newReview, { withCredentials: true });
		return response.data;
	},
	updateReview: async function (updateReview) {
		const response = await axios.patch("/api/review/update", updateReview, { withCredentials: true });
		console.log(response)
		return response.data;
	},
	deleteReview: async function (deleteReview) {
		const response = await axios.delete("/api/review/delete", {
			data: deleteReview,
			withCredentials: true
		});
		console.log(response)
		return response.data;
	},
}