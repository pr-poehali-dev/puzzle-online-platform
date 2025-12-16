import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import HanoiTower from '@/components/HanoiTower';
import SlidingPuzzle from '@/components/SlidingPuzzle';

const PUZZLES = [
  {
    id: 1,
    title: 'Загадка Эйнштейна',
    category: 'Логика',
    difficulty: 'Сложная',
    rating: 4.8,
    solvers: 12453,
    description: 'Кто выращивает рыбок? Классическая логическая головоломка.',
    level: 1,
    time: '30 мин',
    icon: 'Brain',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Мосты Кёнигсберга',
    category: 'Математика',
    difficulty: 'Средняя',
    rating: 4.6,
    solvers: 8932,
    description: 'Можно ли пройти по всем мостам города, не проходя дважды?',
    level: 1,
    time: '20 мин',
    icon: 'Network',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Ханойская башня',
    category: 'Алгоритмы',
    difficulty: 'Средняя',
    rating: 4.7,
    solvers: 15678,
    description: 'Переместите все диски на другой стержень за минимум ходов.',
    level: 1,
    time: '15 мин',
    icon: 'Layers',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Судоку Самурай',
    category: 'Судоку',
    difficulty: 'Сложная',
    rating: 4.9,
    solvers: 6234,
    description: 'Пять пересекающихся судоку для настоящих мастеров.',
    level: 2,
    time: '45 мин',
    icon: 'Grid3x3',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    title: 'Пятнашки',
    category: 'Головоломки',
    difficulty: 'Средняя',
    rating: 4.6,
    solvers: 18934,
    description: 'Классическая игра на перемещение плиток.',
    level: 1,
    time: '15 мин',
    icon: 'Grid3x3',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 6,
    title: 'Шахматные этюды',
    category: 'Шахматы',
    difficulty: 'Сложная',
    rating: 4.8,
    solvers: 9876,
    description: 'Мат в 3 хода. Найдите единственное решение.',
    level: 2,
    time: '25 мин',
    icon: 'Crown',
    gradient: 'from-purple-600 to-blue-600'
  }
];

const LEADERS = [
  { name: 'Алексей К.', points: 12580, level: 15, avatar: '🏆' },
  { name: 'Мария С.', points: 11240, level: 14, avatar: '🥈' },
  { name: 'Дмитрий П.', points: 10890, level: 13, avatar: '🥉' },
  { name: 'Елена В.', points: 9750, level: 12, avatar: '⭐' },
  { name: 'Иван Л.', points: 8920, level: 11, avatar: '🎯' }
];

export default function Index() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<typeof PUZZLES[0] | null>(null);
  const [showHanoi, setShowHanoi] = useState(false);
  const [showSliding, setShowSliding] = useState(false);
  const [userLevel, setUserLevel] = useState(3);
  const [userXP, setUserXP] = useState(1250);
  const maxXP = userLevel * 1000;
  const progressPercent = (userXP / maxXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                🧩
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Головоломки Онлайн
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="font-medium">
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" className="font-medium">
                <Icon name="Library" size={18} className="mr-2" />
                Каталог
              </Button>
              <Button variant="ghost" className="font-medium">
                <Icon name="Trophy" size={18} className="mr-2" />
                Рейтинг
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90">
                Войти
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Тренируй мозг каждый день
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Более 10,000 головоломок для развития логики, памяти и интеллекта
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-8 hover:opacity-90 hover:scale-105 transition-all">
              <Icon name="Zap" size={20} className="mr-2" />
              Начать прямо сейчас
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover:scale-105 transition-all">
              <Icon name="Play" size={20} className="mr-2" />
              Как это работает
            </Button>
          </div>
          <div className="flex justify-center gap-12 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-purple-600">10K+</div>
              <div className="text-gray-600">Головоломок</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-pink-600">50K+</div>
              <div className="text-gray-600">Пользователей</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-orange-600">4.8★</div>
              <div className="text-gray-600">Рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-2xl animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Уровень {userLevel}</CardTitle>
                <CardDescription className="text-purple-100">
                  {userXP} / {maxXP} XP до следующего уровня
                </CardDescription>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                🎮
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="h-3 bg-white/20" />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <Icon name="Lock" size={24} className="mx-auto mb-2 opacity-50" />
                <div className="text-sm opacity-80">Уровень 5</div>
                <div className="font-semibold">Шахматы</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <Icon name="Lock" size={24} className="mx-auto mb-2 opacity-50" />
                <div className="text-sm opacity-80">Уровень 7</div>
                <div className="font-semibold">Криптография</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/40">
                <Icon name="Check" size={24} className="mx-auto mb-2" />
                <div className="text-sm opacity-80">Доступно</div>
                <div className="font-semibold">Математика</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/40">
                <Icon name="Check" size={24} className="mx-auto mb-2" />
                <div className="text-sm opacity-80">Доступно</div>
                <div className="font-semibold">Логика</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold">Популярные головоломки</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="SlidersHorizontal" size={16} className="mr-2" />
              Фильтры
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUZZLES.map((puzzle, idx) => (
            <Card
              key={puzzle.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in border-2 hover:border-purple-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => {
                if (puzzle.id === 3) {
                  setShowHanoi(true);
                } else if (puzzle.id === 5) {
                  setShowSliding(true);
                } else {
                  setSelectedPuzzle(puzzle);
                }
              }}
            >
              <CardHeader>
                <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${puzzle.gradient} flex items-center justify-center text-white text-5xl mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon name={puzzle.icon as any} size={64} className="drop-shadow-lg" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="font-medium">
                    {puzzle.category}
                  </Badge>
                  <Badge
                    variant={puzzle.level > userLevel ? 'outline' : 'default'}
                    className="font-medium"
                  >
                    {puzzle.level > userLevel ? (
                      <Icon name="Lock" size={12} className="mr-1" />
                    ) : null}
                    Ур. {puzzle.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{puzzle.title}</CardTitle>
                <CardDescription className="line-clamp-2">{puzzle.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{puzzle.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    <span>{puzzle.solvers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    <span>{puzzle.time}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
                  disabled={puzzle.level > userLevel}
                >
                  {puzzle.level > userLevel ? 'Заблокировано' : 'Решить головоломку'}
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8">Топ решателей месяца</h3>
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="space-y-4">
              {LEADERS.map((leader, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{leader.avatar}</div>
                    <div>
                      <div className="font-semibold text-lg">{leader.name}</div>
                      <div className="text-sm text-gray-600">Уровень {leader.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-purple-600">
                      {leader.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">очков</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={!!selectedPuzzle} onOpenChange={() => setSelectedPuzzle(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPuzzle && (
            <>
              <DialogHeader>
                <div className={`w-full h-40 rounded-lg bg-gradient-to-br ${selectedPuzzle.gradient} flex items-center justify-center text-white mb-4`}>
                  <Icon name={selectedPuzzle.icon as any} size={80} className="drop-shadow-lg" />
                </div>
                <DialogTitle className="text-2xl">{selectedPuzzle.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedPuzzle.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{selectedPuzzle.category}</Badge>
                  <Badge variant="outline">{selectedPuzzle.difficulty}</Badge>
                  <Badge>
                    <Icon name="Clock" size={12} className="mr-1" />
                    {selectedPuzzle.time}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <div className="text-2xl font-bold text-purple-600">{selectedPuzzle.rating}</div>
                    <div className="text-sm text-gray-600">Рейтинг</div>
                  </div>
                  <div className="p-3 rounded-lg bg-pink-50">
                    <div className="text-2xl font-bold text-pink-600">{selectedPuzzle.solvers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Решили</div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50">
                    <div className="text-2xl font-bold text-orange-600">+{selectedPuzzle.level * 100}</div>
                    <div className="text-sm text-gray-600">XP</div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg py-6 font-semibold hover:opacity-90">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать решение
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showHanoi} onOpenChange={setShowHanoi}>
        <DialogContent className="max-w-5xl">
          <HanoiTower />
        </DialogContent>
      </Dialog>

      <Dialog open={showSliding} onOpenChange={setShowSliding}>
        <DialogContent className="max-w-3xl">
          <SlidingPuzzle />
        </DialogContent>
      </Dialog>

      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">О проекте</h4>
              <p className="text-purple-200 text-sm">
                Головоломки Онлайн — крупнейшая платформа для развития интеллекта и логического мышления.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Разделы</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Каталог</li>
                <li className="hover:text-white cursor-pointer transition-colors">Рейтинг</li>
                <li className="hover:text-white cursor-pointer transition-colors">Форум</li>
                <li className="hover:text-white cursor-pointer transition-colors">Обучение</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Поддержка</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Контакты</li>
                <li className="hover:text-white cursor-pointer transition-colors">Правила</li>
                <li className="hover:text-white cursor-pointer transition-colors">API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <Button size="icon" variant="secondary" className="hover:scale-110 transition-transform">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="secondary" className="hover:scale-110 transition-transform">
                  <Icon name="Share2" size={20} />
                </Button>
                <Button size="icon" variant="secondary" className="hover:scale-110 transition-transform">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200 text-sm">
            © 2024 Головоломки Онлайн. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}