module.exports = (fn) => {
  return (req, res, next) => {
    // Ensure we always have a Promise to work with
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};