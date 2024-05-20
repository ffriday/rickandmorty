export type SearchParams = {
  page: number;
  name: string;
  status: string;
}

type QueryInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharactersData = {
  info: QueryInfo;
  results: Character[];
}

export type MyResponse = {
  data?: CharactersData;
  error?: string;
}

export type Pages = {
  prev: boolean;
  next: boolean;
  current: number;
}