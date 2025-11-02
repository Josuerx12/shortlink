export class BasePagination<T> {
  data: T[];
  links: Links;
  meta: Meta;

  constructor(data: T[], links: Links, meta: Meta) {
    this.data = data;
    this.links = links;
    this.meta = meta;
  }
}

type Links = {
  first: string;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
};

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url?: string;
    label: string;
    page?: number;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};
