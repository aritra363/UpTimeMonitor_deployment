//create a users token

const createUserToken = async (phone, password) => {
  try {
    if (phone && password) {
      const requestObj = {
        phone,
        password,
      };
      const response = await fetch("/token", {
        method: "POST",
        body: JSON.stringify(requestObj),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return false;
      }
    }
  } catch {
    return false;
  }
};

export default createUserToken;
