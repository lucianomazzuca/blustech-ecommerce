function checkAdmin(req, res, next) {
  if (req.user.isAdmin === false) {
    res.sendStatus(403);
  } else {
    next()
  }
}

module.exports = checkAdmin;