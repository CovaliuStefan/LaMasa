import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
	cartCount: number;
	onCartClick: () => void;
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
	const location = useLocation();

	const isActive = (path: string) =>
		location.pathname === path
			? "underline underline-offset-4"
			: "hover:underline hover:underline-offset-4";

	return (
		<header
			className="shadow z-50 border-b border-black/10"
			style={{ backgroundColor: "rgb(204, 102, 0)" }}
		>
			<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-white">
				<div className="flex-1 flex items-center">
					<div className="flex-1">
						<Link to="/" className="hidden md:block">
							<img
								src="/logo.png"
								alt="La Masa logo"
								className="h-[7vh] object-contain"
							/>
						</Link>

						<Link to="/" className="md:hidden">
							<img
								src="/logo-small.png"
								alt="La Masa logo"
								className="h-8"
							/>
						</Link>
					</div>

				</div>



				<nav className="flex gap-6 text-sm md:text-base justify-center">
					<Link to="/" className={isActive("/")}>
						Home
					</Link>
					<Link to="/menu" className={isActive("/menu")}>
						Menu
					</Link>
				</nav>

				<div className="flex-1 flex justify-end">
					<button
						onClick={onCartClick}
						className="relative text-white px-3 py-1.5 text-xl rounded-full"
					>
						🛒
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-2 py-0.5">
								{cartCount}
							</span>
						)}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
