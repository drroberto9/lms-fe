import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Container from "@mui/material/Container";

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
