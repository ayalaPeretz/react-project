import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserModel } from '../../models/UserModel.model'
import { openModal } from './massegeSlice';

const UsersSlice = createSlice({
    initialState: {
        users: [] as UserModel[],
        user: new UserModel("", ""), // Default user
        truePassword: false, // Login status
        notExistUser: false,
    },
    name: 'myUsers',
    reducers: {
        addUser: (state, action: PayloadAction<UserModel>) => {
            state.users.push(action.payload);
        },
        _setUser: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
        },
        checkUserPass: (state, action: PayloadAction<{ userName: string, password: string}>) => {
          const { userName, password } = action.payload;
          const existingUser = state.users.find(user => user.userName === userName);
          if (existingUser) {
              if (existingUser.password === password) {
                  state.user = existingUser;
                  state.truePassword = true;
                  state.notExistUser = false;
                  // קריאה לפונקציה openModal ממחלקת massegeSlice
                  // openModal({ title: "הצלחה", body: "התחברות המשתמש עברה בהצלחה" });
              } else {
                  state.truePassword = false;
                  state.notExistUser = false;
                  // קריאה לפונקציה openModal ממחלקת massegeSlice
                  // openModal({ title: "כשלון", body: "הסיסמה שהוקשה שגויה, נסה שנית" });
              }
          } else {
              debugger
              state.user = { userName, password };
              state.users.push({ userName, password });
              state.truePassword = false;
              state.notExistUser = true;
                 }
      }
      
    }
});

export default UsersSlice.reducer;
export const { checkUserPass, addUser, _setUser } = UsersSlice.actions;
