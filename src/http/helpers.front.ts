import HttpClient from "./http.front";

export const HelpersClient = new (class Client extends HttpClient {
	constructor() {
		super("/");
	}

	async getWeekDays() {
		const { data } = await this.http.get<
			IDay[]
		>("/days");

		return data;
	}
})();
