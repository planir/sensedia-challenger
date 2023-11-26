import { UserClient } from "@/http/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { getRandomDays } from "@/helpers/getRandomDays.helper";

const ITEMS_PER_PAGE = "10"; // Número predeterminado de usuarios por página

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== "GET") throw new Error("Método no válido.");

		let {
			limit = ITEMS_PER_PAGE,
			page = "1",
			query = "",
		} = req.query as {
			limit: string;
			page: string;
			query?: string;
		};

		const pageNumber = parseInt(page);
		const limitNumber = parseInt(limit);

		const { users: usersRaw } = await UserClient.getAllUsers();

		const data = usersRaw.filter((user) =>
			user.name.toLowerCase().includes(query.toLowerCase())
		);

		// Calcular el índice de inicio y fin para la paginación
		const startIndex = (pageNumber - 1) * limitNumber;
		const endIndex = startIndex + limitNumber;

		const usersOnPage = data
			.sort(
				(a, b) =>
					new Date(b.created_at).valueOf() -
					new Date(a.created_at).valueOf()
			)
			.slice(startIndex, endIndex);

		const users = await Promise.all(
			usersOnPage.map(async (user) => {
				const { albums } = await UserClient.getUserAlbums(user.id);
				const { posts } = await UserClient.getUserPosts(user.id);

				return {
					...user,
					fullName: `${faker.person.firstName()}, ${faker.person.lastName()}`,
					city: faker.location.city(),
					albums: albums || [],
					posts: posts || [],
					days: getRandomDays(),
				};
			})
		);

		const totalUsers = data.length;
		const totalPages = Math.ceil(totalUsers / limitNumber);

		const paginationData = {
			data: users,
			pagination: {
				totalItems: totalUsers,
				totalPages,
				currentPage: +page,
				itemsPerPage: +limit,
			},
		};

		res.status(200).json(paginationData);
	} catch (error) {
		console.error("Error al obtener datos:", error);

		res.status(500).json({ error: "Error interno del servidor" });
	}
}
