import { all, call } from 'redux-saga/effects'
import {signUpSagaWatcher} from './../ducks/auth'


export default function* () {
  yield all([call(signUpSagaWatcher)])
}