import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page, { getServerSideProps } from "@/pages/users/new"; // Asegúrate de tener la ruta correcta

// Mock de los datos que retornaría tu API
const mockWeekDays = [
	{
		id: 1,
		name: "Lunes",
		abv: "Lun",
		createdAt: "2023-11-25T13:31:42.203Z",
		updatedAt: "2023-11-25T18:11:23.290Z",
	},
	{
		id: 2,
		name: "Martes",
		abv: "Mar",
		createdAt: "2023-11-25T01:45:34.826Z",
		updatedAt: "2023-11-25T02:43:46.561Z",
	},
	{
		id: 3,
		name: "Miercoles",
		abv: "Mie",
		createdAt: "2023-11-25T03:37:39.060Z",
		updatedAt: "2023-11-25T11:39:22.648Z",
	},
	{
		id: 4,
		name: "Jueves",
		abv: "Jue",
		createdAt: "2023-11-25T12:07:56.801Z",
		updatedAt: "2023-11-25T14:28:11.265Z",
	},
	{
		id: 5,
		name: "Viernes",
		abv: "Vie",
		createdAt: "2023-11-25T04:40:06.860Z",
		updatedAt: "2023-11-25T08:37:08.715Z",
	},
	{
		id: 6,
		name: "Sabado",
		abv: "Sab",
		createdAt: "2023-11-25T02:55:45.901Z",
		updatedAt: "2023-11-25T13:33:51.432Z",
	},
	{
		id: 7,
		name: "Domingo",
		abv: "Dom",
		createdAt: "2023-11-25T09:57:41.446Z",
		updatedAt: "2023-11-25T07:12:14.600Z",
	},
];

jest.mock("./../src/http/helpers.front", () => ({
	HelpersClient: {
		getWeekDays: jest.fn(() => Promise.resolve(mockWeekDays)),
	},
}));

// Mock de la llamada al servidor
jest.mock("./../src/http/user", () => ({
	UserClient: {
		createUser: jest.fn(() => Promise.resolve()),
	},
}));

let mockRouter;

jest.mock("next/router", () => {
	const useRouter = jest.fn(() => {
		mockRouter = {
			route: "/",
			pathname: "",
			query: "",
			asPath: "",
			push: jest.fn(),
		};
		return mockRouter;
	});

	return { useRouter };
});

describe("Página de Registro", () => {
	beforeEach(() => {
		// Configura el espía para window.alert antes de cada prueba
		alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
	});

	afterEach(() => {
		// Restaura la función original de window.alert después de cada prueba
		alertSpy.mockRestore();
	});

	it("renderiza correctamente", async () => {
		const serverSideProps = await getServerSideProps();

		render(<Page {...serverSideProps.props} />);

		expect(screen.getByTestId("registro")).toBeInTheDocument();
	});

	it("maneja el registro correctamente", async () => {
		const serverSideProps = await getServerSideProps();

		render(<Page {...serverSideProps.props} />);

		fireEvent.change(screen.getByPlaceholderText("Nombre de usuario *"), {
			target: { value: "ejemploUsuario" },
		});

		fireEvent.change(screen.getByPlaceholderText("Nombre completo *"), {
			target: { value: "ejemploNombre" },
		});

		fireEvent.change(screen.getByPlaceholderText("Correo electrónico *"), {
			target: { value: "ejemploCorreo" },
		});

		fireEvent.change(screen.getByPlaceholderText("Ciudad *"), {
			target: { value: "ejemploCiudad" },
		});

		fireEvent.click(screen.getByTestId("registro"));

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalledWith(
				"Datos enviados correctamente!"
			);
		});
	});
});
