interface PageState {
  error: any;
  isLoaded: boolean;
}

export interface Record<T> extends PageState {
  item: T;
}

export interface List<T> extends PageState {
  items: T[];
}
