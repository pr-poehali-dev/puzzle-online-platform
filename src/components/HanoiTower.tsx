import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Disk {
  size: number;
  id: number;
}

export default function HanoiTower() {
  const [towers, setTowers] = useState<Disk[][]>([
    [{ size: 3, id: 3 }, { size: 2, id: 2 }, { size: 1, id: 1 }],
    [],
    []
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [minMoves] = useState(7);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
    if (towers[2].length === 3 && towers[2][0].size === 3) {
      setIsWon(true);
      setIsRunning(false);
    }
  }, [towers]);

  const handleTowerClick = (towerIndex: number) => {
    if (!isRunning) setIsRunning(true);

    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      if (selectedTower === towerIndex) {
        setSelectedTower(null);
        return;
      }

      const fromTower = towers[selectedTower];
      const toTower = towers[towerIndex];
      const disk = fromTower[fromTower.length - 1];

      if (toTower.length === 0 || disk.size < toTower[toTower.length - 1].size) {
        const newTowers = [...towers];
        newTowers[selectedTower] = fromTower.slice(0, -1);
        newTowers[towerIndex] = [...toTower, disk];
        setTowers(newTowers);
        setMoves(moves + 1);
      }

      setSelectedTower(null);
    }
  };

  const resetGame = () => {
    setTowers([
      [{ size: 3, id: 3 }, { size: 2, id: 2 }, { size: 1, id: 1 }],
      [],
      []
    ]);
    setSelectedTower(null);
    setMoves(0);
    setIsWon(false);
    setTime(0);
    setIsRunning(false);
  };

  const getDiskColor = (size: number) => {
    const colors = {
      1: 'bg-gradient-to-r from-purple-400 to-pink-400',
      2: 'bg-gradient-to-r from-blue-400 to-cyan-400',
      3: 'bg-gradient-to-r from-orange-400 to-red-400'
    };
    return colors[size as keyof typeof colors];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Ханойская башня</CardTitle>
          <Button onClick={resetGame} variant="outline" size="sm">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сброс
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <Badge variant="secondary" className="text-base px-4 py-2">
            <Icon name="Move" size={16} className="mr-2" />
            Ходов: {moves}
          </Badge>
          <Badge variant="secondary" className="text-base px-4 py-2">
            <Icon name="Target" size={16} className="mr-2" />
            Минимум: {minMoves}
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
                <h3 className="text-2xl font-bold text-green-700 mb-1">Поздравляем!</h3>
                <p className="text-green-600">
                  Вы решили головоломку за {moves} ходов и {formatTime(time)}
                  {moves === minMoves && ' 🏆 Идеальное решение!'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
          <div className="flex justify-between items-end gap-4 h-64">
            {towers.map((tower, towerIndex) => (
              <div
                key={towerIndex}
                className={`flex-1 flex flex-col items-center justify-end cursor-pointer transition-all ${
                  selectedTower === towerIndex
                    ? 'scale-105 opacity-100'
                    : 'opacity-90 hover:opacity-100'
                }`}
                onClick={() => handleTowerClick(towerIndex)}
              >
                <div className="flex flex-col-reverse items-center gap-1 mb-2">
                  {tower.map((disk) => (
                    <div
                      key={disk.id}
                      className={`h-8 rounded-lg ${getDiskColor(disk.size)} shadow-lg transition-all duration-300 hover:shadow-xl ${
                        selectedTower === towerIndex && tower[tower.length - 1].id === disk.id
                          ? 'ring-4 ring-purple-400 -translate-y-2'
                          : ''
                      }`}
                      style={{
                        width: `${disk.size * 40}px`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <div className="w-2 h-48 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-lg" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-gray-500 to-gray-700 rounded-lg" />
                </div>

                <div className="mt-4">
                  <Badge
                    variant={selectedTower === towerIndex ? 'default' : 'outline'}
                    className="text-sm"
                  >
                    Башня {towerIndex + 1}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Правила:</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Переместите все диски с первой башни на третью</li>
                <li>• Можно перемещать только верхний диск</li>
                <li>• Нельзя класть больший диск на меньший</li>
                <li>• Минимальное количество ходов: 2ⁿ - 1, где n — количество дисков</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
