// 2-Suppose that we play playstation
// football game and during the game we want to change the game plan
//     (attack -defence - meduim)

class playing {
  play() {
    throw new Error(`You are not playing a startegy`);
  }
}

class medium extends playing {
  constructor(speed) {
    super();
    this.playerSpeed = speed;
  }
  play() {
    console.log(
      `Player is playing in medium Strategy with speed ${this.playerSpeed}`,
    );
  }
}

class defence extends playing {
  constructor(speed, power) {
    super();
    this.playerSpeed = speed;
    this.defencePower = power;
  }
  play() {
    console.log(
      `Player is playing in defence Strategy with speed ${this.playerSpeed} and a defence power of ${this.defencePower}`,
    );
  }
}

class attack extends playing {
  constructor(speed, power, damage) {
    super();
    this.playerSpeed = speed;
    this.attackPower = power;
    this.playerDamage = damage;
  }
  play() {
    console.log(
      `Player is playing in Attack Strategy with speed ${this.playerSpeed} and an attack power of ${this.attackPower} and his damage Capabilities is ${this.playerDamage}`,
    );
  }
}

class FootBallGameStrategy {
  constructor(strategy) {
    this.gameStrategy = strategy;
  }

  changeGameStartgy(strategy) {
    this.gameStrategy = strategy;
  }

  playingStratgy() {
    return this.gameStrategy.play();
  }
}

let player1 = new FootBallGameStrategy(new attack(20, 30, 10));
player1.playingStratgy();
player1.changeGameStartgy(new defence(40, 90));
player1.playingStratgy();
