import React from 'react'
import { useQuery } from 'react-query';
import { request, gql } from "graphql-request";

const endpoint = "https://zukarap-strapi.herokuapp.com/graphql";

const Pages = () => {
  
  const { status, data, error, isFetching } = getPages();
  
  return (
    <div>
        {
          status === 'loading' && (
            <div>loading</div>
          )
        }
    </div>
  )
}

function getPages() {
  return useQuery("pages", async () => {
    const {
      pages,
    } = await request(
      endpoint,
      gql`
        query {
          pages {
            title
          }
        }
      `
    );
    return pages;
  });
}

export default Pages
