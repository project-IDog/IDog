import { observable, action } from "mobx";

const LoginStore = observable({
	isLogged: true,
	userInfo: {},
	setLogged: action(function (status: boolean) {
		this.isLogged = status;
	}),
});

export default LoginStore;
