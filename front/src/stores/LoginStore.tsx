import {observable} from "mobx";

const LoginStore = observable({
    isLogged: true,
    userInfo: {},
});

export default LoginStore;