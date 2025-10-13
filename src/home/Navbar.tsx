// import { Link } from "react-router-dom";
// import { UserButton, useUser } from "@clerk/clerk-react";
// import Lightmode from "./Lightmode";

// function Navbar() {
// 	const { isSignedIn } = useUser();

// 	return (
// 		<nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center z-20">
// 			<div className="text-2xl font-bold text-blue-600">
// 				<Link to="/">My Resume Builder</Link>
// 			</div>

// 			<ul className="flex space-x-6 items-center text-gray-700 font-medium">
// 				<li>
// 					<Link to="/dashboard" className="hover:text-blue-600">
// 						Dashboard
// 					</Link>
// 				</li>
// 				<li>
// 					<Link to="/Nav-bar components" className="  hover:text-blue-600">
// 						My Resume
// 					</Link>
// 				</li>
// 				<Lightmode />

// 				<li>
// 					{isSignedIn ? (
// 						<UserButton />
// 					) : (
// 						<Link
// 							to="/auth"
// 							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
// 						>
// 							Sign In / Sign Up
// 						</Link>
// 					)}
// 				</li>
// 			</ul>
// 		</nav>
// 	);
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import Lightmode from "./Lightmode";

function Navbar() {
	const { isSignedIn } = useUser();

	return (
		<nav
			className="
        bg-white shadow-md py-4 px-8 flex justify-between items-center z-20
        dark:bg-black dark:border-b dark:border-cyan-400 
        dark:shadow-[0_0_12px_#00f7ff]
      "
		>
			{/* Logo */}
			<div className="text-2xl font-bold text-blue-600 dark:text-cyan-200 dark:drop-shadow-blue-950">
				<Link to="/">My Resume Builder</Link>
			</div>

			{/* Links */}
			<ul className="flex space-x-6 items-center text-gray-700 font-medium dark:text-gray-200">
				<li>
					<Link to="/" className="hover:text-blue-600 dark:hover:text-cyan-300">
						Home
					</Link>
				</li>

				<li>
					<Link
						to="/home/chat-bot"
						className="hover:text-blue-600 dark:hover:text-cyan-300"
					>
						Suggestions
					</Link>
				</li>

				<li>
					<Link
						to="/dashboard"
						className="hover:text-blue-600 dark:hover:text-cyan-300"
					>
						Dashboard
					</Link>
				</li>
				<li>
					<Link
						to="/Nav-bar components"
						className="hover:text-blue-600 dark:hover:text-cyan-300"
					>
						My Resume
					</Link>
				</li>

				{/* Light/Dark Toggle */}
				<Lightmode />

				{/* Auth */}
				<li>
					{isSignedIn ? (
						<UserButton />
					) : (
						<Link
							to="/auth"
							className="
                px-4 py-2 bg-blue-600 text-white rounded 
                hover:bg-blue-700 transition 
                dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-[0_0_8px_#00f7ff]
              "
						>
							Sign In / Sign Up
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
