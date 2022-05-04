# Fruti-shop

## Setup
1. Install dependencies (this example uses *yarn*).
2. Run the application
```bash
yarn start
```
3. Got to `localhost:3000`

## Run with Docker
You can run
```bash
docker compose up -d
```
and take a look at **localhost:8500**, or you can build image manually:
```bash
docker build -t fruti-shop .
docker run --rm -p 8500:80 fruti-shop
```

*Don't forget to stop & delete containers.