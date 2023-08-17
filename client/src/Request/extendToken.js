//extend user token

const extendToken = async (token) => {
  if (token) {
    const tokenExtend = {
      id: token,
      extend: true,
    };
    const response = await fetch("https://aritrauptimemonitor.onrender.com/token", {
      method: "PUT",
      body: JSON.stringify(tokenExtend),
      mode: "cors",
    });
    let data = await response.json();
    if (response.status === 200) {
      return data.TokenValidUpto;
    } else {
      return data;
    }
  }
};
export default extendToken;
