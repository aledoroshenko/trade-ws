import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { interval} from 'rxjs';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  subscription = {};

  @SubscribeMessage('events')
  onEvent(client: any, data: any):any {
    if(data.type === 'subscribe') {
      const isin = data.subscribe;

      console.log(`Subscribe to ${isin}`)
      this.subscription[isin] = interval(1000).subscribe((number) => {
        client.send(JSON.stringify({
          isin,
          price: 100 + number,
          bid: 100,
          ask: 100
        }));
      })
    }

    if (data.type === 'unsubscribe') {
      const isin = data.unsubscribe;

      console.log(`Unsubscribe from ${isin}`)
      this.subscription[isin].unsubscribe();
    }
  }
}