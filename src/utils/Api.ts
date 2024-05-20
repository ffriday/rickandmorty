import type { MyResponse, SearchParams } from './types';

export class Api {
  private _baseURL: string;
  private _charactersURL = 'character'
  constructor(baseURL: string) {
    this._baseURL = baseURL;
  }

  public async getCharacters(params: Partial<SearchParams> = {}): Promise<MyResponse> {
    const fullURL = this.makeURL(this._charactersURL, params);
    try {
      const res = await fetch(fullURL.toString());
      if (!res.ok) {
        return { error: res.statusText }
      }
      const data = await res.json();
      return { data }
    } catch (err) {
      if (err instanceof Error) {
        return { error: err.message }
      } else {
        return { error: 'Unknown error' }
      }
    }
  }

  private makeURL(url: string, params: Partial<SearchParams>): URL {
    const fullURL = new URL(`${url}/`, this._baseURL);
    const searchParams = new URLSearchParams({ ...params, page: params.page?.toString() ?? '' });
    fullURL.search = searchParams.toString();
    return fullURL;
  }
}