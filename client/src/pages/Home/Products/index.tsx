import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { graphql } from "../../../util/graphql";
import CreateProductDialog from "./CreateProductDialog";
import ProductDialog from "./ProductDialog";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const PRODUCT = `
query($offset: Int!, $limit: Int!) {
  products(offset: $offset, limit: $limit) {
    list {
      id
      name
      price
      image_url
    }
    count
  }
}
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [dialogProductId, setDialogProductId] = useState(0);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

  const loadData = async () => {
    const result = await graphql({
      query: PRODUCT,
      variables: {
        offset: page * rowsPerPage,
        limit: rowsPerPage
      }
    });
    setCount(result.products.count);
    setProducts(result.products.list);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div>
      <h3>
        상품관리
        <CreateProductDialog
          onCreate={() => {
            if (page === 0) {
              loadData();
            } else {
              setPage(0);
            }
          }}
        />
      </h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>상품이름</TableCell>
            <TableCell>가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: any, i) => {
            return (
              <TableRow key={i} onClick={() => setDialogProductId(product.id)}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
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
      <ProductDialog
        dialogProductId={dialogProductId}
        setDialogProductId={setDialogProductId}
      />
    </div>
  );
};

export default Products;
