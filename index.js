require('dotenv').config();
const server = require('./api/server.js');
const cors = require('cors');

const port = process.env.PORT || 5000;

server.use(cors());

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
});