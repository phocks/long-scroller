import type { Client } from "basic-ftp";
import { Result } from "@praha/byethrow";
import type { Credential } from "./credentials.ts";

export const login = (client: Client, credential: Credential) =>
  Result.try({
    try: () =>
      client.access({
        host: credential.host,
        user: credential.username,
        password: credential.password,
        port: Number(credential.port ?? 21),
        secure: credential.secure ?? false,
      }),
    catch: (cause) => `Couldn't log in to ${credential.host}: ${String(cause)}`,
  });

export const enterDir = (client: Client, remoteDir: string) =>
  Result.try({
    try: () => client.ensureDir(remoteDir),
    catch: (cause) => `Couldn't create or open ${remoteDir}: ${String(cause)}`,
  });

export const upload = (client: Client, localDir: string) =>
  Result.try({
    try: () => client.uploadFromDir(localDir),
    catch: (cause) => `Upload of ${localDir}/ failed: ${String(cause)}`,
  });
