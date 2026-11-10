import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { Result } from "@praha/byethrow";

export type Credential = {
  type: "ftp" | "ssh";
  username: string;
  password: string;
  host: string;
  port?: string;
  secure?: boolean;
};

const path = join(homedir(), ".abc-credentials");

const readJson = Result.try({
  try: () =>
    JSON.parse(readFileSync(path, "utf8")) as Record<string, Credential>,
  catch: (cause) => `Couldn't read ${path}: ${String(cause)}`,
});

const findEntry = (
  all: Record<string, Credential>,
  entry: string,
): Result.Result<Credential, string> => {
  const credential = all[entry];
  return credential?.type === "ftp"
    ? Result.succeed(credential)
    : Result.fail(`No FTP entry called "${entry}" in ${path}`);
};

export const readFtpCredentials = (
  entry: string,
): Result.Result<Credential, string> => {
  return Result.pipe(
    readJson,
    Result.andThen((all) => findEntry(all, entry)),
  );
};
