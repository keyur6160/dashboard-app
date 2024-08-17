import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";

const AddWidgetDialog = ({ open, handleClose, newWidget, setNewWidget, addWidget }) => {
  const [errors, setErrors] = useState({ name: '', text: '' });

  const validate = () => {
    let tempErrors = { name: '', text: '' };
    if (!newWidget.name) tempErrors.name = 'Widget name is required';
    if (!newWidget.text) tempErrors.text = 'Widget text is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleAddWidget = () => {
    if (validate()) {
      addWidget();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle align="center">Add Widget</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Widget Name"
          fullWidth
          value={newWidget.name}
          onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Widget Text"
          fullWidth
          multiline
          rows={4}
          value={newWidget.text}
          onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
          error={!!errors.text}
          helperText={errors.text}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained" style={{ width: '5rem' }}>
          Cancel
        </Button>
        <Button onClick={handleAddWidget} color="primary" variant="contained" style={{ width: '5rem' }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWidgetDialog;