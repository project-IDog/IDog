import {observable} from "mobx";

const LoginStore = observable({
    isLogged: true,
});

export default LoginStore;