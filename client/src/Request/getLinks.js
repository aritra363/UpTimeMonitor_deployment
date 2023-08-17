//fetch Linksusing token and checkid

const getLinks = async (id, token) => {
  try {
    const userResponse = await fetch(`https://aritrauptimemonitor.onrender.com/check?checkid=${id}`, {
      method: "GET",
      headers: {
        token: token,
      },
    });
    const checkObj = await userResponse.json();
    if (userResponse.status === 200) {
      return checkObj;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default getLinks;
