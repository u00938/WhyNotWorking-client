import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AppThunk, RootState } from "../../app/store";

export interface UserInfo {
  aboutMe: string | undefined;
  email: string | null;
  image: string | undefined;
  location: string | null;
  nickname: string | null;
  id: number;
}

interface SignInState {
  user: UserInfo | null;
  isLogin: boolean;
}

const initialState: SignInState = {
  user: null,
  isLogin: false,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = signInSlice.actions;

export const selectUserInfo = (state: RootState) => state.signIn.user;
export const selectIsLogin = (state: RootState) => state.signIn.isLogin;

export const loginAsync = (userInfo: {
  email: string;
  password: string;
}): AppThunk => (dispatch) => {
  const data: string = JSON.stringify(userInfo);

  axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_HOST}/login/`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then((res) => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_HOST}/users/myInfo`,
        headers: {
          "Content-Type": "application/json",
          Authorization: res.data.accessToken,
        },
      })
        .then((usersResponse) => {
          dispatch(login(usersResponse.data.data));
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((error: AxiosError) => {
      if (error.response?.data.message === "no such user") {
        alert("올바른 유저 정보를 입력하세요");
      }
    });
};

export const googleLoginAsync = (token: any): AppThunk => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_HOST}/login/googleLogin/`,
      {
        token,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      dispatch(login(res.data.data));
    });
};

export const gitHubLoginAsync = (authorizationCode: any): AppThunk => (
  dispatch
) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_HOST}/login/githubToken/`,
      {
        authorizationCode,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      let token = res.data.accessToken;
      axios
        .get("https://github.com/login/oauth/user", {
          headers: {
            authorization: `token ${res.data.accessToken.split(" ")[2]}`,
          },
        })
        .then((res) => {
          const { email } = res.data;
          const data = JSON.stringify({
            email,
          });
          axios
            .post(`${process.env.REACT_APP_SERVER_HOST}/sign/`, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then((name) => {
              axios
                .get(
                  `${process.env.REACT_APP_SERVER_HOST}/users/myInfo?nickname=${name}`,
                  {
                    headers: {
                      authorization: token,
                    },
                  }
                )
                .then((res: any) => {
                  dispatch(login(res.data.data));
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        });
    });
};

export const logoutAsync = (): AppThunk => (dispatch) => {
  axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_HOST}/logout/`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    dispatch(logout());
    localStorage.clear();
  });
};

export default signInSlice.reducer;
