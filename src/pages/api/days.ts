import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export const getDays = () => {
	const daysOfWeek = [
		"Lunes",
		"Martes",
		"Miercoles",
		"Jueves",
		"Viernes",
		"Sabado",
		"Domingo",
	];

	const data = daysOfWeek.map((day, index) => ({
		id: index + 1,
		name: day,
		abv: day.substring(0, 3),
		createdAt: faker.date.recent().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	}));

	return data;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") throw new Error("Método no válido.");

		res.status(200).json(getDays());
	} catch (error) {
		console.error("Error al obtener datos:", error);

		res.status(500).json({ error: "Error interno del servidor" });
	}
}
