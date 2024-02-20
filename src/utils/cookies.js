import Cookies from "js-cookie";

export const _setCookie = (name, value, expiresIn) => {
  return Cookies.set(name, JSON.stringify(value), { expires: expiresIn });
};

export const _getCookie = (name) => {
  if (Cookies.get(name)) {
    const value = JSON.parse(Cookies.get(name));
    return value;
  }
  return null;
};

export const _removeCookie = (name) => {
  return Cookies.remove(name);
};
