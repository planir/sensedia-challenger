import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Page, { getServerSideProps } from '@/pages/users/[user]';

jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "/user/[user]",
			pathname: "/user/[user]",
			query: { user: "user123" },
			asPath: "/user/user123",
			push: jest.fn(),
		};
	},
}));

jest.mock("./../src/http/user.front", () => ({
	UserClient: {
		getUserData: jest.fn(() =>
			Promise.resolve({
				name: "John Doe",
				email: "john@example.com",
				city: "Some City",
				days: "Monday, Tuesday",
				posts: [{ id: "1", content: "Post content 1" }],
				albums: [],
			})
		),
	},
}));

describe("User Page", () => {
	it("renders user data correctly", async () => {
		await act(async () => {
			const serverSideProps = await getServerSideProps({
				params: { user: "user123" },
			});

			render(<Page {...serverSideProps.props} />);
		});

		// Check if user data is rendered correctly
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
		expect(screen.getByText("Ciudad: Some City")).toBeInTheDocument();
		expect(
			screen.getByText("Días de la semana: Monday, Tuesday")
		).toBeInTheDocument();
		expect(screen.getByText("Cantidad de posts: 1")).toBeInTheDocument();
		expect(screen.getByText("Cantidad de albums: 0")).toBeInTheDocument();
	});

	it("handles case where user does not exist", async () => {
		// Mock the getUserData function to throw an error
		jest.spyOn(
			require("../src/http/user.front").UserClient,
			"getUserData"
		).mockImplementation(() => {
			throw new Error("User not found");
		});

		await act(async () => {
			const serverSideProps = await getServerSideProps({
				params: { user: "nonexistentuser" },
			});

			render(<Page {...serverSideProps.props} />);
		});

		// Check if the appropriate message is displayed for a nonexistent user
		expect(
			screen.getByText("El usuario seleccionado no existe.")
		).toBeInTheDocument();
	});
});
