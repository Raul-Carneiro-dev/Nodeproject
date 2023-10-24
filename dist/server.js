"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const videos_routes_1 = require("./routes/videos.routes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_routes_1.userRoutes);
app.use('/videos', videos_routes_1.videosRoutes);
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
