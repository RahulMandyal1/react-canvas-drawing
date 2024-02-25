import React, { useEffect, useRef, useState } from "react";

function App() {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    canvas.fillStyle = "white";
    canvasRef.current = context;
  };

  /*
   Inside  the side effect we can get the canvas element
  */
  useEffect(() => {
    initCanvas();
  }, []);

  /*When mouse is pressed we will make isDrawing true only on press we will draw something on our canvas*/
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    canvasRef.current.beginPath();
    canvasRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  /*
    On mouse up we will close the line and set the is drawing to false so that user is able to draw only on the
    mouse pressed 
  */
  const finishDrawing = () => {
    canvasRef.current.closePath();
    setIsDrawing(false);
  };

  /*
    On Mouse move get the coordinated and draw  the line where user move his/her mouse 
  */
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    canvasRef.current.lineTo(offsetX, offsetY);
    canvasRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.fillStyle = "white";
    canvas.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          background: "white",
          border: "1px solid green",
        }}
      />
      <div>
        <button onClick={clearCanvas}>clear canvas</button>
      </div>
    </React.Fragment>
  );
}

export default App;
