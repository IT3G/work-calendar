import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class Config {
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_URL: string;
  MAIL_HOST: string;
  APP_PORT: number;
  MAIL_SENDER_NAME: string;
  MAIL_SENDER_ADDRESS: string;
  LDAP_FILTER: string;
  MAIL_PREFIX: string;
  READER_DOMAIN_NAME: string;
  READER_PASSWORD: string;
  SERVER_URL: string;
  SUFFIX: string;
  AVATAR_SOURCE: string;
  CONFLUENCE_BASE_URL: string;
  CONFLUENCE_LOGIN: string;
  CONFLUENCE_PASSWORD: string;
}

let config;

export function getConfig() {
  const configPath = `./environments/${process.env.NODE_ENV || 'dev'}.env`;
  if (!config) {
    config = dotenv.parse(fs.readFileSync(configPath));
  }
  return config;
}
