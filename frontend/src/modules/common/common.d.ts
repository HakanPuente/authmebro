export interface AnyResult {
  success: boolean;
  action?: AnyAction;
  actions?: AnyAction[];
  response: any;
  [key: string]: any;
}

export interface Translatable {
  [lang: string]: string;
}

export interface Translation {
  lang: string;
  value: string;
}
