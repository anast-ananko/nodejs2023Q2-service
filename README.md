# Home Library Service

## Downloading

```
git clone https://github.com/anast-ananko/nodejs2023Q2-service.git
```

## Go to `home-library-service-part-2` branch

```
git checkout home-library-service-part-2
```

## Installing NPM modules

```
npm install
```

## Rename .env.example to .env

`.env` file contains variables

## Running application

The server and database are in containers hosted on Docker Hub.

To download the images from the Dcoker Hub and start the containers

```
docker-compose up
```

**The migration file is generated and located in `./src/database/migrations/1691328058022-migration.ts`. When containers are launched, migration is automatically launched (migrationsRun: true), these settings are in file `./src/typeorm.config.ts`**

You can verify that the migrations have been applied using pgAdmin and connecting to port 5433.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Stopping application

To stop containers

```
docker-compose down
```

## Vulnerabilities scanning

To scan server

```
npm run docker:scan:server
```

To scan database

```
npm run docker:scan:database
```

## Documentation

After starting the app on port (PORT=3000 in `.env` file) you can open
in your browser OpenAPI documentation by typing <http://localhost:3000/doc/>.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
