import { boardReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
  boards: boardReducer,
  logger: loggerReducer,
  modal: modalReducer,
};

export default reducer;