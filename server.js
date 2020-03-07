const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Other routes here.


app.listen(port, () => console.log(`Matchfox listening on port ${port}`));