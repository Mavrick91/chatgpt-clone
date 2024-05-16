import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB53kOleilxJVjXiRcF11EU1miUYK3xlxs",
	authDomain: "chatgpt-clone-695d8.firebaseapp.com",
	projectId: "chatgpt-clone-695d8",
	storageBucket: "chatgpt-clone-695d8.appspot.com",
	messagingSenderId: "197264320112",
	appId: "1:197264320112:web:e3440849c51b346e71f6b5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
