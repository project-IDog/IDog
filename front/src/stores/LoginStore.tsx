import { observable } from "mobx";

const LoginStore = observable({
	isLogged: false,
	userInfo: {},
});

export default LoginStore;
