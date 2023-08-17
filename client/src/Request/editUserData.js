//Edit user data using token and phone no.

const editUserData = async (Userdata, token) => {
  try {
    const userResponse = await fetch(`https://aritrauptimemonitor.onrender.com/user`, {
      method: "PUT",
      body: JSON.stringify(Userdata),
      headers: {
        token: token,
      },
    });
    if (userResponse.status === 200) {
      return true;
    } else {
      console.log(typeof Userdata.phone);
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default editUserData;
