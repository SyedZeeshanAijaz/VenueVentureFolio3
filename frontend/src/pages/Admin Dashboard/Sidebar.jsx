import { Stack } from '@mui/material';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const categories = [
    { name: 'Dashboard', path: '/admin', icon: <HomeIcon /> },
    { name: 'Bookings', path: '/adminbookings', icon: <ChecklistIcon /> },
    { name: 'Venues', path: '/adminvenues', icon: <EventIcon /> },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Home');

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <Stack
      flexDirection="row"
      sx={{
        overflowY: 'auto',
        height: { sx: 'auto', md: '95%' },
        flexDirection: { md: 'column' },
        marginTop: { md: '10rem' }, // Add margin top for md breakpoint
      }}
    >
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className={`category-btn ${category.name === selectedCategory ? 'selected' : ''}`}
          style={{
            background: category.name === selectedCategory && '#2f5b98',
            color: category.name === selectedCategory ? 'white' : '#2f5b98',
          }}
          onClick={() => handleCategoryClick(category.name)}
        >
          <span style={{ color: category.name === selectedCategory ? 'white' : '#2f5b98', marginRight: '13px' }}>
            {category.icon}
          </span>
          <span>{category.name}</span>
        </Link>
      ))}
    </Stack>
  );
};

export default Sidebar;
