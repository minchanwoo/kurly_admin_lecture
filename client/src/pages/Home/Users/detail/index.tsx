import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { graphql } from "../../../../util/graphql";

const UserDetail = ({
  history,
  match: {
    params: { id }
  }
}: any) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    nick: "",
    productReviews: []
  });
  useEffect(() => {
    graphql({
      query: `
        query($id: ID!) {
          user(id: $id) {
            name
            email
            nick
            productReviews {
              id
              title
              text
            }
          }
        }
      `,
      variables: { id }
    }).then(result => {
      setUser(result.user);
    });
  }, [id]);

  return (
    <div>
      <h3>사용자 상세</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>이메일</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>닉네임</TableCell>
            <TableCell>{user.nick}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              <strong>사용자 리뷰 목록</strong>
            </TableCell>
          </TableRow>
          {user.productReviews.map((review: any) => {
            return (
              <TableRow key={review.id}>
                <TableCell>{review.id}</TableCell>
                <TableCell>{review.title}</TableCell>
                <TableCell>{review.text}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div>
        <Button onClick={() => history.push("/users")}>사용자 목록 보기</Button>
      </div>
    </div>
  );
};

export default UserDetail;
