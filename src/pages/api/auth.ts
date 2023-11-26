import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") throw new Error("Método no válido.");

		const userName = faker.internet.userName();

		res.status(200).json({
			userName,
			suffix: userName.substring(0, 2).toUpperCase(),
			menu: [
				{
					title: "Lista de usuarios",
					path: "/",
				},
				{
					title: "Crear usuario",
					path: "/users/new",
				},
			],
		});
	} catch (error) {
		console.error("Error al obtener datos:", error);

		res.status(500).json({ error: "Error interno del servidor" });
	}
}
