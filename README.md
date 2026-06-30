# adaptive-traffic-signal-simulator
A greedy-algorithm traffic signal controller simulating adaptive vs fixed-timer intersection management.
# Adaptive Traffic Signal Simulator

A browser-based simulation comparing adaptive vs fixed-timer traffic signal control at a 4-way intersection, built using a greedy interval-scheduling algorithm and graph-based conflict modeling.

🔗 **[Live Demo](https://YOUR_USERNAME.github.io/adaptive-traffic-signal-simulator/)**

## Problem

Standard traffic signals use fixed green-light durations regardless of actual traffic density, leading to unnecessary wait times on busy lanes and wasted green time on empty ones.

## Approach

- Each lane (N/S/E/W) is modeled as a node in a **conflict graph**, where edges represent lanes that cannot be green simultaneously (e.g. N–E, N–W). Solving this via 2-coloring yields two non-conflicting phase groups: **Phase A (N+S)** and **Phase B (E+W)**.
- Green-light duration is allocated using a **greedy proportional scheduling algorithm**:
- followed by normalization to fit the fixed cycle window.
- Vehicle queues update live based on configurable arrival rates per lane, simulating real-world traffic fluctuation.

## Tech Stack

- **p5.js** for canvas rendering and animation
- Vanilla **JavaScript** for the scheduling algorithm
- **HTML/CSS** for the dashboard interface

## Features

- Real-time signal phase switching based on live vehicle density
- Adjustable arrival rates per lane via interactive sliders
- Live telemetry panel showing queue lengths and phase timing
- Responsive dark-themed dashboard UI

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/adaptive-traffic-signal-simulator.git
cd adaptive-traffic-signal-simulator
# Open index.html in your browser, or use Live Server in VS Code
```

## Future Improvements

- Side-by-side comparison panel against fixed-timer baseline
- Multi-intersection grid simulation
- A* based vehicle routing across the grid
