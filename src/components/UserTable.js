import * as React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Tooltip from "@mui/material/Tooltip";

import LeaveCreditModal from "./LeaveCreditModal";

const UserTableNavigator = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, setLink, data } = props;

  console.log(data);

  console.log(rowsPerPage);
  const handleFirstPageButtonClick = () => {
    setLink(`${data.first_page_url}&per_page=${rowsPerPage}`);
  };

  const handleBackButtonClick = () => {
    setLink(`${data.prev_page_url}&per_page=${rowsPerPage}`);
  };

  const handleNextButtonClick = () => {
    setLink(`${data.next_page_url}&per_page=${rowsPerPage}`);
  };

  const handleLastPageButtonClick = () => {
    setLink(`${data.last_page_url}&per_page=${rowsPerPage}`);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const UserTable = ({ data, setPerPage, setLink }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(data?.per_page);
  const [currentEmployee, setCurrentEmployee] = React.useState();
  const [recordsModalOpen, setRecordsModalOpen] = React.useState(false);

  const page = data ? data?.current_page - 1 : 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.total) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPerPage(parseInt(event.target.value, 10));
    setLink(`${data.first_page_url}&per_page=${event.target.value}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976D24D" }}>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Position</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Date Employed</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow key={row.employee_id}>
              <TableCell component="th" scope="row">
                {row.first_name} {row.last_name}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.departments[0].department_name}</TableCell>
              <TableCell>{row.departments[0].job_title}</TableCell>
              <TableCell>{row.departments[0].employment_status}</TableCell>
              <TableCell>{row.departments[0].date_of_employment}</TableCell>
              <TableCell align="center">
                <Tooltip title="Leave Credits" placement="left">
                  <WorkHistoryIcon
                    onClick={() => {
                      setCurrentEmployee(row);
                      setRecordsModalOpen(true);
                    }}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              count={data.total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              // onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={(subProps) => (
                <UserTableNavigator
                  {...subProps}
                  data={data}
                  setLink={setLink}
                />
              )}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <LeaveCreditModal
        open={recordsModalOpen}
        setOpen={setRecordsModalOpen}
        data={currentEmployee}
      />
    </TableContainer>
  );
};

export default UserTable;
