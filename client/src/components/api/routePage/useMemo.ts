import { useMemo } from "react";
import { useHistory } from "react-router";

const useRoutes = () => {
	const history = useHistory();

	const methods = useMemo(
		() => ({
			logout() {
				localStorage.clear();
				history.push("/");
			}
		}),
		[history]
	);

	return useMemo(
		() => ({
			...methods
		}),
		[methods]
	);
};

export default useRoutes;

