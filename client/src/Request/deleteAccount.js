//Create user data using token and phone no.

const deleteAccount = async (phone, token) => {
  try {
    const userResponse = await fetch(`https://aritrauptimemonitor.onrender.com/user?phone=${phone}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
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

export default deleteAccount;
