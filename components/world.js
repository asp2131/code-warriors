import React, { useState } from "react";
import MoveableCircle from "@/components/character"; // Adjust the path as needed
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated } from "@react-spring/web";
import { AnimatedTooltip } from "@/components/toolwarp";
import Progress from "./progress";
import { useGameContext } from "@/context/gameContext";
import HorizontalPixelTransition from "../components/pixelTransition/horizontal";

const GamePanel = (
  {
    handleClick,
    position,
    springs,
    toggleAnimation,
    menuIsActive,
    setMenuIsActive,
  } // Add the props you need
) => {
  const { health, setHealth, experience, setExperience, level, setLevel } =
    useGameContext();

  return (
    <div
      style={{ position: "relative" }}
      onClick={handleClick}
      className="w-1/2  overflow-auto"
    >
      <Parallax pages={2} horizontal>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={2}
          style={{
            backgroundImage: `url('https://pylnata.github.io/teddy/static/media/bg.c84a1df7.svg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="stats">
            <div className="health">HP</div>
            <Progress
              progress={health}
              setProgress={setHealth}
              type={"health"}
            />
            <div className="exp">
              <div className="expbar">Exp</div>
              <Progress
                progress={experience}
                setProgress={setExperience}
                type={"experience"}
              />
              <h1>{`Level ${level}`}</h1>
            </div>
          </div>

          <AnimatedTooltip tooltip={"Functions Lv4"}>
            <animated.div
              onClick={() => setMenuIsActive(!menuIsActive)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 4,
                ...springs,
              }}
            />
          </AnimatedTooltip>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={1}
          factor={1}
          style={{
            backgroundImage: `url('https://pylnata.github.io/teddy/static/media/bg.c84a1df7.svg')`,
            backgroundSize: "cover",
          }}
        >
          <AnimatedTooltip tooltip={"Functions Lv4"}>
            <animated.div
              onClick={toggleAnimation}
              style={{
                width: 40,
                height: 40,
                borderRadius: 4,
                ...springs,
              }}
            />
          </AnimatedTooltip>
        </ParallaxLayer>
        <MoveableCircle handleClick={handleClick} position={position} />
        {/* <p>Here are your game instructions...</p> */}
      </Parallax>
      <HorizontalPixelTransition
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
    </div>
  );
};

export default GamePanel;
