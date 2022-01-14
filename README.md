# TODOs - Challenge: Building with serverless

Instruction: [Construindo com serverless](https://www.notion.so/Desafio-01-Construindo-com-serverless-1fdde2c717a94f7aa077e746cb077bec).

## Base URL
http://localhost:3000/dev

## Functions

* [<span style="color:#663399">GET</span>] /todos/{user_id}
* [<span style="color:#79c900">POST</span>] /todos/{user_id}

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
  yarn dynamo:start

  # Run project
  yarn dev
```