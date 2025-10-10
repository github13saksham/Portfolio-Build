import { SignIn } from "@clerk/clerk-react";

function signin() {
	return (
		<div className="flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen">
			<SignIn />
		</div>
	);
}

export default signin;
