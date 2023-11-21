import { api } from '../../api';
export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: build.query({
      query: id => `/users/${id}`,
    }),
  }),
  overrideExisting: false,
});
export const { useLazyFetchOneQuery } = userApi;
