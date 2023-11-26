import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import RootLayout from "@/layouts/root";
import buttons from "@/styles/buttons.module.css";
import input from "@/styles/input.module.css";
import Icon from "@/components/extras/icon";
import Link from "next/link";
import { UserClient } from "@/http/user";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { HelpersClient } from "@/http/helpers.front";

export const getServerSideProps = (async () => {
	const weekDays = await HelpersClient.getWeekDays();

	return { props: { weekDays, pageName: "Crear usuario" } };
}) satisfies GetServerSideProps<{ weekDays: IDay[]; pageName: string }>;

const Page: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ weekDays }) => {
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [selectedDays, setSelectedDays] = useState<string[]>(
		weekDays.map((day) => day.abv)
	);
	const [errors, setErrors] = useState<string[]>([]);

	const router = useRouter();

	const handleCheckboxChange = (day: string) => {
		if (selectedDays.includes(day)) {
			setSelectedDays(
				selectedDays.filter((selectedDay) => selectedDay !== day)
			);
		} else {
			setSelectedDays([...selectedDays, day]);
		}
	};

	const handleRegistration = async () => {
		// Realiza validaciones y establece los errores
		const newErrors: string[] = [];

		if (!username) newErrors.push("username");
		if (!fullName) newErrors.push("fullName");
		if (!email) newErrors.push("email");
		if (!city) newErrors.push("city");
		if (selectedDays.length === 0) newErrors.push("selectedDays");

		setErrors(newErrors);

		// Si no hay errores, procesa los datos
		if (newErrors.length === 0) {
			await UserClient.createUser({
				name: username,
				email,
			});

			alert("Datos enviados correctamente!");

			// Redirige a la página principal ("/")
			router.push("/");
		} else {
			alert("Por favor, validar los datos.");
		}
	};

	const helpMessages = [
		{
			title: "¿Necesitas ayuda?",
			content:
				"Es fácil: llena todos los campos y presiona el botón. ¡Estamos aquí para ayudarte en cada paso!",
			icon: "life-ring",
		},
		{
			title: "¿Por qué registrarse?",
			content:
				"Regístrate y accede a toda la información que nuestro sitio web ofrece para ampliar tu conocimiento. ¡Descubre más al alcance de tus dedos!",
			icon: "heart-beat",
		},
		{
			title: "¿Qué está pasando?",
			content:
				"Descúbrelo registrándote en nuestro sitio web para mantenerte completamente informado. 🌐 ¡Regístrate ahora!",
			icon: "grin-alt",
		},
	];

	return (
		<div>
			<p className="text-2xl font-medium my-9">Registro</p>
			<div className="flex justify-between">
				{helpMessages.map((help) => (
					<div
						className="flex flex-col"
						key={help.title}>
						<p className="text-base font-medium text-secondary mb-[18px]">
							{help.title}
						</p>

						<div className="flex">
							<Icon icon={help.icon}></Icon>
							<p className="ml-3.5 w-52 text-base text-gray-high-medium font-medium">
								{help.content}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="border py-9 px-5 border-gray-light-0 mt-5 rounded mb-9">
				<p className="uppercase text-gray-high text-sm font-medium">
					Registro
				</p>

				<div className="flex mt-[37px] mb-24">
					<div className="flex flex-col flex-1 pr-3">
						<input
							type="text"
							className={`${input["text-input"]} ${
								errors.includes("username") &&
								"!border-red-500 !placeholder-red-500"
							}`}
							placeholder="Nombre de usuario *"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<input
							type="text"
							className={`${input["text-input"]} my-8 ${
								errors.includes("fullName") &&
								"!border-red-500 !placeholder-red-500"
							}`}
							placeholder="Nombre completo *"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
						<input
							type="text"
							className={`${input["text-input"]} ${
								errors.includes("email") &&
								"!border-red-500 !placeholder-red-500"
							}`}
							placeholder="Correo electrónico *"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className={"flex flex-col flex-1 pl-3"}>
						<input
							type="text"
							className={`${input["text-input"]} mb-8 ${
								errors.includes("city") &&
								"!border-red-500 !placeholder-red-500"
							}`}
							placeholder="Ciudad *"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>

						<p
							className={`uppercase text-gray-high text-sm font-medium  ${
								errors.includes("selectedDays") &&
								"!text-red-500"
							}`}>
							Días de la semana
						</p>

						<div className="flex flex-wrap mt-3">
							{weekDays.map((day) => (
								<div
									className={"flex items-center mb-4 mr-4"}
									key={day.abv}>
									<input
										id={`checkbox-${day}`}
										type="checkbox"
										checked={selectedDays.includes(day.abv)}
										onChange={() =>
											handleCheckboxChange(day.abv)
										}
										className="w-5 h-5 rounded accent-primary focus:ring-secondary focus:ring-2"
									/>

									<label
										htmlFor={`checkbox-${day.abv}`}
										className={`text-base text-gray-100 ml-3 ${
											errors.includes("selectedDays") &&
											"!text-red-500"
										}`}>
										{day.abv}
									</label>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="flex">
					<button
						data-testid="registro"
						className={buttons.primary}
						onClick={handleRegistration}>
						Registro
					</button>
					<Link
						className={`${buttons.text} ml-2.5`}
						href="/">
						Cancelar
					</Link>
				</div>
			</div>
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <RootLayout>{page}</RootLayout>;
};

export default Page;
