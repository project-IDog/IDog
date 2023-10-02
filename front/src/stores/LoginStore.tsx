import { observable, action } from "mobx";

const LoginStore = observable({
	isLogged: false,
	userInfo: {},
	setLogged: action(function (status: boolean) {
		this.isLogged = status;
	}),
});

export default LoginStore;
