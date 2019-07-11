function mock (data, t) {
  return new Promise((resolve, reject) => {
    t = t || Math.random() * 1500;
    setTimeout(resolve, t, data);
  });
};

export default {
  mock
}