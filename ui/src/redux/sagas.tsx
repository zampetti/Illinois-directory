import { all, call, takeEvery, put } from "redux-saga/effects";
import {fetchSuccess, fetchFailure} from "../components/listSlice";
import { sagaActions } from "./sagaActions";

type DeptProfile = {
    id: number
    deptId: number
    name: string
    description: string
    email: string
    first_name: string
    last_name: string
    title: string
    imageUrl: string
}
export function* fetchDataSaga() {
    try {
        let result: DeptProfile[] = yield fetch("http://localhost:3000/directory")
        .then(response => response.json())
        yield put(fetchSuccess(result));
    } catch (e) {
        yield put(fetchFailure("FETCH FAILED"))
    }
}

function* fetchWatcher() {
    yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchDataSaga)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      fetchWatcher(),
    ])
  }
