OBJECT RELATIONAL MAPPING
========
### deploy to production
```bash
# heroku git:remote -a istrav-api
$ git push heroku master
```

```bash
export AMQP_URI=""
export MONGODB_URI=""
export POSTGRESQL_URI=""
export SECRET=""
export AWS_ACCESS_KEY=""
export AWS_SECRET_KEY=""
```

```bash
git push
git tag
git tag v0.6
git push --tags
git push --delete origin v0.6
```