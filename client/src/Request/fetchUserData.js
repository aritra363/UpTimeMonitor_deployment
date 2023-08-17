//fetch user data using token and phone no.

const fetchUserData = async (phone, token) => {
  try {
    const userResponse = await fetch(`https://aritrauptimemonitor.onrender.com/user?phone=${phone}`, {
      method: "GET",
      headers: {
        token: token,
      },
    });
    const userObj = await userResponse.json();
    if (userResponse.status === 200) {
      return userObj;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default fetchUserData;
