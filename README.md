# Pathfinding Simulation Project

This project implements a grid-based pathfinding simulator using Q-learning, an algorithm from reinforcement learning. The simulator provides an interactive UI built with React and styled using Tailwind CSS, allowing users to train and observe an agent as it learns to navigate a map.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

## Quickstart

First, make sure you have [Node.js](https://nodejs.org/) installed to manage the project's dependencies.

To get started, clone the project and install its dependencies:

```sh
git clone https://github.com/mweglowski/pathfinding_simulator.git
cd pathfinding_simulator
npm install
```

To run the application in development mode:

```sh
npm start
```

This will open the simulator in your default web browser. For production builds, you can use:

```sh
npm run build
```

## Features
- Interactive grid-based simulation environment.
- Real-time training and visualization of the Q-learning agent's decisions.
- Customizable simulation parameters, such as the number of episodes, steps per episode, step size, discount factor, and exploration rate (epsilon).
- Ability to reset and reconfigure the simulation environment.

## Reinforcement Learning Strategies
The simulator employs the Q-learning algorithm, which involves an agent that learns to navigate from a starting point to a terminal position on a grid while avoiding obstacles. Here's how it works:

- Episodes and Steps: You can set the number of episodes and steps per episode to train the agent.
- Q-Values Update: After each action, the agent updates its Q-values based on the reward received and the maximum future reward.
- Epsilon-Greedy Strategy: The agent follows an epsilon-greedy strategy, where it selects a random action with probability epsilon and the best-known action otherwise.

## Usage
After launching the simulator, you can interact with the UI by selecting different actions for training the agent, observing the agent's progress, and adjusting training parameters. You can start or reset the training and visualize the agent's learned values on the grid.

## Preview

![Mobile Preview](https://i.imgur.com/U1x4pzh.png)
![Mobile Preview](https://i.imgur.com/Gk7N3An.png)
![Mobile Preview](https://i.imgur.com/HGxkta9.png)
![Mobile Preview](https://i.imgur.com/B9lSGRi.png)
![Mobile Preview](https://i.imgur.com/e4Z7LTu.png)
![Mobile Preview](https://i.imgur.com/lygRAS2.png)

## Website
Explore the simulator online at https://pathfinding-simulator.vercel.app/.

## Contributing
Contributions are welcome! If you have suggestions or improvements, please fork the repository, make changes, and submit a pull request.

---

*Inspired by the foundational reinforcement learning work of Sutton and Barto.*

