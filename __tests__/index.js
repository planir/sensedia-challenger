import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Page, { getServerSideProps } from "@/pages/index";

const mockUsersData = {
	data: [
		{
			id: "ec6db7c7-9834-4fc9-8e23-985112313951",
			name: "Fauce",
			email: "asdasd@gmail.com",
			created_at: "2023-11-25T18:55:32.618885-05:00",
			updated_at: "2023-11-25T18:55:32.618885-05:00",
			fullName: "Kole, Bailey",
			city: "South Marquiseview",
			albums: [],
			posts: [],
			days: ["Lunes", "Jueves", "Sabado"],
		},
		{
			id: "80f0a16c-fc17-4b25-b204-d0b891d9b4d5",
			name: "User_0f2a1bb4-97bd-4e87-bb30-f9f9cb021f42",
			email: "user_0f2a1bb4-97bd-4e87-bb30-f9f9cb021f42@example.com",
			created_at: "2023-11-25T13:07:33.854058-05:00",
			updated_at: "2023-11-25T13:07:33.854058-05:00",
			fullName: "Werner, Weber",
			city: "Sarasota",
			albums: [],
			posts: [
				{
					id: "d7b521f2-396f-4876-98cc-84513f7bc585",
					user_id: "80f0a16c-fc17-4b25-b204-d0b891d9b4d5",
					content:
						"Post content by User_0f2a1bb4-97bd-4e87-bb30-f9f9cb021f42",
					created_at: "2023-11-25T13:07:33.855293-05:00",
					updated_at: "2023-11-25T13:07:33.855293-05:00",
				},
			],
			days: ["Martes", "Miercoles", "Sabado"],
		},
		{
			id: "205aa71e-9625-4d48-a0d0-6712fb81e25e",
			name: "User_65105a75-00d3-4cb0-b5f1-ad0573849df7",
			email: "user_65105a75-00d3-4cb0-b5f1-ad0573849df7@example.com",
			created_at: "2023-11-25T13:07:33.843458-05:00",
			updated_at: "2023-11-25T13:07:33.843458-05:00",
			fullName: "Chet, Pfannerstill",
			city: "Stephanyfield",
			albums: [],
			posts: [
				{
					id: "2bfa003a-3da0-4e47-b6f8-8f7805282d8c",
					user_id: "205aa71e-9625-4d48-a0d0-6712fb81e25e",
					content:
						"Post content by User_65105a75-00d3-4cb0-b5f1-ad0573849df7",
					created_at: "2023-11-25T13:07:33.850515-05:00",
					updated_at: "2023-11-25T13:07:33.850515-05:00",
				},
			],
			days: ["Martes", "Miercoles"],
		},
	],
	pagination: {
		totalItems: 40,
		totalPages: 14,
		currentPage: 1,
		itemsPerPage: 3,
	},
};

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

jest.mock("./../src/http/user.front", () => ({
	UserClient: {
		getAllUsers: jest.fn(() => Promise.resolve(mockUsersData)),
	},
}));

describe("Tu página", () => {
	it("renderiza correctamente", async () => {
		const serverSideProps = await getServerSideProps();

		render(<Page {...serverSideProps.props} />);

		expect(screen.getByText("Usuarios")).toBeInTheDocument();
		expect(screen.getByText("Nombre")).toBeInTheDocument();
	});

	it("actualiza la lista de usuarios al realizar una búsqueda", async () => {
		render(<Page usersData={mockUsersData} />);

		fireEvent.change(screen.getByPlaceholderText("Buscar"), {
			target: { value: "User_0f2a1bb4" },
		});

		await waitFor(() => {
			expect(
				screen.getByText("User_0f2a1bb4-97bd-4e87-bb30-f9f9cb021f42")
			).toBeInTheDocument();
		});
	});

	it("abre y cierra el modal correctamente", async () => {
		render(<Page usersData={mockUsersData} />);

		const findModalText = () =>
			screen.getByText(/Estás seguro de querer eliminar este usuario/i);

		expect(() => findModalText()).toThrow();

		fireEvent.click(screen.getAllByTestId("delete")[0]);

		await waitFor(
			() => {
				expect(findModalText()).toBeInTheDocument();
			},
			{ timeout: 3000 }
		);

		fireEvent.click(screen.getByText(/Cancelar/i));

		await waitFor(() => {
			expect(() => findModalText()).toThrow();
		});
	});

	it("navega correctamente a la página de un usuario al hacer clic", async () => {
		render(<Page usersData={mockUsersData} />);

		const firstUserRow = screen.getAllByTestId("user-row")[0];
		fireEvent.click(firstUserRow);

		await waitFor(() => {
			expect(mockRouter.push).toHaveBeenCalledWith(
				"/users/ec6db7c7-9834-4fc9-8e23-985112313951"
			);
		});
	});
});
