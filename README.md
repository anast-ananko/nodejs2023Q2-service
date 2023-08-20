# Home Library Service

## Downloading

```
git clone https://github.com/anast-ananko/nodejs2023Q2-service.git
```

## Go to `home-library-service-part-3` branch

```
git checkout home-library-service-part-3
```

## Installing NPM modules

```
npm install
```

## Rename .env.example to .env

`.env` file contains variables

## Running application

```
npm run start
```

Also the server and database are in containers hosted on Docker Hub.

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
npm run test:auth
```

To run only one of all test suites

```
npm run test:auth -- <path to suite>
```

## Logging

If the application runs outside the container, all logs are written to the folder `./logs/`.

The maximum file size is specified in .env file in variable `MAX_LOG_FILE_SIZE`. When a file reaches its maximum size, it is renamed and the logs are written to another file.

Logs with errors are written to a separate file `.logs/error.log` (in addition to logging into a common file).

**Attention!** When the application is running inside a container, all logs are added to volume with name `logs`.

**Logging levels.** The .env file contains a variable `LOG_LEVEL`. The default number is 2. Logging levels:
 - Level 3. Messages of levels VERBOSE, LOG, WARN, ERROR are logged.
 - Level 2. Messages of levels LOG, WARN, ERROR are logged.
 - Level 1. Messages of levels WARN and ERROR are logged.
 - Level 0. Only ERROR level messages are logged.

## Refresh route

A refresh token is sent in the request body

```
{
  "refreshToken": "<refresh_token>"
}
```

The access token must also be sent in the header 

```
Authorization: Bearer <access_token>
```

If both tokens are valid, 2 new tokens are received in the request body

```
{
  "accessToken": "<new_access_token>",
  "refreshToken": "<new_refresh_token>"
}
```

## Stopping containers

To stop containers

```
docker-compose down
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
