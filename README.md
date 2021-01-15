OBJECT RELATIONAL MAPPING
========
### getting started
chart:
- javascript API     channels   svelte.js  // frontend to channels
- node.js    socket  channels   phoenix.js // channels to cqrs
- elixir     socket  phoenix    AMQP       // cqrs to rabbitmq
- node.js    REST    endpoints  AMQP       // rabbitmq to request
- node.js    REST    routes     express.js // request to backend
- node.js    API     lib        express.js // backend to event source

### begin
```bash
$ cd ./prisma
$ npx prisma generate
```

### developer documents
make changes at `schema.prisma` then run `npx prisma migrate dev --preview-feature`