//check user token

const checkUserToken = async (token) => {
  if (token) {
    const response = await fetch("/token", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    let data = await response.json();
    if (response.status === 200 && data.tokenExp > Date.now()) {
      return data;
    } else {
      return false;
    }
  }
};
export default checkUserToken;
