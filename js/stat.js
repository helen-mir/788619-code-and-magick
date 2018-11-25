var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MESSAGE_X = CLOUD_WIDTH - 40;
var MESSAGE_Y = 40;
var MESSAGE_GAP = 20;
var TEXT_FONT = '16px PT Mono';
var HISTOGRAM_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var NAME_WIDTH = 50;
var BAR_WIDTH = NAME_WIDTH + GAP;
var BAR_HEIGHT = CLOUD_HEIGHT - HISTOGRAM_HEIGHT;

//рисуем облако
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

//пишем текст поздравления с победой
var renderText = function(ctx) {
  ctx.font = TEXT_FONT;
  ctx.fillText('Ура вы победили!', MESSAGE_X, MESSAGE_Y);
  ctx.fillText('Список результатов:', MESSAGE_X, MESSAGE_Y + MESSAGE_GAP);
}

// далее нам нужно определить результаты игры
//определяем максимальное время
var getMaxElement = function(times) {
  var maxElement = times[0];

  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }

  return maxElement;
};

//задаем функцию смены цвета колонок с результатами игроков
var changeColor = function(names) {
  if (names[i] === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    return 'rgba(0, 0, 255, ' + Math.random() + ')';
  }
}

//рисуем гистограмму
var renderGameResults = function(ctx, names, times) {
  var maxTime = getMaxElement(times);
  for (var i = 0; i <names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH * i), CLOUD_Y + CLOUD_WIDTH - GAP );
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH * i), CLOUD_Y + BAR_HEIGHT, HISTOGRAM_WIDTH, (HISTOGRAM_HEIGHT * times[i]) / maxTime);
  }
}

//выводим все это на экран
window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  renderText(ctx);
  renderGameResults(ctx, names, times);
  changeColor(names);
};

