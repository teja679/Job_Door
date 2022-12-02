import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function CommonTable({ data, columnsName, handleClick }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columnsName.map((item) => (
              <StyledTableCell>{item.title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow
              key={i}
              sx={{
                pointerEvents: row.status === "approved" ? "none" : "unset",
                opacity: row.status === "approved" ? 0.4 : 1,
              }}
            >
              {columnsName.map((item) => {
                if (item.key === "buttons") {
                  return (
                    <Grid
                      sx={{
                        height: '100%',
                        margin: 0,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Button sx={{padding: '1rem 0'}} onClick={() => handleClick("accept", row)}>
                        Accept
                      </Button>
                      <Button sx={{padding: '1rem 0'}} onClick={() => handleClick("reject", row)}>
                        Reject
                      </Button>
                    </Grid>
                  );
                } else {
                  return <StyledTableCell>{row[item.key]}</StyledTableCell>;
                }
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;
