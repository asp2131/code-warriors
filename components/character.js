import { useState } from 'react';
import { motion } from 'framer-motion';

const MoveableCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    // Get the bounding rectangle of the target container
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calculate the new position based on the click position
    // Subtract the circle size to center the circle on the cursor
    const x = event.clientX - rect.left - 25; // Assuming the circle has a diameter of 50px
    const y = event.clientY - rect.top - 25; // Adjust the offset as per your circle's size
    
    setPosition({ x, y });
  };

  return (
    <div
      onClick={handleClick}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer',
    //   backgroundImage: "url('https://www.pngkey.com/png/full/115-1150152_8-bit-mario-png-super-mario-8-bit.png')",
     }}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'blue',
          position: 'absolute',
        }}
      />
    </div>
  );
};

export default MoveableCircle;
