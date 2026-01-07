import type { Server } from "http";
import app from "./App";
import config from "../config";


const PORT = config.port_number || 5000;
let server:Server;

const main = () => {
    server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

}

main();