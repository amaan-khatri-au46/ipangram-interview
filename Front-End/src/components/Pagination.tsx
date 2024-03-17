import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";

export interface PaginationProps {
  currentPage?: number;
  total?: number;
  pageSize?: number;
  displayTotal?: boolean;
  onChange?: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  total = 0 ,
  pageSize = 1,
  displayTotal = false,
  onChange,
}) => {
  const theme = useTheme();

  const pageCount = Math.ceil(total / pageSize);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChange && onChange(value);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <MuiPagination
        color="primary"
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: theme.palette.mode === "dark" ? common.white : common.black,
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
