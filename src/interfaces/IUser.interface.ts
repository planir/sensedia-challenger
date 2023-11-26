interface IUser {
	id: string;
	name: string;
	email: string;
	created_at: string;
	updated_at: string;
}

type IUserDetailed = IUser & {
	fullName: string;
	city: string;
	days: string[];
	albums: IAlbum[]
	posts: IPost[]
}