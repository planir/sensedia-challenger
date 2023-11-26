import React from "react";

const Icon = ({
	icon,
	className,
	onClick,
}: {
	icon: string;
	className?: string;
	onClick?: any;
}) => {
	return (
		<img
			className={className}
			onClick={onClick}
			src={`/assets/icons/${icon}.svg`}
			alt={`${icon} icon`}
		/>
	);
};

export default Icon;
