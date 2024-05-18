import { createSlice } from "@reduxjs/toolkit";
import { ILogItem } from "../../types";

interface TLoggerState {
  logArray: ILogItem[]
}

const initialState: TLoggerState = {
  logArray: []
}

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {

  }
});

export const loggerReducer = loggerSlice.reducer;