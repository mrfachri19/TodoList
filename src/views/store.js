// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API Import
import {
  getAllActivity,
  delActivity,
  postActivity,
  getActivitybyid,
  deleteTodo
} from "../api";

export const fetchActivity = createAsyncThunk(
  "appTodo/fetchActivity",
  async () => {
    const response = await getAllActivity(`?email=fachryfachry1997@gmail.com`);
    const datas = response.data.data;
    return datas;
  }
);

export const fetchActivitybyid = createAsyncThunk(
  "appTodo/fetchActivitybyid",
  async (id) => {
    const response = await getActivitybyid(`/${id}`);
    const datas = response.data;
    return {
      datas,
      id,
    };
  }
);

export const deleteActivity = createAsyncThunk(
  "appTodo/deleteActivity",
  async (id) => {
    await delActivity(`/${id}`);
    return id;
  }
);

export const deletetodo = createAsyncThunk(
  "appTodo/deletetodo",
  async (id) => {
    await deleteTodo(`/${id}`);
    return id;
  }
);

export const addActivity = createAsyncThunk(
  "appTodo/addActivity",
  async (data) => {
    await postActivity(data);
    return data;
  }
);

export const appTodoSlice = createSlice({
  name: "appTodo",
  initialState: {
    tasks: [],
    taskid: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchActivitybyid.fulfilled, (state, action) => {
        state.taskid = action.payload;
      });
  },
});

export const {} = appTodoSlice.actions;

export default appTodoSlice.reducer;
