import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import globalEpics from './global.epics';

export default {
  reducers: combineReducers({}),
  epics: combineEpics(globalEpics),
};
