import { BallModel } from './ballModel.js';
import { BallView } from './ballView.js';
import { BallController } from './ballController.js';

let $field = $('g.ball');

let modelBall = new BallModel(1, 10),
    viewBall = new BallView($field, modelBall),
    controllerBall = new BallController(modelBall, viewBall);

controllerBall.expandBall();
controllerBall.expandBall();
viewBall.getElement();
viewBall.draw();


console.log(viewBall.getElement());



// let timer = setInterval(() => {
//     let modelBall = new BallModel(1, 10),
//         viewBall = new BallView($field, modelBall),
//         controllerBall = new BallController(modelBall, viewBall);

//     controllerBall.expandBall();
//     viewBall.draw();
// }, 1000);


// console.log(modelBall.getRadius());

// let ball = new ModelBall(10, 2),
//     speed = ball.getSpeed();

// function apearBall(ball) {

//     let circles = $('circle');

//     console.log(circles);

//     $('g.ball').append(ball.createBall());
// }

// let s = 0;

// // let timer = setInterval(() => {
// s += speed;

// console.log(ball.getY());
// ball.setRadius(s);
// // apearBall(ball);
// // }, 1000);




