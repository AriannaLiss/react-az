import { useMemo } from "react";
import PostService from "../API/PostService";
import { getPageCount, getPages } from "../utils/pages";
import { useFetching } from "./useFetching";

export const usePaggination = (posts, setPosts, totalPages, setTotalPages, setPagesArray) => {
    useMemo(() => setPagesArray(getPages(totalPages)), [totalPages])
   
    return useFetching(async (limit,page) => {
      if (limit<0) page = 1;
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data] )
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    })
}