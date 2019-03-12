export class BallModel {
    constructor(x, y, radius, speed) {
        let _x = x,
            _y = y,
            _radius = radius,
            _speed = speed;

        this.getX = function () {
            return _x;
        }

        this.getY = function () {
            return _y;
        }

        this.getRadius = function () {
            return _radius;
        }

        this.setRadius = function (radius) {
            _radius = radius;
        }

        this.getSpeed = function () {
            return _speed;
        }

        this.setSpeed = function (speed) {
            _speed = speed;
        }
    }
}