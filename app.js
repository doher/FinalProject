'use strict';

import {
    BallModel
} from './ballModel.js';
import {
    BallView
} from './ballView.js';
import {
    BallController,
    MAX_RADIUS
} from './ballController.js';

let $field = $('.game-field'),
    $svg = $('g.ball'),
    $newGameButton = $('.nav-start-game'),
    controllerArray = [],
    modelArray = [],
    startTime = Date.now(),
    playTime = 10000,
    score = 0,
    isStartGame = false;

$newGameButton.click(function () {
    if (!isStartGame) {
        PlanNextTick();
        isStartGame = true;
    }
});

$field.on('click', handler);

let RequestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

function randomCoords(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function addBall(field) {
    let height = field.height(),
        width = field.width(),
        x = randomCoords(MAX_RADIUS, width - MAX_RADIUS),
        y = randomCoords(MAX_RADIUS, height - MAX_RADIUS),
        isIncorrect = false;

    if (controllerArray.length) {

        $svg.children().each(function (i, item) {
            let cx = $(item).attr('cx'),
                cy = $(item).attr('cy'),
                distance = Math.sqrt(Math.pow((cx - x), 2) +
                    Math.pow((cy - y), 2));

            if (distance < 2 * MAX_RADIUS) {
                isIncorrect = true;
            }
        });
    }

    if (isIncorrect) {
        return addBall($field);
    }

    let model = new BallModel(x, y),
        view = new BallView(),
        controller = new BallController();

    model.start(view);
    view.start(model, $svg);
    controller.start(model);

    controllerArray.push(controller);
    modelArray.push(model);
}

function Tick() {

    controllerArray.forEach((item) => {
        item.expandBall();
    });

    modelArray = modelArray.filter((item) => {

        if (item.getRadius() > 0) {
            return item;
        }

        score -= 500;
    });

    PlanNextTick();
}

function PlanNextTick() {
    let timePassed = Date.now() - startTime,
        $spanTime = $('.time'),
        $spanYourScore = $('.your-score'),
        $balls = $('circle'),
        ballsLength = $balls.length,
        leftTime = playTime - timePassed;

    if ((playTime * 0.75 < leftTime) && (leftTime < playTime)) {

        if (ballsLength < 2) {
            addBall($field);
        }

    } else if ((playTime * 0.5 < leftTime) && (leftTime < playTime * 0.75)) {

        if (ballsLength < 3) {
            addBall($field);
        }

    } else if ((playTime * 0.25 < leftTime) && (leftTime < playTime * 0.5)) {

        if (ballsLength < 4) {
            addBall($field);
        }

    } else if ((0 < leftTime) && (leftTime < playTime * 0.25)) {

        if (ballsLength < 5) {
            addBall($field);
        }
    }

    leftTime < 0 ? $spanTime.text(0) : $spanTime.text(leftTime / 1000);

    $spanYourScore.text(score);

    if (timePassed < playTime) {
        RequestAnimationFrame(Tick);
    } else {
        $field.off('click', handler);
    }
}

function handler(eo) {
    let item = eo.target;

    score -= 100;

    if ($(item).attr('r')) {
        let $x = $(item).attr('cx'),
            $y = $(item).attr('cy');

        $(item).remove();
        score += 400;
        addBall($field);

        modelArray = modelArray.filter((item) => {

            if (item.getX() != $x && item.getY() != $y) {
                return item;
            }
        });
    }
};

$().ready(function () {
    $('body').click(function (eo) {
        eo.preventDefault();

        let item = $('.start-game');

        if (item) {
            startGame();
        }
    });

    function startGame() {
        location.hash = 'field';
    }

    window.onhashchange = loadNewPage;

    loadNewPage();

    function loadNewPage() {
        let hash = location.hash.substr(1);

        switch (hash) {
            case 'field':
                loadGamePage();
                break;

            default:
                loadMainPage();
                break;
        }
    }

    function loadMainPage() {
        $.ajax('main.html', {
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                $('.main-content').children().remove();
                $('.main-content').html(data);
            }
        });
    }

    function loadGamePage() {
        $.ajax('field.html', {
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                $('.main-content').children().remove();
                $('.main-content').html(data);
            }
        });
    }
});


