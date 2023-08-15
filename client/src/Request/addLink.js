//Create link data using token and phone no.

const addLink = async (linkData, token) => {
  try {
    const userResponse = await fetch(`/check`, {
      method: "POST",
      body: JSON.stringify(linkData),
      headers: {
        token: token,
      },
    });
    if (userResponse.status === 200) {
      const result = await userResponse.json();
      return result["checkObj"].id;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default addLink;
