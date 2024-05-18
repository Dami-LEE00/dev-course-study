import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

interface TModalState {
  boardId: string;
  listId: string;
  task: ITask
}

const initialState: TModalState = {
  boardId: "board-0",
  listId: "listId-0",
  task: {
    taskId: "task-0",
    taskName: "Task 0",
    taskDescription: "Task Description",
    taskOwner: "Dami",
  }
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {

  }
});

export const modalReducer = modalSlice.reducer;