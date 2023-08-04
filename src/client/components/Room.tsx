import React, { useLayoutEffect } from "react";
import { useState } from "react";

const Room = ({
  width,
  height,
  gas,
  devices,
}: {
  width: number; // room size in meters
  height: number; // room size in meters
  gas: boolean;
  devices: {
    id: string; // device id
    ld: number; // distance from left wall in meters
    rd: number; // distance from right wall in meters
    sys: number; // systolic blood pressure
    dia: number; // diastolic blood pressure
    hr: number; // heart rate
    spo2: number; // blood oxygen saturation
    color: string; // color of dot
    opacity: number; // opacity of dot
  }[];
}) => {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth - 20, window.innerHeight - 40]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [screen_width, screen_height] = useWindowSize();

  // fit the room to the screen, maintaining aspect ratio, and scaling down if necessary
  const width_ratio = screen_width / width;
  const height_ratio = screen_height / height;
  const ratio = Math.min(width_ratio, height_ratio);

  const width_px_scaled = width * ratio;
  const height_px_scaled = height * ratio;

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: `${width_px_scaled}px`,
          height: `${height_px_scaled}px`,
          margin: "20 auto",
          // if gas is true, set border color to red, else set to 1px black
          border: `${gas ? "5px solid red" : "1px solid black"}`,
        }}
      >
        {/* draw the top left and right corners */}
        <div
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "black",
            left: "0",
            top: "0",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "black",
            right: "0",
            top: "0",
          }}
        ></div>
        {devices.map((device) => {
          function calculatePos(d1: number, d2: number, d1_from_d2: number) {
            // Calculate x position
            let x = (d1 ** 2 - d2 ** 2 + d1_from_d2 ** 2) / (2 * d1_from_d2);
            // Calculate y position
            let y = Math.sqrt(d1 ** 2 - x ** 2);

            return { x, y };
          }

          // calculate position of device
          const { x, y } = calculatePos(device.ld, device.rd, width);

          console.log({ x, y });
          console.log({ width_ratio, height_ratio });

          return (
            <div
              key={device.id}
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                // calculate color based on color, opacity
                // color is a hex string, opacity is a float
                backgroundColor: `#${device.color}${Math.floor(
                  device.opacity * 255
                ).toString(16)}`,
                left: `${x * ratio}px`,
                top: `${y * ratio}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Room;
