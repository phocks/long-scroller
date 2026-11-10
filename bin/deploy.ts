import { Client, FTPError } from "basic-ftp";
import { fromPromise } from "neverthrow";

const client = new Client();

const login = await fromPromise(
  client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  }),
  (error) => error,
);

if (login.isErr()) {
  const badLogin = login.error instanceof FTPError && login.error.code === 530;
  console.error(
    badLogin ? "Login rejected, check your credentials" : login.error,
  );
  process.exit(1);
}

const remoteDir = process.env.FTP_REMOTE_DIR ?? "public_html";

const dir = await fromPromise(client.ensureDir(remoteDir), (error) => error);
if (dir.isErr()) {
  console.error(`Couldn't create or open ${remoteDir}:`, dir.error);
  client.close();
  process.exit(1);
}

const upload = await fromPromise(
  client.uploadFromDir("dist"),
  (error) => error,
);

if (upload.isErr()) {
  console.error("Upload failed:", upload.error);
  process.exitCode = 1;
}

client.close();
