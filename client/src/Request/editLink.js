//Edit Link using token

const editLink = async (id, linkData, token) => {
  try {
    const userResponse = await fetch(`https://aritrauptimemonitor.onrender.com/check?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(linkData),
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

export default editLink;
