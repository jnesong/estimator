//libraries
import { useState } from 'react';
//css
import Button from '@mui/material/Button';

const AddItem = ( {holdItemCount} ) => {

    let [itemCount, setItemCount] = useState(2)

    const handleAddItem = () => {
        setItemCount( itemCount => itemCount+1)
        holdItemCount(itemCount)
    };

  return (
      <Button variant="outlined" color="success" onClick={handleAddItem}>
        Add New Item
      </Button>
  );
};

export default AddItem;