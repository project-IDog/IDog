import * as SecureStore from "expo-secure-store";
import IndexStore from "../stores/IndexStore";

export const logout = async () => {
	const stores = IndexStore();
	stores.LoginStore.setLogged(false);
	await SecureStore.deleteItemAsync("accessToken");
	await SecureStore.deleteItemAsync("refreshToken");
	for (let key in stores) {
		stores[key] = {};
	}
};
