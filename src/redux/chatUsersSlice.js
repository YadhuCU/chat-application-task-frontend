import { createSlice } from "@reduxjs/toolkit";

const chatUsersSlice = createSlice({
  name: "chatUsers",
  initialState: {
    users: [],
    currentChatUser: {},
    showChat: false,
  },
  reducers: {
    addUsers: (state, action) => {
      // action.payload structure.
      // chatUser: chatUserName,
      // messages: [{room, author, message, time}]
      state.users.push(action.payload);
    },
    addCurrentChatUser: (state, action) => {
      const currUser = state.users.find(
        (item) => item.chatUser == action.payload,
      );
      state.currentChatUser = currUser;
    },
    addMessage: (state, action) => {
      const currChatUser = state.users.find(
        (item) =>
          item.chatUser == action.payload.room ||
          item.chatUser == action.payload.author,
      );
      if (currChatUser) {
        currChatUser.messages.push(action.payload);
      } else {
        state.users.push({
          chatUser: action.payload.author,
          messages: [action.payload],
        });
      }
    },
    toggleShowChat: (state) => {
      state.showChat = !state.showChat;
    },
  },
});

export const { addUsers, addCurrentChatUser, addMessage, toggleShowChat } =
  chatUsersSlice.actions;
export default chatUsersSlice.reducer;
