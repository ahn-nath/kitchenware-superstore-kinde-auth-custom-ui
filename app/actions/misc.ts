import { init, EnvironmentVariables } from '@kinde/management-api-js';

export const getSiteUrl = async () => {
  init();
  const { environment_variable } =
    await EnvironmentVariables.getEnvironmentVariable({
      variableId: 'KINDE_SITE_URL',
    });

  return { environment_variable };
};
