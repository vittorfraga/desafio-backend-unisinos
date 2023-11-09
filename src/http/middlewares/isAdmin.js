const UnauthorizedPermissionError = require("../../services/errors/unauthorizedPermissionError");
const makeUserService = require("../../services/factories/makeUserService");

const isAdmin = async (req, res, next) => {
  const currentUserId = req.userId;
  try {
    const usersService = makeUserService();
    const user = await usersService.findById(currentUserId);

    if (!user || user.user_type_id !== 1) {
      throw new UnauthorizedPermissionError();
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
