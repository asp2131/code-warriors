import React from 'react';
import * as Progress from '@radix-ui/react-progress';

const progressType = {
    default: '#FFD700',
    health: '#5ACC4E',
    experience: '#195CFA',
    level: 'level',
    achievements: 'achievements',
};


const ProgressBar = ({
        progress = 0,
        setProgress,
        type
}) => {

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(progress), 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <Progress.Root style={{
        backgroundColor: progressType[type]
    }} className="ProgressRoot" value={progress}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;