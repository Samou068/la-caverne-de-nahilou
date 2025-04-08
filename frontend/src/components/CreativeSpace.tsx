import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CreativeSpaceProps {
  onSave: (imageData: string) => void;
}

const CreativeSpace: React.FC<CreativeSpaceProps> = ({ onSave }) => {
  const [drawing, setDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];
  
  const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setCanvasContext(ctx);
      }
    }
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasContext) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      canvasContext.beginPath();
      canvasContext.moveTo(x, y);
      canvasContext.strokeStyle = color;
      canvasContext.lineWidth = brushSize;
      setDrawing(true);
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasContext) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  };
  
  const stopDrawing = () => {
    if (canvasContext) {
      canvasContext.closePath();
      setDrawing(false);
    }
  };
  
  const clearCanvas = () => {
    if (canvasContext) {
      const canvas = canvasContext.canvas;
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  
  const saveDrawing = () => {
    if (canvasContext) {
      const canvas = canvasContext.canvas;
      const imageData = canvas.toDataURL('image/png');
      onSave(imageData);
    }
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Espace Créatif</h2>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {colors.map((c) => (
          <motion.div
            key={c}
            className="w-8 h-8 rounded-full cursor-pointer border-2"
            style={{ backgroundColor: c, borderColor: c === color ? 'white' : 'transparent' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      
      <div className="mb-4">
        <label className="block text-white mb-2">Taille du pinceau: {brushSize}px</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <motion.canvas
        ref={handleCanvasRef}
        width={600}
        height={400}
        className="bg-white rounded-lg mb-4 w-full touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="flex gap-2">
        <motion.button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex-1"
          onClick={clearCanvas}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Effacer
        </motion.button>
        <motion.button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex-1"
          onClick={saveDrawing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sauvegarder
        </motion.button>
      </div>
    </div>
  );
};

export default CreativeSpace;
