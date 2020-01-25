import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { graphql } from "../../../../util/graphql";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const USERS = `
  query($offset:Int!, $limit:Int!) {
    users(offset:$offset, limit:$limit) {
      list {
        id
        name
        email
        nick
        productReviewsCount
      }
      count
    }
  }
`;

const Users = (props: any) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    graphql({
      query: USERS,
      variables: {
        offset: page * rowsPerPage,
        limit: rowsPerPage
      }
    }).then(result => {
      setCount(result.users.count);
      setUsers(result.users.list);
    });
  }, [page]);

  return (
    <div>
      <h3>회원관리</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>닉네임</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>이메일</TableCell>
            <TableCell>리뷰 수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.id}</Link>
                </TableCell>
                <TableCell>{user.nick}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.productReviewsCount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 30]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, page) => setPage(page)}
        onChangeRowsPerPage={e => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
    </div>
  );
};

export default Users;
