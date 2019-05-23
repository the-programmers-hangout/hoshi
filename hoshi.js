require('./src/util/Extensions');

const {
  HOSHI_TOKEN,
  HOSHI_OWNERS,
  HOSHI_DATABASE_URL,
  HOSHI_SENTRY_KEY,
  HOSHI_SELFSTAR_WARNING_TIMEOUT
} = process.env;

const config = {
  token: HOSHI_TOKEN,
  owner: JSON.parse(HOSHI_OWNERS),
  dbURL: HOSHI_DATABASE_URL,
  sentryKey: HOSHI_SENTRY_KEY,
  selfstarWarningTimeout: Number(HOSHI_SELFSTAR_WARNING_TIMEOUT)
};

const HoshiClient = require('./src/struct/HoshiClient');
const Logger = require('./src/util/Logger');
const Raven = require('raven');

const client = new HoshiClient(config);

if (config.sentryKey) {
  Raven.config(config.sentryKey).install();
}

client.on('disconnect', () => Logger.warn('Connection lost...'))
    .on('reconnect', () => Logger.info('Attempting to reconnect...'))
    .on('error', err => Logger.error(err))
    .on('warn', info => Logger.warn(info));

client.start();

process.on('unhandledRejection', err => {
  Logger.error('An unhandled promise rejection occured');
  Logger.stacktrace(err);
});
