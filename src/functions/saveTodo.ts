import { v4 as uuidV4 } from "uuid";

import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handle = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const { user_id } = event.pathParameters;

  const todo = await document.put({
    TableName: "users_todos",
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  console.log(todo);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: `Todo saved successfully`,
      todo
    }),
    headers: {
      "Content-Type": "application/json",
    }
  };
}