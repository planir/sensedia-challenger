import HttpClient from "./http";

export const UserClient = new (class Client extends HttpClient {
	constructor() {
		super("/users");
	}

	async getUserData(userId: string) {
		const { data } = await this.http.get<{user: IUser}>("/" + userId);

		return data;
	}

	async getAllUsers() {
		const { data } = await this.http.get<{ users: IUser[] }>("/");

		return data;
	}

	async getUserAlbums(userId: string) {
		const { data } = await this.http.get<{ albums: IAlbum[] }>(
			"/" + userId + "/albums"
		);

		return data;
	}

	async getUserPosts(userId: string) {
		const { data } = await this.http.get<{ posts: IPost[] }>(
			"/" + userId + "/posts"
		);

		return data;
	}

	createUser(user: { email: string; name: string }) {
		return this.http.post("/create", { ...user, password: "123" });
	}

	removeUser(userId: string) {
		return this.http.delete(userId);
	}
})();
