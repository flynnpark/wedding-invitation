import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useCallback, useMemo } from 'react';

import {
  DEFAULT_PAGE_SIZE,
  usePostsDispatch,
  usePostsState,
} from 'contexts/PostsContext';
import { db } from 'utils/firebase';

export interface BasePost {
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

const useFetchPosts = () => {
  const postsState = usePostsState();
  const dispatch = usePostsDispatch();

  const defaultQuery = useMemo(
    () => [where('isDeleted', '==', false), orderBy('createdAt', 'desc')],
    []
  );

  const fetchFirstPage = useCallback(
    async (size: number = DEFAULT_PAGE_SIZE) => {
      if (postsState.posts.length > 0) return;
      const detailedQuery = [...defaultQuery];
      const dataQuery = query(
        collection(db, 'guestBook'),
        ...detailedQuery,
        limit(size)
      );
      const querySnapshot = await getDocs(dataQuery);
      dispatch({ type: 'ADD_ITEMS_LAST', posts: querySnapshot.docs });
    },
    [defaultQuery, dispatch, postsState.posts.length]
  );

  const fetchPosts = useCallback(
    async (size: number = DEFAULT_PAGE_SIZE) => {
      if (postsState.isLastPage) return;

      const detailedQuery = [...defaultQuery];
      if (postsState.prevPost) {
        detailedQuery.push(startAfter(postsState.prevPost));
      }

      const dataQuery = query(
        collection(db, 'guestBook'),
        ...detailedQuery,
        limit(size)
      );
      const querySnapshot = await getDocs(dataQuery);
      dispatch({ type: 'ADD_ITEMS_LAST', posts: querySnapshot.docs });
    },
    [defaultQuery, dispatch, postsState.isLastPage, postsState.prevPost]
  );
  return { posts: postsState.posts, fetchFirstPage, fetchPosts };
};

export default useFetchPosts;
