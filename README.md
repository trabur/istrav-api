OBJECT RELATIONAL MAPPING
========
github:
- https://github.com/trabur/object-relational-mapping   // backend: node.js
- https://github.com/trabur/channels                    // backend: elixir
- https://github.com/trabur/printedbasics               // frontend: services = gallery, forums, members, etc...
- https://github.com/trabur/dimension                   // frontend: platform = counter, ping, & cron
- https://github.com/trabur/metaheap                    // frontend: platform = publishSubscribe
- https://github.com/trabur/farmerless                  // frontend: platform = schedule
- https://github.com/trabur/tyu67                       // frontend: platform = leaderElection
- https://github.com/trabur/burnfort                    // frontend: platform = accounts, directMessage, keyValue, & cryptoKeyValue

### begin
```bash
$ cd ./prisma
$ npx prisma generate
```

### production goals
> elixir production: https://printedbasics.gigalixirapp.com/
> node.js production: http://app.printedbasics.com
> node.js production: http://localhost:3000

consensus RAFT between multiple node.js apps:
- https://github.com/unshiftio/liferaft

access Prisma commands over Phoenix channels:
- https://github.com/prisma/prisma
- https://hexdocs.pm/phoenix/js/#phoenix

Usernames and Passwords sync with Postgresql:
- https://www.npmjs.com/package/pbkdf2
- https://jwt.io/


### developer documents
make changes at `schema.prisma` then run `npx prisma migrate dev --preview-feature`