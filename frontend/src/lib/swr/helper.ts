import axios from "../axios";

export const fetcher = async (url: string) => await axios.get(url).then(res => res.data)

export const options = {
  revalidateOnFocus: true, // Refresh when window/tab gets focus
  revalidateIfStale: true, // Revalidate if cached data is older than `dedupingInterval`
  revalidateOnReconnect: true, // Re-fetch when internet reconnects
  refreshInterval: 30000, // Auto refresh every 30s
  dedupingInterval: 10000, // Avoid calling API multiple times within 10s
  keepPreviousData: true, // Keep old data while fetching new
  errorRetryInterval: 5000, // Retry failed requests after 5s
  errorRetryCount: 3,
};