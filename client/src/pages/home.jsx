import React from "react";
import TableGenieLanding from "../components/TableGenieLanding";


import {useState} from "react"

const Home = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <TableGenieLanding />
    </>
  );
};

export default Home;
