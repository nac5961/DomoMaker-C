// Import custom files
const controllers = require('./controllers');

// Setup routing for requests
const router = (app) => {
	// GET
  app.get('/', controllers.Account.loginPage);
  app.get('/login', controllers.Account.loginPage);
  app.get('/signup', controllers.Account.signupPage);
  app.get('/logout', controllers.Account.logout);
  app.get('/maker', controllers.Domo.makerPage);

	// POST
  app.post('/login', controllers.Account.login);
  app.post('/signup', controllers.Account.signup);
  app.post('/maker', controllers.Domo.make);
};

// Export the function to use in app.js
module.exports = router;
