# Solar System Explorer Prototype

A high-fidelity, interactive 3D prototype of a solar system learning application. This project simulates a realistic educational environment where users can explore planets, view detailed scientific data, and take guided tours of our cosmic neighborhood.

![App Screenshot Placeholder](https://via.placeholder.com/800x400?text=Solar+System+Explorer+Preview)

## 🌟 Features

*   **Immersive 3D Simulation**: Real-time rendering of the solar system using `Three.js` and `React Three Fiber`.
*   **Interactive Planets**: Clickable planets with orbital mechanics and self-rotation.
*   **Educational Data Layers**: Detailed information panels for every planet, including physical characteristics and atmospheric data.
*   **Guided Tour Mode**: A step-by-step navigational tour through the solar system with interesting facts.
*   **Visual Customization**: Toggle orbits, labels, distance lines, and graphics settings via a dedicated UI.
*   **Responsive UI**: Modern, glassmorphism-inspired interface that works on desktop and mobile.
*   **Cinematic Transitions**: Smooth animations using `Framer Motion` for page loads, modals, and panel transitions.

## 🛠 Tech Stack

*   **Frontend Framework**: React 19
*   **Language**: TypeScript
*   **3D Engine**: Three.js / @react-three/fiber / @react-three/drei
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/solar-system-explorer.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd solar-system-explorer
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

Start the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📂 Project Structure

```
/
├── components/
│   ├── LoadingScreen.tsx    # Animated entry screen
│   ├── Overlay.tsx          # Main UI (Nav, Sidebars, Modals)
│   └── Scene3D.tsx          # 3D Canvas and Three.js logic
├── constants.ts             # Static planet data and content
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Main application controller
├── index.tsx                # Entry point
└── index.html               # HTML root
```

## 🎨 UI/UX Design Goals

*   **Theme**: Futuristic, NASA-inspired aesthetics with deep blacks, star whites, and electric blue accents.
*   **Interactivity**: Hover effects, smooth sliding panels, and immediate visual feedback.
*   **Accessibility**: Clear typography (Inter & Orbitron), high contrast text, and keyboard-navigable menus.

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
