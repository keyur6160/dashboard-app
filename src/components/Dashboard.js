import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Paper, Button, IconButton, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import AddWidgetDialog from './AddWidgetDialog';
import '../dashboard.css';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();
  const [newWidget, setNewWidget] = useState({ name: '', text: '', category: '' });
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = (category) => {
    setCurrentCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewWidget({ name: '', text: '', category: '' });
  };

  const addWidget = () => {
    dispatch({ type: 'ADD_WIDGET', payload: { category: currentCategory, widget: { name: newWidget.name, text: newWidget.text,checked:true } } });
    setNewWidget({ name: '', text: '', category: '' });
    handleClose();
  };

  const removeWidget = (category, widgetName) => {
    dispatch({ type: 'REMOVE_WIDGET', payload: { category, widgetName } });
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) => widget.name.toLowerCase().includes(searchQuery.toLowerCase())||
    widget.text.toLowerCase().includes(searchQuery.toLowerCase())),
  }));

  return (
    <Container maxWidth="xl">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1px', backgroundColor: 'white' }}>
        <Typography variant="h4">Dashboard</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Button variant="contained" color="primary" onClick={handleDrawerOpen}>
            Add Widget <Add />
          </Button>
        </div>
      </div>
      {filteredCategories.map((category) => (
        <div key={category.name}>
          <Typography variant="h5" className="category-title" gutterBottom>
            {category.name}
          </Typography>
          <Grid container spacing={3}>
          {category.widgets
              .filter(widget => widget.checked) // Display only checked widgets
              .map(widget => (
              <Grid item xs={12} sm={6} md={4} key={widget.name} style={{ borderRadius: '4rem' }}>
                <Paper className="widget" elevation={13} style={{ padding: '16px', position: 'relative' }}>
                  <Typography variant="h6" className="widget-title">{widget.name}</Typography>
                  <Typography>{widget.text}</Typography>
                  <IconButton
                    style={{ position: 'absolute', top: '8px', right: '8px' }}
                    onClick={() => removeWidget(category.name, widget.name)}
                  >
                    <Close />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
            
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={13} className="widget" style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => handleClickOpen(category.name)} startIcon={<Add />}>
                    Add Widget
                  </Button>
                </Paper>
              </Grid>
            
          </Grid>
        </div>
      ))}
      <AddWidgetDialog
        open={open}
        handleClose={handleClose}
        newWidget={newWidget}
        setNewWidget={setNewWidget}
        addWidget={addWidget}
      />
      <Sidebar drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose} />
    </Container>
  );
};

export default Dashboard;