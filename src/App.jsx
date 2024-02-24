import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(350);
  const [canvasHeight, setCanvasHeight] = useState(350);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    canvasRef.current = context;
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    canvasRef.current.beginPath();
    canvasRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    canvasRef.current.closePath();
    setIsDrawing(false);
  };

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
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          background: "white",
        }}
      />

      <button onClick={clearCanvas}>clear canvas</button>
    </div>
  );
}

export default App;
