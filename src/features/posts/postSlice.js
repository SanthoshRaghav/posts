import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const date = (val) => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() - val);
  return currentDate.toISOString();
};

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await fetch(POST_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  try {
    const response = await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialPost),
    });
    console.log(response, response.ok);
    if (!response.ok) {
      throw new Error('Failed to add a new post');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsup: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const exisitingPost = state.posts.find((post) => post.id === postId);
      if (exisitingPost) {
        exisitingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      let min = 1;
      const loadPosts = action.payload.map((post) => {
        post.date = date(min++);
        post.reactions = {
          thumbsup: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });
      state.posts = state.posts.concat(loadPosts);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      console.log('****', action);
      action.payload.userId = +action.payload.userId;
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsup: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      console.log(action.payload);
      state.posts.push(action.payload);
    });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
