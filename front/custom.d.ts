declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.jpg" {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: any;
	export default content;
}

declare module "@env" {
	export const AWS_ACCESS_KEY: string;
	export const AWS_SECRET_ACCESS_KEY: string;
	export const AWS_REGION: string;
	export const AWS_BUCKET: string;
	export const WEB_CLIENT_ID: string;
	export const ANDROID_CLIENT_ID: string;
	export const NFT_STORAGE_KEY: string;
	export const sentry_dsn: string;
}
