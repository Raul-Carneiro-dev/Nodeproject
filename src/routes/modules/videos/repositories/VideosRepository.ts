import { pool } from '../../../../mysql';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { Request, Response } from 'express';


class VideosRepository {
    create(request: Request, response: Response) {
        const { user_id, title, views, time } = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'INSERT INTO videos (video_id, user_id, title, views, time) VALUES (?,?,?,?,?)',
                [uuidv4(), user_id, title, views, time],
                (error: any, result: any, fileds: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({ message: 'Video criado com sucesso' })
                }
            )
        })
    }

    getVideos(request: Request, response: Response) {
        const {user_id} = request.query;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],
                (error: any, results: any, fileds: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({ error: 'Erro ao buscar os videos' })
                    }

                    return response.status(200).json({ message: 'Videos retornados com sucesso', videos: results})
                }
            )
        })
    }

    searchVideos(request: Request, response: Response) {
        const {search} = request.query;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE title LIKE ?',
                [`%${search}%`],
                (error: any, results: any, fileds: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({ error: 'Erro ao buscar os videos' })
                    }

                    return response.status(200).json({ message: 'Videos retornados com sucesso', videos: results})
                }
            )
        })
    }
}

export { VideosRepository };