const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (reguest, response) => {
    response.json({name: 'Raul', age: 23});
})

app.listen(4000);