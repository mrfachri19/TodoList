import axios from "axios";

const fullURL = (path) => {
  return `https://todo.api.devcode.gethired.id/${path}`;
};

const fullURLLogin = (path) => {
  return `https://db.cdbethesda.space/${path}`;
};
export const handleNetworkError = (error) => {
  if (error.message === "Network request failed") {
    alert(
      "Kesalahan Jaringan",
      "Silakan periksa koneksi Anda dan coba kembali.",
      "iconNoInet"
    );
  }
  throw error;
};

const post = (api) => async (data) => {
  return await axios.post(fullURL(api), data, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  });
};
const postLogin = (api) => async (data) => {
  return await axios.post(fullURLLogin(api), data, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  });
};
// const patch =
//   (api) =>
//   async (param = "", data) => {
//     try {
//       return await axios.patch(
//         `${fullURL(api)}${param}`,
//         data,
//         {
//           method: "PATCH",
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-type": "application/json",
//             // "X-Authorization": `bearer ${localStorage.getItem("acces_token")}`,
//             // Authorization: `bearer ${localStorage.getItem("token_apim")}`
//           },
//         },
//         { handleNetworkError }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

const get =
  (api) =>
  async (param = "") => {
    try {
      return await axios(
        `${fullURL(api)}${param}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
        },
        { handleNetworkError }
      );
    } catch (err) {
      console.log(err);
    }
  };

const del =
  (api) =>
  (param = "") => {
    return axios.delete(`${fullURL(api)}${param}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    });
  };

export const getAllActivity = get("activity-groups");
export const getActivitybyid = get("activity-groups");
export const delActivity = del("activity-groups");
export const postActivity = post("activity-groups");
export const postTodo = post("todo-items");
export const deleteTodo = del("todo-items");
export const postLoginAuth = postLogin("auth/login");

const API = {
  getAllActivity,
  getActivitybyid,
  postActivity,
  delActivity,

  postLoginAuth,

  postTodo,
  deleteTodo,
};

export default API;
