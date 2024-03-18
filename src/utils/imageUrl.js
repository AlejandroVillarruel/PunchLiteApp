export const getAvatarUrl = (image) => {
  if (image) {
    return { uri: image };
  } else {
    return require("../assets/images/avatar.png");
  }
};
