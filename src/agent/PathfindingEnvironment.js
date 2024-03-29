export class PathfindingEnvironment {
  constructor(
    gridHeight,
    gridWidth,
    startLocation,
    terminalLocation,
    hazardLocations
  ) {
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;
    this.startLocation = startLocation;
    this.terminalLocation = terminalLocation;
    this.hazardLocations = hazardLocations;
  }

  isInBounds(y, x, height, width) {
    return y >= 0 && y < height && x >= 0 && x < width;
  }

  isHazardLocation(y, x) {
    for (let i = 0; i < this.hazardLocations.length; i++) {
      if (y === this.hazardLocations[i].y && x === this.hazardLocations[i].x) {
        return true;
      }
    }
    return false;
  }

  start() {
    this.agentLocation = this.startLocation;
    this.reward = 0;
    this.termination = false;

    return this.agentLocation;
  }

  step(action) {
    let { y, x } = this.agentLocation;

    // UP
    if (action === 0) {
      y -= 1;
      // RIGHT
    } else if (action === 1) {
      x += 1;
      // DOWN
    } else if (action == 2) {
      y += 1;
      // LEFT
    } else if (action == 3) {
      x -= 1;
    } else {
      throw new Error("ERROR WHILE TAKING ACTION");
    }

    // IF NOT IN BOUNDS RETRIEVE y & x FROM agentLocation
    if (!this.isInBounds(y, x, this.gridHeight, this.gridWidth)) {
      // console.log("NOT IN BOUNDS");
      y = this.agentLocation.y;
      x = this.agentLocation.x;
    }
    // IS IN BOUNDS, SO SET NEW COORDS
    this.agentLocation = { y: y, x: x };

    // ENCOURAGE EXPLORATION
    this.reward = -2;
    this.terminal = false;

    // CHECK IF AGENT REACHED TERMINAL STATE
    if (y === this.terminalLocation.y && x === this.terminalLocation.x) {
      this.terminal = true;
      this.reward = 10;
      // console.log("TERMINAL LOCATION");
    }

    // CHECK IF AGENT IS IN HAZARD LOCATION
    if (this.isHazardLocation(y, x)) {
      this.agentLocation = this.startLocation;
      this.reward = -100;
      // console.log("HAZARD LOCATION");
    }

    return {
      reward: this.reward,
      terminal: this.terminal,
      agentLocation: this.agentLocation,
    };
  }
}
