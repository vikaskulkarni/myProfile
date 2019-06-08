// This is not working
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  try {
    console.log(`Downloading file using AWS Lambda!`);
    const data = await S3.getObject({
      Bucket: "profiles-app",
      Key: "Vikas-Architect_JAVA_REACT_Web_DeveloperACS-13.6yrs.pdf"
    }).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "pdf/*"
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true
    };
    //return success(JSON.stringify(data));
  } catch (e) {
    console.log(`Failed Downloading file!`);
    return failure({ status: false, error: e });
  }
}
