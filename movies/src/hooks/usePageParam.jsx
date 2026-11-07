import { useSearchParams } from "react-router";

export const MAX_PAGES = 500;

export default function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = parseInt(searchParams.get("page"), 10);
  const page =
    Number.isInteger(requested) && requested >= 1 && requested <= MAX_PAGES ? requested : 1;

  const setPage = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", value);
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [page, setPage];
}
