# Contribution Guide for the CS50P Mind Map Project

Welcome to the CS50P Mind Map project! Thank you for your interest in contributing to make this tool even better. This guide aims to provide all the necessary information for you to collaborate effectively and harmoniously.

## 1. Introduction

### Welcome to Contributors

Welcome to the CS50P Mind Map contributor community! Your help is essential for the continuous growth and improvement of this project. We want your contribution experience to be rewarding and productive.

### Project Overview

The "CS50P Mind Map" is an interactive Progressive Web App (PWA), developed with **React + Vite + TypeScript**, designed to assist in studying CS50's Introduction to Programming with Python. It offers a dynamic mind map, a quiz system, a user profile with progress tracking, and offline mode support. The project is hosted on GitHub and prepared for future publication on the Google Play Store.

### Collaboration Objectives

Our main goal is to create a robust and accessible educational tool. Your contributions can help us to:

- Improve user experience (UX) and user interface (UI).
- Add new features and enhance existing ones.
- Fix bugs and optimize performance.
- Expand educational content and documentation.
- Ensure the quality and stability of the application.

## 2. Project Access

### How to Access via Shared Link

The project can be accessed in several ways, depending on the type of contribution you wish to make. For external collaborators, access can be facilitated through a shared link that directs to the GitHub repository or to a specific development instance.

### Different Types of Access Possible

- **GitHub:** The official project repository is the central point for all code contributions, documentation, and issue management.
- **Development Environment:** To test functionalities or develop, you will need to set up a local environment.
- **Documentation:** Project documentation, including this guide, is available in the repository.

### Necessary Technical Requirements

To contribute code, you will need:

- A GitHub account.
- Basic knowledge of Git and GitHub.
- Knowledge of JavaScript, TypeScript, and React.

## 3. Understanding the Structure

### Project Architecture

The project is built with the following main technologies:

- **Frontend:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with permanent dark mode)
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Offline Storage:** IndexedDB
- **PWA:** Service Worker

### Main Directories and Files

To facilitate project navigation and understanding, we present an overview of the directory structure. This organization aims for modularity and clarity:

```
.github/
├── workflows/ # CI/CD Workflows (e.g., GitHub Actions for testing and deployment)
public/
├── # Static files that are served directly (e.g., index.html, manifest.json, icons)
src/
├── assets/ # Images, custom icons, fonts, and other static resources
├── components/ # Reusable and generic React components (e.g., buttons, cards, modals)
├── hooks/ # Custom React Hooks for reusable state and effect logic
├── lib/ # Specific utilities and configurations (e.g., shadcn/ui initialization, helper functions)
├── pages/ # Page components, representing the different routes of the application
├── services/ # Business logic and integration with external APIs or IndexedDB
├── store/ # Global state management for the application (e.g., using Zustand or Redux)
├── types/ # TypeScript type definitions for interfaces, props, states, etc.
├── utils/ # General utility functions that don't fit into other categories
├── App.tsx # Main application component, where routes and global layout are defined
├── main.tsx # Application entry point, responsible for rendering the App component
├── index.css # Global application styles, including Tailwind CSS directives
├── vite-env.d.ts # Vite environment definitions for TypeScript
```

*Where screenshots/diagrams would be useful:* A component diagram or a visual map of the folder structure would be very useful here for visual collaborators.

### Technologies Used

A detailed list of the main technologies that make up the CS50P Mind Map:

- **React 18:** Declarative and efficient JavaScript library for building interactive user interfaces.
- **Vite:** Next-generation build tool that offers an extremely fast development experience for modern web projects.
- **TypeScript:** A superset of JavaScript that adds optional static typing, improving code robustness and developer productivity.
- **Tailwind CSS:** A utility-first CSS framework that allows building custom designs quickly, focusing on responsiveness and maintainability. The project uses **permanent dark mode**.
- **Lucide React:** An open-source, lightweight, and highly customizable icon library, integrated directly into React components.
- **shadcn/ui:** A collection of reusable, accessible, and customizable UI components, built with Tailwind CSS and Radix UI.
- **IndexedDB:** A low-level API for structured data storage on the client side, essential for the PWA's offline functionality.
- **Service Worker:** A script that the browser runs in the background, separate from the web page, allowing functionalities such as resource caching for offline mode and push notifications, crucial features for PWAs.

### Implemented Features

The CS50P Mind Map already has the following features:

- **Interactive Mind Map:** A dynamic visual representation of the CS50P course content, allowing navigation and exploration of topics.
- **Quiz System:** Question and answer modules to test user knowledge of course concepts.
- **User Profile:** Functionality to track user progress, save preferences, and personalize the experience.
- **Offline Mode:** Ability to access content and some functionalities even without an internet connection, thanks to the Service Worker and IndexedDB.
- **Progressive Web App (PWA):** Offers a native app experience directly in the browser, with home screen installation and offline access.

## 4. Local Environment Setup

To start developing and testing your contributions, follow these steps to set up your local environment:

### Prerequisites

Make sure you have the following tools installed on your machine. They are essential for development with React, Vite, and TypeScript:

- **Node.js:** Version 18 or higher. It is the JavaScript runtime environment that allows running the development server and build tools. You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm:** A fast and efficient package manager that optimizes disk space usage and dependency installation. Install it globally with `npm install -g pnpm`.
- **Git:** The industry-standard distributed version control system. It is essential for cloning the repository, managing branches, and submitting your contributions. Download it from [git-scm.com](https://git-scm.com/).

### Cloning the Repository

First, fork the main CS50P Mind Map repository on GitHub to your personal account. Then, clone your fork to your local machine using the `git clone` command:

```bash
git clone https://github.com/YOUR_USERNAME/mapa-mental-cs50p.git
cd mapa-mental-cs50p
```

*Replace **`YOUR_USERNAME`** with your GitHub username.*

### Installing Dependencies

After navigating to the project directory, install all necessary dependencies using `pnpm`. This command will read the `package.json` file and install all listed packages:

```bash
pnpm install
```

*Common Troubleshooting:* If you encounter errors during installation, check that Node.js and pnpm are installed correctly and in their recommended versions. Try clearing the pnpm cache with `pnpm store prune` and try `pnpm install` again.

### How to Run the Project Locally

To start the development server and view the application in your browser, run the following command:

```bash
pnpm dev
```

177	The application will be available at `http://localhost:5173` (or another port, if 5173 is in use and Vite automatically selects another). Vite offers *Hot Module Replacement (HMR)*, which means your code changes will be reflected instantly in the browser without the need to reload the page.

### How to Test the Functionalities

After running the project locally, take some time to explore all the functionalities in the browser. This includes:

- Navigating the interactive mind map.
- Participating in quizzes and checking answers.
- Creating and managing a user profile.
- Testing offline mode: to do this, load the application, then disconnect your internet and see if the content is still accessible. (A screenshot showing the application working offline would be useful here).

## 5. Ways to Contribute

There are several ways to contribute to the project, even if you are not a developer. We value all forms of help!

- **Report Bugs and Issues:** Found unexpected behavior, a visual error, or a failure? Open an [Issue on GitHub](https://github.com/YOUR_USERNAME/mapa-mental-cs50p/issues) describing it in detail. Include steps to reproduce, expected behavior, and observed behavior.
- **Suggest Improvements and New Features:** Have an idea to make the project more useful, intuitive, or complete? Share it by opening an Issue with the tag `enhancement` or `feature request`.
- **Contribute Code:** Develop new features, fix bugs, optimize existing code, or improve the infrastructure. See section 6 for more details on the code contribution process.
- **Improve Documentation:** Help keep this guide, the `README.md`, and other technical documentation clear, accurate, and up-to-date. Good documentation is crucial for the community.
- **Translate Content:** Contribute to the internationalization of the application into other languages. Currently, we are focusing on translation to PT/EN, but other languages are welcome.

## 6. Code Contribution Process

For code contributions, we follow a standard GitHub workflow to ensure quality and consistency:

### 6.1. Create a Branch

Before starting any development, create a new branch from the `main` branch. Use a descriptive name for your branch, following the pattern `feature/nome-da-feature` or `bugfix/descricao-do-bug`:

```bash
git checkout main
git pull origin main
git checkout -b feature/minha-nova-funcionalidade
```

### 6.2. Implement Your Changes

Develop your changes, ensuring that they adhere to the project's coding standards. Write clear, concise, and well-documented code.

### 6.3. Test Your Changes

Before submitting your contribution, thoroughly test your changes to ensure they work as expected and do not introduce new bugs. If applicable, write unit or integration tests.

### 6.4. Commit Your Changes

Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). This standard helps maintain a clear and organized commit history. Examples:

- `feat: add dynamic quiz system`
- `fix: correct mind map download issue`
- `docs: update contributing guide`

```bash
git add .
git commit -m "feat: add new amazing feature"
```

### 6.5. Push Your Branch

Push your branch to your GitHub fork:

```bash
git push origin feature/minha-nova-funcionalidade
```

### 6.6. Open a Pull Request (PR)

Go to the GitHub repository of your fork and open a Pull Request to the `main` branch of the original project. In the PR description, include:

- A clear summary of the changes.
- Why these changes are necessary.
- How to test the changes.
- Any relevant screenshots or GIFs.

### 6.7. Code Review

Your PR will be reviewed by the project maintainers. Be open to feedback and willing to make adjustments. Once approved, your changes will be merged into the `main` branch.

## 7. Areas of Priority for Contribution

We are currently focusing on the following areas. Contributions in these areas are highly valued:

- **Dynamic Quiz System (High Priority):**
  - **Expand Question Bank:** Create a robust question bank for each lesson, aiming to offer unique content for each attempt.
  - **Implement Smart Sorting Logic:** Develop an algorithm that selects random questions, prioritizing those the user hasn't seen or previously answered incorrectly.
  - **Enhance General Quiz:** Make the "General Quiz" truly stimulating by drawing questions from the entire curriculum in an unpredictable way.
- **User Interface (UI) / User Experience (UX):** Improvements in the visual aspect, navigability, and overall user experience.
- **Performance Optimization:** Identify and resolve bottlenecks to ensure a fast and fluid application.
- **Accessibility:** Ensure the application is usable by people with disabilities.
- **Content Expansion:** Add new topics, lessons, or improve existing explanations in the mind map.
- **Internationalization:** Translation of the application into other languages (beyond PT/EN).

## 8. Communication

Effective communication is key to a successful collaboration. You can communicate with the project team and other contributors through:

- **GitHub Issues:** For reporting bugs, suggesting features, and discussing specific tasks.
- **GitHub Discussions:** For broader discussions, ideas, and community support.

## 9. Useful Resources

- [GitHub Repository](https://github.com/SEU_USUARIO/mapa-mental-cs50p): The main project repository.
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## 10. Frequently Asked Questions (FAQ)

**Q: Do I need to be a senior developer to contribute?**
A: Not at all! We welcome contributions from all skill levels. There are many ways to help, from reporting bugs to improving documentation.

**Q: How are contributions recognized?**
A: All contributors will be recognized in the project's `README.md` and in the commit history. Your name will be part of the project's success!

**Q: What if my idea is rejected?**
A: All ideas are welcome, but not all can be implemented. If your idea is rejected, we will provide constructive feedback. Don't be discouraged, there are always other ways to contribute.

## 11. First Contribution Checklist

- [ ] Read this entire guide.
- [ ] Fork the repository.
- [ ] Clone your fork locally.
- [ ] Install dependencies (`pnpm install`).
- [ ] Run the project locally (`pnpm dev`).
- [ ] Create a new branch for your changes.
- [ ] Make your changes.
- [ ] Test your changes thoroughly.
- [ ] Commit your changes using Conventional Commits.
- [ ] Push your branch to your fork.
- [ ] Open a Pull Request to the `main` branch of the original project.

## 12. Project License

This project is licensed under the **MIT License**. This means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided that the above copyright notice and this permission notice appear in all copies or substantial portions of the software.

## 13. Code of Conduct

To ensure a welcoming and inclusive environment for all, we adhere to a Code of Conduct. Please review it [here](LINK_PARA_CODIGO_DE_CONDUTA) before contributing. We expect all contributors to follow these guidelines in all project interactions.

---

Thank you for being part of the CS50P Mind Map community! Your contribution makes a difference.
