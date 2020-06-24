import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';


type MockPrice = {
  isin: string,
  price: number,
  bid: number,
  ask: number
}

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<MockPrice>> {
    return interval(1000).pipe(map(item => {
      console.log("fired")

      return ({
        event: 'events',
        data: { 'isin': 'DE000BASF111', 'price': 240.32, 'bid': 240.31, 'ask': 240.33 },
      });
    }));
  }
}