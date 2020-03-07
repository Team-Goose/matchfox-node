const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Matchfox coming soon!');
});


// Other routes here.


app.listen(port, () => console.log(`Matchfox listening on port ${port}`));