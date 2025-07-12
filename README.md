# Demo Video Link
[[https://www.loom.com/share/726e133046a9469c8e3282af8735e123?sid=f58af501-2518-4505-b147-bd52c72cf636](https://www.loom.com/share/726e133046a9469c8e3282af8735e123?sid=699f02a5-6c8a-4f9a-aa9c-5aa1d884515b)](https://www.loom.com/share/726e133046a9469c8e3282af8735e123?sid=a5af5308-51d4-4c05-a162-c3196a9617dc)

# Buzzly AI UGC Platform Frontend

This is the frontend for **Buzzly**, an AI-driven platform for generating and managing user-generated content (UGC) videos. Built with **React** and **Tailwind CSS**, the app provides a seamless, real-time experience for users to submit products and view AI-generated video content.

##  Features

- **Landing Page**
  - Static, responsive introduction to the platform
  - Easy navigation to all main features via react-router-dom

- **Product Form Page**
  - Users enter product name, price, promotion details, target audience, and an image of their product
  - Built as a stateful React component for robust form management
  - On submission, data is sent to Firebase Firestore, creating a new document
  - On new document created, Firestore triggers a Cloud Function, which calls the backend API to generate a video

- **Library Page**
  - Displays all generated videos and product info
  - Uses Firestore’s real-time updates so users always see the latest content
  - Shows video previews and product details in a responsive grid

##  Tech Stack

- **React** for UI and component logic
- **Tailwind CSS** for rapid, responsive styling
- **Firebase**
  - Firestore for real-time data
  - Storage for video files
  - Cloud Functions for backend triggers and secure function excecution
- **lucide-react** for modern icons

##  Security & Best Practices

- **No hardcoded secrets:** All backend URLs and sensitive info are managed securely in Firebase config, not in the codebase.
- **Responsive design:** Tailwind ensures the app adapts well with different device sizes.
- **Clean architecture:** Modular React components for maintainability and scalability.

##  How It Works

1. **User submits product info** via the form page.
2. **Frontend writes data to Firestore** as a new document.
3. **Cloud Function is triggered** by Firestore, calling the backend API to generate a video.
4. **Backend uploads the video** to Firebase Storage and updates the Firestore document with the video URL.
5. **Library page listens to Firestore** and displays the latest videos and product info in real-time.

