import type { PermitApplication } from '~/types/permit';

export default defineEventHandler(async (event): Promise<PermitApplication[]> => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  try {
    const response = await fetch(`${apiBaseUrl}/permits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Backend API error: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch permits: ${error.message}`,
    });
  }
});

