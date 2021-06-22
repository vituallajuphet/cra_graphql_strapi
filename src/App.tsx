import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import { request, gql } from "graphql-request";

const endpoint = "https://zukarap-strapi.herokuapp.com/graphql";

const queryClient = new QueryClient();

const PostComp = (props: any) => {

  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      { status === 'loading' && <div>Loading</div>} 
      { status === 'success' && <div>
          {
            data.map((itm:any) => (
              <div>{itm.title}</div>
            ))
          }

      </div>} 
    </div>
  )

}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h2>test</h2>
      <PostComp />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

function usePosts() {
  return useQuery("posts", async () => {
    const {
      posts,
    } = await request(
      endpoint,
      gql`
        query {
          posts {
            id
            content,
            title
          }
        }
      `
    );
    return posts;
  });
}



export default App;
