import { makeAutoObservable } from "mobx";

class TokenStore {
	accessToken: string | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	// 액션: 액세스 토큰 설정
	setAccessToken(token: string) {
		this.accessToken = token;
	}

	// 액션: 액세스 토큰 제거
	removeAccessToken() {
		this.accessToken = null;
	}
}

const tokenStore = new TokenStore();
export default tokenStore;
