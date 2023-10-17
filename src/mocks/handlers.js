// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    rest.post('/login', async (req, res, ctx) => {
        const { email, password, rememberMe } = await req.json()

        // For security don't say what is wrong.
        if (email !== "hello@edited.com" || password !== "hello123") {
            return res(ctx.status(401), ctx.json({ message: "Invalid email address or password" }));
        }

        return res(ctx.status(200), ctx.json({ email }));
    }),
]