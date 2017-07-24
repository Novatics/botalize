module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Welcome to the Index Route');
  });
  // API.AI webhook route
  app.post('/webhook/apiai/', function(req, res) {
    
    // Your code for different actions sent by API.AI
    res.status(200).json('Sucessfull');

    // Save User to MongoDB
    saveUser(req.body.originalRequest.data.sender.id);
  });
}
