import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";





@WebSocketGateway({
    cors:{
      origin: '*',
    },
  })
  export class TaskGateWay {

    @WebSocketServer()
    server: Server;






    
  }