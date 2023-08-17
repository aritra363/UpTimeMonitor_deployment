//delete link using id and token

const deleteLink = async (linkId, token) => {
  try {
    const userResponse = await fetch(`https://aritrauptimemonitor.onrender.com/check?id=${linkId}`, {
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

export default deleteLink;
