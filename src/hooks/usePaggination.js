import { useMemo, useState } from "react";
import PostService from "../API/PostService";
import { getPageCount, getPages } from "../utils/pages";
import { useFetching } from "./useFetching";

export const usePaggination = (setPosts, setPagesArray) => {
    const [totalPages, setTotalPages] = useState(0);
    
    useMemo(() => setPagesArray(getPages(totalPages)), [totalPages])
   
    return useFetching(async (limit,page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data)
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    })
}