import type { PermitApplication, CreatePermitApplication } from '~/types/permit';

export default defineEventHandler(
  async (event): Promise<PermitApplication> => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.apiBaseUrl;

    // Read request body
    const body = await readBody<CreatePermitApplication>(event);

    // Validate required fields
    if (!body.applicantName || !body.applicantEmail || !body.permitType) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: applicantName, applicantEmail, permitType',
      });
    }

    try {
      const response = await fetch(`${apiBaseUrl}/permits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw createError({
          statusCode: response.status,
          statusMessage:
            errorData.message || `Backend API error: ${response.statusText}`,
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
        statusMessage: `Failed to create permit: ${error.message}`,
      });
    }
  }
);

