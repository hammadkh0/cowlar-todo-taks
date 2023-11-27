import { toastError, toastSuccess } from "../utils/toastMessages";

export async function login(url, email, password) {
  try {
    const res = await fetch(`${url}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });
    const data = await res.json();
    if (data.status === "fail") {
      toastError(data.message);
      return null;
    }
    toastSuccess("Login Successful");
    return data;
  } catch (err) {
    toastError(err.message);
    return null;
  }
}

export async function signup(url, name, email, password, imagePreview) {
  try {
    const res = await fetch(`${url}/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name, email, password, image: imagePreview }),
      mode: "cors",
    });

    const data = await res.json();
    if (data.status === "fail") {
      toastError(data.message);
      return null;
    }
    toastSuccess("Signup Successfull");
    return data;
  } catch (err) {
    toastError(err.message);
    return false;
  }
}
