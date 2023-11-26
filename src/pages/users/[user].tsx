import { type ReactElement } from "react";
import RootLayout from "@/layouts/root";
import { NextPageWithLayout } from "../_app";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { UserClient } from "@/http/user.front";

export const getServerSideProps = (async (context) => {
	const { params } = context;

	try {
		const user = await UserClient.getUserData(params!.user as string);

		return { props: { user, pageName: user.name } };
	} catch (e) {
		return {
			props: {
				user: {} as IUserDetailed,
				pageName: "Usuario no encontrado",
			},
		};
	}
}) satisfies GetServerSideProps<{ user: IUserDetailed; pageName: string }>;

const Page: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
	if (!Object.keys(user).length)
		return (
			<div className="mt-10">
				<Link
					className="underline"
					href="/">
					Regresar
				</Link>
				<p className="mt-1 text-xl font-medium">
					El usuario seleccionado no existe.
				</p>
			</div>
		);

	return (
		<div className="pt-4">
			<Link
				className="underline"
				href="/">
				Regresar
			</Link>

			<div className="flex mt-6 items-start">
				<img
					src="/assets/images/user.png"
					width="128"
					alt=""
				/>
				<div className="flex-1 pl-10 pt-2">
					<p className="text-2xl text-gray-100">{user.name}</p>
					<p className="text-gray-100">{user.email}</p>

					<p className="mt-6 text-lg font-medium text-silver">
						Ciudad: {user.city}
					</p>
					<p className="text-lg font-medium text-silver">
						Días de la semana: {user.days}
					</p>
					<p className="text-lg font-medium text-silver">
						Cantidad de posts: {user.posts.length}
					</p>
					<p className="text-lg font-medium text-silver">
						Cantidad de albums: {user.albums.length}
					</p>
				</div>
			</div>

			<p className="text-3xl font-medium text-silver my-10">Posts</p>

			<div className="grid grid-cols-3 gap-10">
				{user.posts.map((post) => (
					<div className="flex mb-10" key={post.id}>
						<div className="max-w-sm rounded overflow-hidden shadow-lg">
							<img
								className="w-full"
								src="/assets/images/card-top.jpg"
								alt="Sunset in the mountains"
							/>
							<div className="px-6 py-4">
								<div className="font-bold text-xl mb-2">
									#{post.id}
								</div>
								<p className="text-gray-700 text-base">
									{post.content}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <RootLayout>{page}</RootLayout>;
};

export default Page;
