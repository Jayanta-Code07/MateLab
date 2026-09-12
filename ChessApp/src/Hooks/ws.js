

import {io} from "socket.io-client";

export function connectws(){
    return io("http://localhost:8080");
}