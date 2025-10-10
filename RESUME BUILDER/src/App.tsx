import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function App() {
	const { isLoaded, isSignedIn } = useUser();

	// If not signed in, redirect to /auth
	if (!isSignedIn && isLoaded) {
		return <Navigate to={"/auth"} />;
	}

	return <Outlet />;
}

export default App;
