import { useState, type ReactElement, useMemo, useEffect } from "react";
import type { NextPageWithLayout } from "./_app";
import RootLayout from "@/layouts/root";
import input from "@/styles/input.module.css";
import { UserClient } from "@/http/user.front";
import { UserClient as UserClientB } from "@/http/user";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Pagination from "@/components/extras/pagination";
import Icon from "@/components/extras/icon";
import Modal from "@/components/extras/modal";
import { useRouter } from "next/router";

export const getServerSideProps = (async () => {
	const usersData = await UserClient.getAllUsers();

	return { props: { usersData, pageName: "Lista de usuarios" } };
}) satisfies GetServerSideProps<{
	usersData: IPagination<IUser>;
	pageName: string;
}>;

const Page: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ usersData }) => {
	let searchTimeout: NodeJS.Timeout;

	const router = useRouter();

	const [selectedUser, setSelectedUser] = useState("");
	const [localUsersData, setLocalUsersData] = useState(usersData);
	const [search, setSearchText] = useState("");
	const [isModalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const pagination = useMemo(
		() => localUsersData.pagination,
		[localUsersData]
	);

	const updateResults = async (page: number | string, search?: string) => {
		setLocalUsersData(await UserClient.getAllUsers(page, search));
	};

	const onPageChange = async (page: number) => updateResults(page, search);

	const debouncedUpdateResults = async () => {
		if (searchTimeout) clearTimeout(searchTimeout);

		searchTimeout = setTimeout(async () => updateResults(1, search), 300);
	};

	const removeUser = async (id: string) => {
		await UserClientB.removeUser(id);
		await updateResults(pagination.currentPage, search);
	};

	useEffect(() => {
		debouncedUpdateResults();

		return () => {
			if (searchTimeout) clearTimeout(searchTimeout);
		};
	}, [search]);

	return (
		<div>
			{isModalOpen && (
				<Modal
					content="¿Estás seguro de querer eliminar este usuario?"
					closeModal={handleCloseModal}
					handleAction={() => removeUser(selectedUser)}
				/>
			)}
			<p className="text-2xl font-medium mt-3">Usuarios</p>

			<div className="mt-14 mb-14 relative">
				<input
					className={`${input["text-input"]}`}
					id="username"
					type="text"
					placeholder="Buscar"
					onChange={(e) => setSearchText(e.target.value)}
				/>

				<Icon
					className="absolute top-3.5 right-4"
					icon="search"></Icon>
			</div>

			<div className="relative overflow-x-auto mb-9">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-t border-gray-25">
						<tr>
							<th
								scope="col"
								className="px-3 py-3 text-gray-high">
								Usuario
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-gray-high">
								Nombre
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-gray-high">
								Correo electrónico
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-gray-high">
								Ciudad
							</th>

							<th
								scope="col"
								className="px-3 py-3 text-gray-high">
								Días de la semana
							</th>

							<th
								scope="col"
								className="px-3 py-3 text-gray-high">
								Posts
							</th>

							<th
								scope="col"
								className="px-6 py-3 text-gray-high">
								Albums
							</th>
						</tr>
					</thead>

					<tbody>
						{localUsersData.data.map((el) => (
							<tr
								data-testid="user-row"
								className="bg-white border-b border-gray-25 relative group cursor-pointer"
								onClick={() => router.push("/users/" + el.id)}
								key={el.id}>
								<th
									scope="row"
									className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-silver max-w-[120px] overflow-hidden text-ellipsis">
									{el.name}
								</th>

								<td className="px-3 py-4 text-gray-75 whitespace-nowrap max-w-[140px] overflow-hidden text-ellipsis">
									{el.fullName}
								</td>
								<td
									className="px-3 py-4 text-gray-75 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis"
									title={el.email}>
									{el.email}
								</td>
								<td
									className="px-3 py-4 text-gray-75 whitespace-nowrap max-w-[140px] overflow-hidden"
									title={el.city}>
									{el.city}
								</td>
								<td className="px-3 py-4 max-w-[240px] text-gray-75">
									{el.days.join(", ")}
								</td>
								<td className="px-3 py-4 text-gray-75 text-center">
									{el.posts.length}
								</td>
								<td className="px-3 py-4 text-gray-75 text-center">
									{el.albums.length}
								</td>
								<td
									data-testid="delete"
									className="px-3 absolute right-0 hidden group-hover:flex cursor-pointer items-center h-full"
									onClick={(e) => {
										e.stopPropagation()
										setSelectedUser(el.id);
										handleOpenModal();
									}}>
									<Icon icon="trash"></Icon>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<Pagination
					pagination={pagination}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <RootLayout>{page}</RootLayout>;
};

export default Page;
