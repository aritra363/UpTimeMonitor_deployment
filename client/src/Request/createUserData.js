//Create user data using token and phone no.

const createUserData = async (Userdata) => {
  try {
    const userResponse = await fetch(`/user`, {
      method: "POST",
      body: JSON.stringify(Userdata),
    });
    if (userResponse.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default createUserData;
