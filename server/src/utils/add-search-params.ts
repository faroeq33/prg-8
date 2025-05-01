/**
 * Adds additional search parameters to an existing URL while preserving any existing parameters.
 *
 * @param url - The base URL object to add parameters to
 * @param params - An object containing key-value pairs of search parameters to add
 * @returns A new URL object with both existing and new search parameters
 *
 * @example
 * const baseUrl = new URL('https://api.example.com/path?existing=true');
 * const newParams = { key: 'value' };
 * const result = addSearchParams(baseUrl, newParams);
 * // Result: https://api.example.com/path?existing=true&key=value
 */
export default function addSearchParams(url: URL, params: object): URL {
  return new URL(
    `${url.origin}${url.pathname}?${new URLSearchParams([
      ...Array.from(url.searchParams.entries()),
      ...Object.entries(params),
    ])}`
  );
}
