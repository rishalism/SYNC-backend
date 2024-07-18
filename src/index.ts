import { app } from "./infrasctructure/config/app";
import { httpserver } from "./infrasctructure/config/app";
import connectDb from "./infrasctructure/config/db";

(function startServer(): void {
    const port = process.env.PORT

    app.get('/', (req, res) => {
        res.send('hello world !')
    })

    httpserver.listen(port, () => {
        console.log(`server is running on ${port}`);
        connectDb()

    })
})()