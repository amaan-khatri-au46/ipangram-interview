import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { HiOutlineExclamation } from "react-icons/hi";

interface ConfirmDailoagProps {
  open: boolean;
  onCancel: () => void; // Function to handle cancel action
  onDelete: () => void; // Function to handle delete action
  loading: boolean;
  children: any;
  title: any;
}

const ConfirmDailoag: React.FC<ConfirmDailoagProps> = ({
  open,
  onCancel,
  onDelete,
  loading,
  children,
  title,
}) => {
  const handleDelete = async () => {
    await onDelete();
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xl">
      <DialogTitle className="flex gap-4 items-center">
        <Avatar className="text-red-600 bg-red-100 dark:text-red-100">
          <span className="text-2xl">
            <HiOutlineExclamation className="text-red-600" />
          </span>
        </Avatar>
        <p className="font-semibold">{title}</p>
      </DialogTitle>
      <DialogContent style={{ width: "450px" }}>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="primary"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="success"
          disabled={loading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDailoag;
