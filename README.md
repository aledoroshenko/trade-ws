# Trade-ws

Backend part for [Trade](https://github.com/aledoroshenko/trade). NestJS server with Websockets (with `ws`) which listens to `events` to subscribe and unsubscribe for feed of mock assets prices. Server publish prices with the help of `Obserbable`.

### Subscribe (with native Websockets)

```javascript
this.websocket.send(
  JSON.stringify({
    event: "events",
    data: { type: "subscribe", subscribe: isin }
  })
);
```

### Unsubscribe

```javascript
this.websocket.send(
  JSON.stringify({
    event: "events",
    data: { type: "unsubscribe", unsubscribe: isin }
  })
);
```

### Publishing server part

```typescript
@SubscribeMessage('events')
onEvent(client: any, data: any):void { 
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
```
