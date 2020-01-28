import { Action, AnyAction, Dispatch } from 'redux';

interface AsyncData {
  [key: string]: {};
}

export interface AsyncAction extends Action {
  model: string;
  data?: any;
}
export interface AsyncStart extends AsyncAction {
  msg?: string;
}

export interface AsyncError extends AsyncAction {
  error: Error;
  errorMsg?: string;
}

export const ASYNC_START = 'async.start';
export const asyncStart = (
  model: string,
  data?: AsyncData,
  msg?: string,
): AsyncStart => ({
  type: ASYNC_START,
  model,
  msg,
  data,
});

export const ASYNC_PROGRESS = 'async.progress';
export const asyncProgress = (model: string, data: AsyncData): AsyncAction => ({
  type: ASYNC_PROGRESS,
  model,
  data,
});

export const ASYNC_FINISH = 'async.finish';
export const asyncFinish = (model: string, data?: AsyncData): AsyncAction => ({
  type: ASYNC_FINISH,
  model,
  data,
});

export const ASYNC_ERROR = 'async.error';
export const asyncError = (
  model: string,
  error: Error,
  errorMsg?: string,
  data?: AsyncData,
): AnyAction => ({
  type: ASYNC_ERROR,
  model,
  error,
  errorMsg,
  data,
});

export const asyncAction = (type: string, data: any = null, msg = '') => (
  dispatch: Dispatch,
): void => {
  dispatch(asyncStart(type, data, msg));
  dispatch({
    type,
    dispatch,
    ...data,
  });
};
