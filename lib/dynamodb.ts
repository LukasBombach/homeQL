import AWS from "aws-sdk";
import generateString from "crypto-random-string";
import env from "./env";

export type Item = Record<string, string>;
export type DynamoDBItem = AWS.DynamoDB.PutItemInputAttributeMap;

const encodeError = new Error("Cannot encode non-string values");
const decodeError = new Error("Cannot decode non-string values");

export default class DynamoDB {
  private static connection?: AWS.DynamoDB;

  static async putItem(TableName: string, item: Item) {
    const connection = await DynamoDB.getConnection();
    const id = item.id || generateString({ length: 12 });
    const Item = DynamoDB.encode({ ...item, id });
    return connection.putItem({ TableName, Item }).promise();
  }

  static async getItem(TableName: string, id: string) {
    const connection = await DynamoDB.getConnection();
    const Key = { S: id } as AWS.DynamoDB.Key;
    const result = await connection.getItem({ TableName, Key }).promise();
    return result.Item ? DynamoDB.decode(result.Item) : null;
  }

  static async updateItem(params: AWS.DynamoDB.UpdateItemInput) {
    const connection = await DynamoDB.getConnection();
    return connection.updateItem(params).promise();
  }

  static async scan(TableName: string) {
    const connection = await DynamoDB.getConnection();
    const result = await connection.scan({ TableName }).promise();
    return result.Items.map((item) => DynamoDB.decode(item));
  }

  static async deleteItem(TableName: string, id: string) {
    const connection = await DynamoDB.getConnection();
    const Key = { S: id } as AWS.DynamoDB.Key;
    return connection.deleteItem({ TableName, Key }).promise();
  }

  static async createTable(table: AWS.DynamoDB.CreateTableInput) {
    const connection = await DynamoDB.getConnection();
    try {
      await connection.createTable(table).promise();
    } catch (error) {
      if (error.code !== "ResourceInUseException") throw error;
    }
  }

  private static encode(item: Item): DynamoDBItem {
    const entries = Object.entries(item).map(([key, val]) => {
      if (typeof val !== "string") encodeError;
      return [key, { S: val }];
    });
    return Object.fromEntries(entries);
  }

  private static decode(dynamoItem: DynamoDBItem): Item {
    const entries = Object.entries(dynamoItem).map(([key, { S }]) => {
      if (typeof S === "undefined") decodeError;
      return [key, S];
    });
    return Object.fromEntries(entries);
  }

  private static async getConnection(): Promise<AWS.DynamoDB> {
    if (!this.connection) {
      this.connection = new AWS.DynamoDB(DynamoDB.getAWSOptions());
    }
    return this.connection;
  }

  private static getAWSOptions() {
    const endpoint = env("AWS_ENPOINT_URL");
    const region = env("AWS_REGION");
    const accessKeyId = env("AWS_ACCESS_KEY_ID");
    const secretAccessKey = env("AWS_SECRET_ACCESS_KEY");
    return { endpoint, region, accessKeyId, secretAccessKey };
  }
}
