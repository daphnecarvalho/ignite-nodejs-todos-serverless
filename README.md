# TODOs - Challenge: Building with serverless

Instruction: [Construindo com serverless](https://www.notion.so/Desafio-01-Construindo-com-serverless-1fdde2c717a94f7aa077e746cb077bec).

## Base URL
http://localhost:3000/dev

## Project commands
### Prepare project

```bash
    # Install dependencies
    yarn install

    # Docker - Create containers
    docker-compose up

    # Install dynamodb
    sls dynamodb install
```

### Run project

```bash
  # Docker - Start containers
  docker-compose start

  # Start DynamoDB
  yarn dynamodb:start

  # Run project
  yarn dev
```

### Prepare deploy

```bash
  # Remove items created before
  sls remove

  # Configure credentials
  serverless config credentials --provider aws --key=<Private Key> --secret <Secret Private Key> -o
```

### Deploy app

```bash
  # Run build
  yarn deploy
```