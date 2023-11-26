import HttpClient from "./http.front";

export const UserClient = new (class Client extends HttpClient {
	constructor() {
		super("/users");
	}

	async getAllUsers(page: number | string = 1, query: string = "") {
		const { data } = await this.http.get<IPagination<IUserDetailed>>("/", {
			params: { page, query },
		});

		return data;
	}

	async getUserData(userId: string) {
		const { data } = await this.http.get<IUserDetailed>("/" + userId);

		return data;
	}
})();
