import { Client } from "basic-ftp";
import { Result } from "@praha/byethrow";
import { readFtpCredentials } from "./credentials.ts";
import { enterDir, login, upload } from "./ftp.ts";

const credentials = readFtpCredentials();

if (Result.isFailure(credentials)) {
  console.error(credentials.error);
  process.exit(1);
}

const client = new Client();
const remoteDir = process.env.FTP_REMOTE_DIR ?? "public_html";

const result = await Result.pipe(
  login(client, credentials.value),
  Result.andThen(() => enterDir(client, remoteDir)),
  Result.andThen(() => upload(client, "dist")),
);

client.close();

if (Result.isFailure(result)) {
  console.error(result.error);
  process.exitCode = 1;
} else {
  console.log(`Deployed dist/ to ${remoteDir}`);
}
