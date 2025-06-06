const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.use(apiRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port);
});
