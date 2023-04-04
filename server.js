const express = require('express');
const router = require('./routes');

const app = express();
const port = +process.env.PORT || 5000;

app.use('/status', router);
app.use('/stats', router);
app.use('/users', router);
app.use('/connect', router);
app.use('/disconnect', router);
app.use('/users/me', router);
app.use('/files', router);
app.use('/files/:id', router);
app.use('/files', router);
app.use('/files/:id/publish', router);
app.use('/files/:id/unpublish', router);
app.use('/files/:id/data', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
