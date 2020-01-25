import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import Axios from "axios";

const CreateProductDialog = ({ onCreate }: { onCreate: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCreate = async () => {
    await Axios.post(
      "http://localhost:5000/products",
      { name, price, image_url: imageUrl },
      { withCredentials: true }
    );
    setName("");
    setPrice(0);
    setImageUrl("");
    onCreate();
    handleClose();
  };

  return (
    <>
      <Fab
        color="primary"
        style={{ float: "right" }}
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>상품 추가</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            label="상품명"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
          <TextField
            value={price}
            label="가격"
            type="number"
            fullWidth
            onChange={e => setPrice(Number(e.target.value))}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <TextField
            value={imageUrl}
            label="이미지 주소"
            fullWidth
            onChange={e => setImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleCreate} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProductDialog;
