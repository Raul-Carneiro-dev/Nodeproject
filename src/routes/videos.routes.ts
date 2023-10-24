import { Router } from 'express';
import { VideosRepository } from './modules/videos/repositories/VideosRepository';
import { login } from '../middleware/login';

const videosRoutes = Router();

const videosRepository = new VideosRepository;

videosRoutes.post('/create-video', login, (request, response) => {
    videosRepository.create(request, response);
})

videosRoutes.get('/get-videos/', (request, response) => {
    videosRepository.getVideos(request, response);
})

videosRoutes.get('/search', (request, response) => {
    videosRepository.searchVideos(request, response);
})

export { videosRoutes };