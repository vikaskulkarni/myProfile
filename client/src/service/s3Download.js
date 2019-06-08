import { Storage } from "aws-amplify";

export async function s3Download(fileName) {
  const stored = await Storage.get(fileName);
  console.log();
  return stored.key;
}
