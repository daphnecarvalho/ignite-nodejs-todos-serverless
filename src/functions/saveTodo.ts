import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";

import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handle = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const { user_id } = event.pathParameters;

  const todo = {
    id: uuidV4(),
    user_id,
    title,
    done: false,
    deadline: dayjs(deadline).format("YYYY-MM-DD")
  }

  const response = await document.query({
    TableName: "users",
    KeyConditionExpression: "id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const user = response.Items[0];

  if (!user) {
    await document.put({
      TableName: "users",
      Item: {
        id: user_id,
        todos: [todo]
      }
    }).promise();
  } else {
    await document.put({
      TableName: "users",
      Item: {
        id: user_id,
        todos: [
          ...user.todos,
          todo
        ]
      }
    }).promise();
  }

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