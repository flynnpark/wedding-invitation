import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import React, { createContext, Dispatch, useContext, useReducer } from 'react';

interface BasePost {
  id: string;
  name: string;
  content: string;
}

export interface PostWithTimestamp extends BasePost {
  createdAt: Timestamp;
}

export interface Post extends BasePost {
  createdAt: Date;
}

type PostsState = {
  posts: Post[];
  prevPost: QueryDocumentSnapshot<DocumentData> | undefined;
  isLastPage: boolean;
};

const PostsStateContext = createContext<PostsState | undefined>(undefined);

type Action =
  | { type: 'SET'; posts: QueryDocumentSnapshot<DocumentData>[] }
  | { type: 'ADD_ITEM_FIRST'; post: DocumentSnapshot<DocumentData> }
  | { type: 'ADD_ITEMS_LAST'; posts: QueryDocumentSnapshot<DocumentData>[] }
  | { type: 'UPDATE'; id: string; values: Partial<Omit<Post, 'id'>> }
  | { type: 'DELETE'; id: string };

type PostsDispatch = Dispatch<Action>;
const PostsDispatchContext = createContext<PostsDispatch | undefined>(
  undefined
);

export const DEFAULT_PAGE_SIZE = 10;

function postsReducer(state: PostsState, action: Action): PostsState {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        posts: action.posts.map((doc) => {
          const { name, content, createdAt } = doc.data() as PostWithTimestamp;
          return {
            id: doc.id,
            name,
            content,
            createdAt: createdAt.toDate(),
          };
        }),
        prevPost: action.posts[action.posts.length - 1],
        isLastPage: action.posts.length < DEFAULT_PAGE_SIZE,
      };
    case 'ADD_ITEM_FIRST':
      const { name, content, createdAt } =
        action.post.data() as PostWithTimestamp;
      const newPost = {
        id: action.post.id,
        name,
        content,
        createdAt: createdAt.toDate(),
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
      };
    case 'ADD_ITEMS_LAST':
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.posts.map((doc) => {
            const { name, content, createdAt } =
              doc.data() as PostWithTimestamp;
            return {
              id: doc.id,
              name,
              content,
              createdAt: createdAt.toDate(),
            };
          }),
        ],
        prevPost: action.posts[action.posts.length - 1],
        isLastPage: action.posts.length < DEFAULT_PAGE_SIZE,
      };
    case 'UPDATE':
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              ...action.values,
            };
          }
          return item;
        }),
      };
    case 'DELETE':
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
}

export function PostsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, dispatch] = useReducer(postsReducer, {
    posts: [],
    prevPost: undefined,
    isLastPage: false,
  });

  return (
    <PostsDispatchContext.Provider value={dispatch}>
      <PostsStateContext.Provider value={posts}>
        {children}
      </PostsStateContext.Provider>
    </PostsDispatchContext.Provider>
  );
}

export function usePostsState() {
  const state = useContext(PostsStateContext);
  if (!state) throw new Error('PostsProvider not found');
  return state;
}

export function usePostsDispatch() {
  const dispatch = useContext(PostsDispatchContext);
  if (!dispatch) throw new Error('PostsProvider not found');
  return dispatch;
}
