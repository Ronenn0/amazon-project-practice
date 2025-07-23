class Car {
    #brand;
    #model;
    #speed = 0;
    isTrunkOpen = false;
    acceleration = 5;
    topSpeed = 200;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.#speed} km/h, Trunk is ${this.isTrunkOpen ? 'opened' : 'closed'}`);
    }

    go() {
        if (this.isTrunkOpen) return;
        this.#speed += this.acceleration;
        this.limitSpeed();
    }
    brake() {
        this.#speed -= this.acceleration;
        this.limitSpeed();
    }
    limitSpeed() {
        if (this.#speed < 0) this.speed = 0;
        if (this.#speed > this.topSpeed) this.#speed = this.topSpeed;
    }
    openTrunk() {
        if (this.#speed > 0) return;
        this.isTrunkOpen = true;
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }
}
// const car1 = new Car('Toyota', 'Corolla');
// const car2 = new Car('Testa', 'Model 3');

// car1.displayInfo();
// car1.openTrunk();
// car1.go();
// car1.go();
// car1.closeTrunk();
// car1.go();
// car1.go();
// car1.brake();
// car1.brake();
// car1.displayInfo();
// car1.openTrunk();
// car1.displayInfo();


class RaceCar extends Car {
    topSpeed = 300;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    openTrunk() { }
    closeTrunk() { }

    // displayInfo() {
    //     console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
    // }
}

// const raceCar = new RaceCar('Toyota', 'Corolla', 20);

// raceCar.displayInfo();
// raceCar.openTrunk();
// raceCar.go();
// raceCar.go();
// raceCar.closeTrunk();
// raceCar.go();
// raceCar.go();
// raceCar.brake();
// raceCar.brake();
// raceCar.displayInfo();
// raceCar.openTrunk();
// raceCar.displayInfo();