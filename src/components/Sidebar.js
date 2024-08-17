import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Checkbox, ListItemIcon, Divider, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = ({ drawerOpen, handleDrawerClose }) => {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkedWidgets, setCheckedWidgets] = useState({});

  useEffect(() => {
    if (selectedCategory) {
      console.log(selectedCategory);
      const initialCheckedState = {};
      selectedCategory.widgets.forEach(widget => {
        initialCheckedState[widget.name] = true;  // Default to true
      });
      setCheckedWidgets(initialCheckedState);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (widgetName) => {
    setCheckedWidgets(prevState => ({
      ...prevState,
      [widgetName]: !prevState[widgetName],
    }));
  };

  const handleConfirm = () => {
    // Update Redux with checked status
    const updatedCategories = categories.map(category => {
      if (category.name === selectedCategory.name) {
        return {
          ...category,
          widgets: category.widgets.map(widget => ({
            ...widget,
            checked: checkedWidgets[widget.name],
          })),
        };
      }
      return category;
    });

    dispatch({ type: 'UPDATE_CATEGORIES', payload: updatedCategories });
    handleDrawerClose();
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
      <div style={{ width: '300px', padding: '16px' }}>
        <Typography variant="h6" gutterBottom>Categories</Typography>
        <List style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <ListItem 
              button 
              key={category.name} 
              onClick={() => handleCategoryClick(category)} 
              style={{ width: 'auto', marginRight: '8px', border: '1px solid blue' }}
            >
              <ListItemText primary={category.name.split(" ")[0]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {selectedCategory && (
          <>
            <Typography variant="h6" gutterBottom>{selectedCategory.name}</Typography>
            <List>
              {selectedCategory.widgets.map(widget => (
                <ListItem key={widget.name}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checkedWidgets[widget.name] || false}
                      onChange={() => handleCheckboxChange(widget.name)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={widget.name} />
                </ListItem>
              ))}
            </List>
            <Button onClick={handleConfirm} color="primary" variant="contained" style={{ marginTop: '16px' }}>
              Confirm
            </Button>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default Sidebar;
