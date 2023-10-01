import { observable } from "mobx";
import LoginStore from "./LoginStore";

type StoresType = {
	LoginStore: {
		isLogged: boolean;
		userInfo: {};
		setLogged: (isLogged: boolean) => void;
	};
	[key: string]: any;
};

const IndexStore = (): StoresType => ({
	LoginStore,
});

export default IndexStore;
