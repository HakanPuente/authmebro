import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAction } from './async.actions';
import RootState from '../../../store/store';

export interface Args {
  actionType: string;
  actionData: any;
  getData: (state: RootState) => any;
  getLoading: (state: RootState) => string;
  getError: (state: RootState) => string;
}

export interface Result {
  data: any;
  loading: string;
  error: string;
}

export function useAsyncAction(args: Args): Result {
  const { actionType, actionData, getData, getLoading, getError } = args;
  const dispatch = useDispatch();
  const data = useSelector(getData);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(asyncAction(actionType, actionData));
  }, [actionData, actionType, dispatch]);

  return {
    data,
    loading,
    error,
  };
}
