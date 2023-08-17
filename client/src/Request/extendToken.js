//extend user token

const extendToken = async (token) => {
  if (token) {
    const tokenExtend = {
      id: token,
      extend: true,
    };
    const response = await fetch("/token", {
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
