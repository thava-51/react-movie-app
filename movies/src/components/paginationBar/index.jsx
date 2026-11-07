import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { MAX_PAGES } from "../../hooks/usePageParam";

const PaginationBar = ({ page, totalPages, onChange }) => {
  const count = Math.min(totalPages, MAX_PAGES);
  if (!count || count <= 1) {
    return null;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(event, value) => onChange(value)}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        siblingCount={2}
      />
    </Box>
  );
};

export default PaginationBar;
