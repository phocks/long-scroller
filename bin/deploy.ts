import { Client } from "basic-ftp";
import { Effect } from "effect";

const client = new Client();

const deploy = Effect.tryPromise(async () => {
  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  });
  await client.ensureDir(process.env.FTP_REMOTE_DIR ?? "public_html");
  await client.uploadFromDir("dist");
}).pipe(
  Effect.ensuring(Effect.sync(() => client.close())),
  Effect.catch((error) =>
    Effect.sync(() => {
      console.error("Deploy failed:", error);
      process.exitCode = 1;
    }),
  ),
);

await Effect.runPromise(deploy);
