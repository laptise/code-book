import { another } from "./called";

export const app = () => {
  console.log(1);
};

export const app2 = () => {
  another();
};
