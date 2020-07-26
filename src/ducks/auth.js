import { Record } from "immutable";
import { appName } from './../config';
/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const ACTION = `${prefix}/ACTION`;

/**
 * Reducer
 * 
 * */

 
export const ReducerRecord = Record({});

export default function reducer(state = new ReducerRecord(), action) {
  switch (action.type) {
    default:
      return state;
  }
}


/**
 * Selectros
 * 
 */


/**
 * Custom Hooks
 * 
 */


/**
 * Action Creators
 * 
 * */


/**
 * Sagas
 * 
 */
