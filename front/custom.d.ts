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
}
