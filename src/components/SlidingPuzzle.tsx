import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Tile = number | null;

const WINNING_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];

export default function SlidingPuzzle() {
  const [tiles, setTiles] = useState<Tile[]>(WINNING_STATE);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && !isWon) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isWon]);

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(WINNING_STATE) && moves > 0) {
      setIsWon(true);
      setIsRunning(false);
    }
  }, [tiles, moves]);

  const getEmptyIndex = () => tiles.indexOf(null);

  const canMove = (index: number): boolean => {
    const emptyIndex = getEmptyIndex();
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const moveTile = (index: number) => {
    if (!canMove(index)) return;

    if (!isRunning) setIsRunning(true);

    const newTiles = [...tiles];
    const emptyIndex = getEmptyIndex();
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoves(moves + 1);
  };

  const shuffle = () => {
    setIsShuffling(true);
    const newTiles = [...WINNING_STATE];
    
    for (let i = 0; i < 200; i++) {
      const emptyIndex = newTiles.indexOf(null);
      const possibleMoves: number[] = [];
      
      const row = Math.floor(emptyIndex / 4);
      const col = emptyIndex % 4;
      
      if (row > 0) possibleMoves.push(emptyIndex - 4);
      if (row < 3) possibleMoves.push(emptyIndex + 4);
      if (col > 0) possibleMoves.push(emptyIndex - 1);
      if (col < 3) possibleMoves.push(emptyIndex + 1);
      
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [newTiles[emptyIndex], newTiles[randomMove]] = [newTiles[randomMove], newTiles[emptyIndex]];
    }
    
    setTiles(newTiles);
    setMoves(0);
    setIsWon(false);
    setTime(0);
    setIsRunning(false);
    
    setTimeout(() => setIsShuffling(false), 500);
  };

  const resetGame = () => {
    setTiles(WINNING_STATE);
    setMoves(0);
    setIsWon(false);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTileColor = (tile: number | null) => {
    if (tile === null) return '';
    const hue = ((tile - 1) * 25) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Пятнашки</CardTitle>
          <div className="flex gap-2">
            <Button onClick={shuffle} variant="outline" size="sm" disabled={isShuffling}>
              <Icon name="Shuffle" size={16} className="mr-2" />
              Перемешать
            </Button>
            <Button onClick={resetGame} variant="outline" size="sm">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Сброс
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Badge variant="secondary" className="text-base px-4 py-2">
            <Icon name="Move" size={16} className="mr-2" />
            Ходов: {moves}
          </Badge>
          <Badge variant="secondary" className="text-base px-4 py-2">
            <Icon name="Timer" size={16} className="mr-2" />
            {formatTime(time)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isWon && (
          <div className="mb-6 p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 animate-scale-in">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🎉</div>
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-1">Отлично!</h3>
                <p className="text-green-600">
                  Вы собрали пазл за {moves} ходов и {formatTime(time)}!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="grid grid-cols-4 gap-3 aspect-square max-w-md mx-auto">
            {tiles.map((tile, index) => (
              <button
                key={index}
                onClick={() => moveTile(index)}
                disabled={tile === null || isShuffling}
                className={`
                  aspect-square rounded-xl text-2xl font-bold shadow-lg transition-all duration-200
                  ${tile === null 
                    ? 'bg-transparent cursor-default' 
                    : canMove(index)
                      ? 'hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95'
                      : 'cursor-not-allowed opacity-70'
                  }
                  ${isShuffling ? 'animate-pulse' : ''}
                `}
                style={{
                  backgroundColor: tile !== null ? getTileColor(tile) : 'transparent',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {tile}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Правила:</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Переместите все плитки по порядку от 1 до 15</li>
                <li>• Можно перемещать только плитки рядом с пустой клеткой</li>
                <li>• Кликайте на плитку, чтобы переместить её в пустое место</li>
                <li>• Цель: расположить числа последовательно слева направо, сверху вниз</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
