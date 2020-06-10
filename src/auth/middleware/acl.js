'use strict';


module.exports = (capability) => {//when the middleware has an arg
  // capability == "create" || 'update' || 'delete
  return (req, res, next) => {
    // we are expecting the bearerAuth middleware to add the user on the req
    // we need to find the user capabilities
    // req.user.capabilities = Array of capabilities regarding the role
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied!!');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};
  