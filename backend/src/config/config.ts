import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class Config {
  DATABASE_URL: string;
  MAIL_HOST: string;
  APP_PORT: number;
  MAIL_SENDER_NAME: string;
  MAIL_SENDER_ADDRESS: string;
  LDAP_FILTER: string;
  MAIL_POSTFIX: string;
  READER_DOMAIN_NAME: string;
  READER_PASSWORD: string;
  LDAP_SERVER_URL: string;
  LDAP_SUFFIX: string;
  FEATURE_AVATAR_SOURCE: 'NO' | 'CONFLUENCE';
  FEATURE_AUTH_TYPE: 'PASSWORD' | 'LDAP';
  FEATURE_WEB_PUSH: 'NO' | 'YES';
  CONFLUENCE_BASE_URL: string;
  CONFLUENCE_LOGIN: string;
  CONFLUENCE_PASSWORD: string;
  FEATURE_SEND_MAIL: 'NO' | 'YES';
  JWT_SECRET_KEY: string;
  JWT_EXPIRES: string;
  UNAUTH_URLS: string;
  PRINT_COMPANY_NAME: string;
  PRINT_HEAD_MANAGER_POSITION: string;
  PRINT_HEAD_MANAGER_NAME: string;
  PUSH_MAIL_TO: string;
  PUSH_PUBLIC_KEY: string;
  PUSH_PRIVATE_KEY: string;
  MINIO_END_POINT: string;
  MINIO_PORT: number;
  MINIO_USE_SSL: boolean;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
}

let config;

export function getConfig(): Config {
  const configPath = `./environments/${process.env.NODE_ENV || 'dev'}.env`;
  if (!config) {
    config = dotenv.parse(fs.readFileSync(configPath));
  }
  return config;
}
