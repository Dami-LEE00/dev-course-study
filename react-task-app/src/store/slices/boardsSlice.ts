import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

interface TBoardState {
  modalActive: boolean;
  boardArray: IBoard[]
}

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫 번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: 'task-0',
              taskName: "Task 1",
              taskDescription: "Description",
              taskOwner: "Dami"
            },
            {
              taskId: 'task-1',
              taskName: "Task 2",
              taskDescription: "Description",
              taskOwner: "Dami"
            }
          ]
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: 'task-2',
              taskName: "Task 3",
              taskDescription: "Description",
              taskOwner: "Dami"
            },
            {
              taskId: 'task-3',
              taskName: "Task 4",
              taskDescription: "Description",
              taskOwner: "Dami"
            }
          ]
        }
      ]
    }
  ]
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {

  }
})

export const boardReducer = boardSlice.reducer;