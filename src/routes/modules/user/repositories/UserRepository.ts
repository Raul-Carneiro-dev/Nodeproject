import { pool } from '../../../../mysql';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';


class UserRepository {
    create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        pool.getConnection((err: any, connection: any) => {
            hash(password, 10, (err, hash) => {
                if (err) {
                    return response.status(500).json(err)
                }

                connection.query(
                    'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                    [uuidv4(), name, email, hash],
                    (error: any, result: any, fileds: any) => {
                        connection.release();
                        if (error) {
                            return response.status(400).json(error)
                        }
                        response.status(200).json({ message: "Usuario criado com sucesso" })
                    }
                )
            })
        })
    }

    login(request: Request, response: Response) {
        const {email, password} = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error: any, results: any, fileds: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({ error: "Erro no seu email" })
                    }

                    compare(password, results[0].password, (err, result) => {
                        if (err) {
                            return response.status(400).json({ error: "Erro na sua senha" })
                        }

                        if (result) {
                            const token = sign({
                                id: results[0].user_id,
                                email: results[0].email
                            }, process.env.SECRET as string, { expiresIn: "1d" })

                            return response.status(200).json({ token: token, message: "Autenticado com sucesso" })
                        }
                    })
                }
            )
        })
    }

    getUser(request: Request, response: Response) {
        if (!request.headers.authorization) {
            return response.status(401).send({
                error: "Authorization header missing",
                response: null
            });
        }
        const decode: any = verify(request.headers.authorization, process.env.SECRET as string);
        if (decode.email) {
            pool.getConnection((err: any, connection: any) => {
                connection.query(
                    'SELECT * FROM users WHERE email = ?',
                    [decode.email],
                    (error: any, results: any, fileds: any) => {
                        connection.release();
                        if (error) {
                            return response.status(400).send({
                                error: error,
                                response: null
                            })
                        }

                        return response.status(201).send({
                            user: {
                                nome: results[0].name,
                                email: results[0].email,
                                id: results[0].user_id,
                            }
                        })
                    }
                )
            })
        }
    }
}

export { UserRepository };