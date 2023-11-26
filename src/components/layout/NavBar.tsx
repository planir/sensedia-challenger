import Icon from "@/components/extras/icon";
import container from "@/styles/container.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Navbar = ({ authData, pageName }: { authData: IAuth, pageName: string }) => {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);

	const dataHeader = [
		{
			icon: "dribble-square",
			title: "Tipo de cancha",
			sub: "sociedad",
		},

		{
			icon: "align-left",
			title: "Nivel",
			sub: "semiprofesional",
		},

		{
			icon: "thropy",
			title: "Victorias",
			sub: "345",
		},
	];

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
	};

	const handleOutsideClick = (e: Event) => {
		const target = e.target! as HTMLDivElement;

		if (menuOpen && target.closest(".suffix") === null) {
			setMenuOpen(false);
		}
	};

	const handleEscKey = (e: KeyboardEvent) => {
		if (menuOpen && e.key === "Escape") {
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		document.addEventListener("keydown", handleEscKey);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [menuOpen]);

	return (
		<div className="nav-bar">
			<div className="bg-silver">
				<div className={`${container["navbar-container-space"]} p-6`}>
					<img
						src="/assets/images/logo.svg"
						alt="Sensedia Logo"
					/>
				</div>
			</div>

			<div
				className={` ${container["navbar-container-space"]} flex items-center py-4`}>
				<div className="flex items-center pl-6">
					<img
						src="/assets/images/icon.svg"
						alt="Sensedia icon"
					/>

					<p className="uppercase pl-2.5 mr-2.5 text-sm text-secondary font-bold">
						Bienvenido
					</p>

					<Icon icon="chevron-right"></Icon>

					<p className="ml-2.5 text-gray-75 font-medium text-base">{pageName}</p>
				</div>

				<div
					onClick={handleMenuClick}
					className="flex items-center relative ml-auto mr-10">
					<Icon
						icon="help"
						className="mr-4"></Icon>
					<Icon
						icon="apps"
						className="mr-10"></Icon>

					<div className="w-[1px] h-10 mr-4 bg-gray-25"></div>

					<div className="suffix bg-secondary w-10 h-10 flex items-center justify-center text-white font-medium rounded-full cursor-pointer">
						{authData?.suffix}
					</div>
					<p className="ml-2 text-gray-75 text-sm font-medium">
						{authData?.userName}
					</p>

					<div
						className={`absolute bg-silver left-28 top-12 w-48 ${
							menuOpen ? "" : "hidden"
						}`}>
						{authData?.menu.map((menu) => (
							<Link
								key={menu.path}
								href={menu.path}
								className="text-white pr-3 flex items-center py-1.5">
								<div
									className={
										"w-[4px] h-8 mr-2 rounded-tr-full rounded-br-full " +
										(menu.path === router.pathname &&
											"bg-primary")
									}></div>
								{menu.title}
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className="bg-secondary py-6 flex">
				<div className={`${container["container-space"]} flex`}>
					{dataHeader.map((elemento, index) => (
						<div
							className="flex mr-6"
							key={index}>
							<Icon icon={elemento.icon}></Icon>

							<div className="flex flex-col ml-3 justify-between h-100">
								<p className="text-base font-bold text-white leading-5">
									{elemento.title}
								</p>
								<p className="text-base text-white font-light leading-5">
									{elemento.sub}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
