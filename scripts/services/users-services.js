import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function signUp( newUser = {email, password}){
  const {token, ...user} = await apiFetch("/signup", { body: newUser });
  console.log(token, user);
  sessionStorage.setItem(tokenKey, token);
  return user;
}
