import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { UserClient } from "@/http/user";
import { getRandomDays } from "@/helpers/getRandomDays.helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== "GET") throw new Error("Método no válido.");

		const userData = await UserClient.getUserData(req.query.user as string);

		if (!userData)
			return res.status(404).json({
				message: "Usuario no encontrado.",
			});

		const { albums } = await UserClient.getUserAlbums(userData.user.id);
		const { posts } = await UserClient.getUserPosts(userData.user.id);

		res.status(200).json({
			...userData.user,
			city: faker.location.city(),
			albums: albums || [],
			posts: posts || [],
			days: getRandomDays(),
		});
	} catch (error) {
		console.error("Error al obtener datos:", error);

		res.status(500).json({ error: "Error interno del servidor" });
	}
}
