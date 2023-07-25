// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getNewses: builder.query({
      query: () => "/news",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetNewsesQuery } = apiSlice;
