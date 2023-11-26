import { getDays } from "@/pages/api/days";

export const getRandomDays = () => {
    const days = getDays();
	const randomDays: string[] = [];
	const numRandomDays = Math.floor(Math.random() * 3) + 1;

	for (let j = 0; j < numRandomDays; j++) {
		const randomDay = days[Math.floor(Math.random() * days.length)].name;
		if (!randomDays.includes(randomDay)) {
			randomDays.push(randomDay);
		}
	}

	randomDays.sort(
		(a, b) =>
			days.findIndex((day) => day.name === a) -
			days.findIndex((day) => day.name === b)
	);

	return randomDays;
};
