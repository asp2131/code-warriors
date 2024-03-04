import { useState } from 'react';
import { motion } from 'framer-motion';

const MoveableCircle = ({position, handleClick}) => {
 

  return (
    <>
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
    </>
  );
};

export default MoveableCircle;
