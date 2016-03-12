export default function loggerMiddleware(req, res, next) {
  const { path } = req;

  console.log(`Request made to ${path}`);
  next();
}
