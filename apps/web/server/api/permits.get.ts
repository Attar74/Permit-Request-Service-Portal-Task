import type { PaginatedResponse, PermitApplication } from '../../types/permit';

export default defineEventHandler(
  async (
    event
  ): Promise<PermitApplication[] | PaginatedResponse<PermitApplication>> => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.apiBaseUrl;

    // Get query parameters
    const query = getQuery(event);
    const pageNumber = query.pageNumber
      ? parseInt(query.pageNumber as string, 10)
      : undefined;
    const size = query.size ? parseInt(query.size as string, 10) : undefined;

    // Build URL with query parameters if provided
    const url = new URL(`${apiBaseUrl}/permits`);
    if (pageNumber) {
      url.searchParams.append('pageNumber', pageNumber.toString());
    }
    if (size) {
      url.searchParams.append('size', size.toString());
    }

    try {
      const response = await fetch(url.toString(), {
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
    } catch (error: any) {
      if (error?.statusCode) {
        throw error;
      }
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch permits: ${error?.message || 'Unknown error'}`,
      });
    }
  }
);
