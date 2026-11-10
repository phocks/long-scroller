import { Client } from "basic-ftp";
import { Result } from "@praha/byethrow";
import { readFtpCredentials } from "./credentials.ts";
import { enterDir, login, upload } from "./ftp.ts";
import { match, P } from "ts-pattern";

const FTP_ROOT_DIR = "/www/res/sites/news-projects/";

const credentials = readFtpCredentials();

if (Result.isFailure(credentials)) {
  console.error(credentials.error);
  process.exit(1);
}

const getRemoteDir = () => {
  const remoteDir = process.env.FTP_REMOTE_FOLDER_NAME;
  if (remoteDir === undefined) {
    return Result.fail("FTP_REMOTE_FOLDER_NAME is not set in .env");
  }
  return Result.succeed(remoteDir);
};

const client = new Client();
const remoteDir = getRemoteDir();

if (Result.isFailure(remoteDir)) {
  console.error(remoteDir.error);
  process.exit(1);
}

const result = await Result.pipe(
  login(client, credentials.value),
  Result.andThen(() => enterDir(client, `${FTP_ROOT_DIR}${remoteDir.value}`)),
  Result.andThen(() => upload(client, "dist")),
);

client.close();

match(result)
  .with({ type: "Failure" }, (failure) => {
    console.error(failure.error);
    process.exitCode = 1;
  })
  .with({ type: "Success" }, () => {
    console.log(`Deployed dist/ to ${remoteDir}`);
  })
  .exhaustive();
