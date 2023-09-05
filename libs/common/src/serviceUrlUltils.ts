import {
  DONATION_RECEIVER_SERVICE_CLIENT_NAME,
  DONATION_RECEIVER_SERVICE_PORT,
  REPOSITORY_SERVICE_CLIENT_NAME,
  REPOSITORY_SERVICE_PORT,
  USER_SERVICE_CLIENT_NAME,
  USER_SERVICE_PORT,
} from './constants';

export const getServiceUrlByServiceName = (serviceName: string): string => {
  const appHost = 'localhost';

  switch (serviceName) {
    case REPOSITORY_SERVICE_CLIENT_NAME:
      return `${appHost}:${REPOSITORY_SERVICE_PORT}`;
    case USER_SERVICE_CLIENT_NAME:
      return `${appHost}:${USER_SERVICE_PORT}`;
    case DONATION_RECEIVER_SERVICE_CLIENT_NAME:
      return `${appHost}:${DONATION_RECEIVER_SERVICE_PORT}`;
  }
};
