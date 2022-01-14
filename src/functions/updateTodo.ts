import { document } from "../utils/dynamodbClient";
import dayjs from "dayjs";

interface IUpdateTodo {
  title: string;
  deadline: Date;
}

export const handle = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as IUpdateTodo;

  const { todo_id, user_id } = event.pathParameters;

  try {
    const response = await document.query({
      TableName: "users",
      KeyConditionExpression: "id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id
      }
    }).promise();

    const user = response.Items[0];

    if (!user) {
      throw new Error("User not found");
    }

    if (user.todos.length <= 0) {
      throw new Error("Todo not found");
    }

    const todo = user.todos.find(todo => todo.id === todo_id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    user.todos.map((todo) => {
      if (todo.id === todo_id) {
        if (title) {
          todo.title = title;
        }

        if (deadline) {
          todo.deadline = dayjs(deadline).format("YYYY-MM-DD");
        }
        return true;
      }

      return false;
    });

    await document.put({
      TableName: "users",
      Item: {
        id: user_id,
        todos: user.todos
      }
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: `Todo updated successfully`,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: err.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}