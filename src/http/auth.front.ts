import HttpClient from "./http.front";

export const AuthClient = new (class Client extends HttpClient {
	constructor() {
		super("/auth");
	}

	async getAuthInformation() {
		const { data } = await this.http.get<IAuth>("/");

		return data;
	}
})();
