import imap from "imap-simple";
import env from "../lib/env";

const config = {
  imap: {
    user: env("EMAIL_ADDRESS"),
    password: env("EMAIL_PASSWORD"),
    host: env("EMAIL_HOST"),
    port: env("EMAIL_PORT"),
    tls: env("EMAIL_TLS"),
    authTimeout: 3000
  }
};
