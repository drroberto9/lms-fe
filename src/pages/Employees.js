import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import axios from "../api/api";
import Header from "../components/Header";
import UserTable from "../components/UserTable";

const Employees = () => {
  const [cookies] = useCookies(["token"]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(20);
  const [link, setLink] = useState(`/api/users?per_page=${perPage}`);

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(link, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          setEmployees(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [perPage, link]);

  return (
    <div>
      <Header />
      <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
        <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={6} align="left">
              <Typography variant="h5">LIST OF EMPLOYEES</Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Button variant="contained">ADD EMPLOYEE</Button>
            </Grid>
          </Grid>
        </Box>

        {!loading && (
          <UserTable
            data={employees}
            setPerPage={setPerPage}
            setLink={setLink}
          />
        )}
      </Container>
    </div>
  );
};

export default Employees;
