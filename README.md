# 📋 Project Manager App — React Native + Expo + TypeScript

A clean and modular **React Native app** built using **Expo** and **TypeScript** that allows users to create and manage multiple projects and tasks. It uses local storage to persist user data and provides a polished user experience with touch feedback, offline support, and modern UI practices.

---

## 📹 Demo

> 📁 File: `demo.mov`  
You can view the full demo screen recording [here](./demo.mov)

---

## ✨ Features

- ✅ Add & delete **Projects**
- ✅ Add, complete, and toggle **Tasks** within a project
- ✅ Long-press to delete a project
- ✅ Local data persistence using `AsyncStorage`
- ✅ Modern **keyboard-aware layout** with `KeyboardAvoidingView`
- ✅ **Type-safe** navigation with `React Navigation` + TypeScript
- ✅ **FlatList** rendering with empty state messages
- ✅ Production-grade UI with touch feedback
- ✅ Clean code and scalable folder structure

---

## 🧱 Tech Stack

| Tool / Library             | Description                                 |
|---------------------------|---------------------------------------------|
| [React Native](https://reactnative.dev/)        | Mobile framework                            |
| [Expo](https://expo.dev/)                       | Build toolchain for React Native            |
| [TypeScript](https://www.typescriptlang.org/)  | Static typing                               |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local storage for persisting data           |
| [React Navigation](https://reactnavigation.org/) | Navigation between screens                  |
| [react-native-uuid](https://www.npmjs.com/package/react-native-uuid)   | UUID generation for IDs                     |

---


## 📸 UI Preview

### 📁 Home Screen (Projects List)
- View all saved projects
- Add new projects
- Long press to delete project

### ✅ Project Details Screen (Tasks)
- View tasks for selected project
- Add and toggle completion
- UI updates immediately and persists to storage

---

## 📦 Installation

> Requires: `Node.js`, `npm`, and `Expo CLI`

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/project-manager-app.git
   cd project-manager-app

   npm install
   npx expo start
---

## ✅ Usage Notes

- Uses `KeyboardAvoidingView` to handle keyboard input across platforms.
- `FlatList` used for optimized list rendering.
- Projects and tasks stored in local storage with UUID-based IDs.
- The input focus issue was fixed by **avoiding `useMemo`** for rendering controlled `TextInput` components.

---

## 🧠 Bonus: Architecture Tips

- **Component-first structure**: `ProjectItem` and `TaskItem` are fully isolated reusable UI units.
- **Navigation-safe typing**: All navigation is strongly typed via `RootStackParamList`.
- **Memoization**: Header render logic is optimized using `useMemo` — with care to avoid breaking input focus.

---

## 🚀 Future Improvements

- 🔄 Firebase or Supabase integration
- 🔔 Notifications for tasks
- 🌓 Dark mode
- 📊 Progress charts and analytics
- 👥 Multi-user sync

---

## 📃 License

This project is open-sourced under the **MIT License**.

---

## 🧑‍💻 Author

**Tushar Maithani**  
[GitHub](https://github.com/) · [LinkedIn](https://linkedin.com/) · Portfolio

💼 *Freelance-style delivery*: This submission can also be reflected as a **freelance/contract module** for portfolio/resume use.


