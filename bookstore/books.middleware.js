const middleware = (req, res, next) => {
  const { title, author, category, publicationYear, price, quantity, description, imageUrl } = req.body;
  if (title && author && category && publicationYear && price && quantity && description && imageUrl) {
    next();
  }
  else {
    res.status(400).send("All fields are required.");
  }
};
module.exports = middleware;