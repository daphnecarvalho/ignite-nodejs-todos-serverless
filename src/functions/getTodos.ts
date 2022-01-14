import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  try {

    const response = await document
      .query({
        TableName: "users",
        KeyConditionExpression: "id = :user_id",
        ExpressionAttributeValues: {
          ":user_id": user_id,
        }
      }).promise();

    const user = response.Items[0];

    if (!user) {
      throw new Error("User not found");
    }

    if (user.todos.length <= 0) {
      throw new Error("No TODOs saved");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        user_id,
        todos: user.todos
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