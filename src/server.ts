import express from 'express'
import { userRoutes } from './routes/user.routes';
import { videosRoutes } from './routes/videos.routes';
import { config } from 'dotenv';
config()
const app = express();

const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(cors());

// Middleware

app.use(express.json());
app.use('/user', userRoutes)
app.use('/videos', videosRoutes)


// app.get('/users', (request, response) => {
//     response.json([{name: 'Raul', age: 23 }, {name: 'Gabi', age: 21}])
// })

// app.post('/userdata/:id/:email/:height', (request, response) => {
//     console.log(request.params)
//     console.log(request.query)
//     console.log(request.headers)
//     console.log(request.body)
//     response.status(200).json({sucess: true})
// })

app.listen(4000);