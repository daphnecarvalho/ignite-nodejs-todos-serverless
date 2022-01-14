import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      }
    }).promise();

  const todos = response.Items;

  console.log(response);
  console.log(todos);

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos
    }),
    headers: {
      "Content-Type": "application/json",
    }
  };
}