import { get, post } from "./httptow.js";

export const gets = (url, m) => get(url, m);
export const posts = (url, m) => post(url, m);