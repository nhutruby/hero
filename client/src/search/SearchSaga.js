import {call, put, take, fork} from "redux-saga/effects";
import axios from "axios";

function search(params) {
  return axios.get("/victors", {params: params});
}

function* workerSearch() {
  while (true) {
    try {
      const request = yield take("SEARCH");
      const params = request.payload;
      const response = yield call(search, params);
      const victor = response.data;
      yield put({type: "SEARCH_SUCCESS", victor});
    } catch (error) {
      console.log(error);
      yield put({type: "SEARCH_FAIL", error});
    }
  }
}
export default function* watcherSearch() {
  yield fork(workerSearch);
}
