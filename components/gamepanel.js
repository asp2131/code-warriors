import React from "react";
import MoveableCircle from "@/components/character"; // Adjust the path as needed
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated } from "@react-spring/web";

const GamePanel = (
    { handleClick, position, springs, toggleAnimation, ref } // Add the props you need
) => {
  return (
    <div
      style={{ position: "relative" }}
      onClick={handleClick}
      className="w-1/2  overflow-auto"
    >
      <Parallax pages={2}
      horizontal
    //    style={{ background: `linear-gradient(blue, #61a949)` }}
       >
        {/*  style={{ position: 'relative', width: '100%', height: '100%'}} */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={2}
          style={{
            backgroundImage: `url('https://pylnata.github.io/teddy/static/media/bg.c84a1df7.svg')`,
            backgroundSize: "cover",
          }}
        >
          <animated.div
            onClick={toggleAnimation}
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              ...springs,
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0.5}
          factor={3}
          style={{
            backgroundImage: `url('https://pylnata.github.io/teddy/static/media/bg.c84a1df7.svg')`,
            backgroundSize: "cover",
          }}
        >
          <animated.div
            onClick={toggleAnimation}
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              ...springs,
            }}
          />
        </ParallaxLayer>
        

        {/* <p>Here are your game instructions...</p> */}
      </Parallax>
      <MoveableCircle handleClick={handleClick} position={position} />
    </div>
  );
};

export default GamePanel;
