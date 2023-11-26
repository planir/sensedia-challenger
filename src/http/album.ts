import HttpClient from "./http";

export const AlbumClient = new (class Client extends HttpClient {
	constructor() {
		super("/albums");
	}

	async getAllAlbums() {
		const { data } = await this.http.get<{ users: IUser[] }>("/");

		return data;
	}
})();
