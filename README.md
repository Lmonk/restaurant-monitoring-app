# RestorantApp

## Overview

**RestorantApp** is a powerful restaurant table monitoring system designed to display and manage hundreds of tables simultaneously. The app visually indicates the status of each table, highlighting any warnings and showing the current guest count.

## Features

- **Scalable**: Easily manage and display between 0 to 10,000 tables.
- **Real-Time Updates**: Every 5 seconds, 20% of tables are updated with new warning statuses and guest counts.
- **Visual Indicators**: Each table type is represented with SVG icons.
- **Warning Alerts**: Tables with `warning: true` are highlighted with a blinking shadow effect.
- **Load Indicators**: Tables are color-coded based on their occupancy:
  - **Red**: Occupancy > 75%
  - **Orange**: Occupancy > 50% and ≤ 75%
  - **Green**: Occupancy ≤ 50%
  - **Gray**: No occupancy (0%)

## Installation

To get started with **RestorantApp**, clone the repository and install the dependencies:

```sh
git clone https://github.com/Lmonk/restaurant-monitoring-app.git
cd restaurant-monitoring-app
npm install
```

## Usage

After installation, start the application by running:

```sh
npm start
```
