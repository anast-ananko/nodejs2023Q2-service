# Home Library Service

## Downloading

```
git clone https://github.com/anast-ananko/nodejs2023Q2-service.git
```

## Go to develop branch

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Rename .env.example to .env

`.env` file contains variable PORT

## Running application

```
npm start
```

## Documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/doc/>.


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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
