import {observable} from "mobx";

const LoginStore = observable({
    isLogged: false,
});

export default LoginStore;