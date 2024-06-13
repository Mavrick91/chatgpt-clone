import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB53kOleilxJVjXiRcF11EU1miUYK3xlxs",
	authDomain: "chatgpt-clone-695d8.firebaseapp.com",
	projectId: "chatgpt-clone-695d8",
	storageBucket: "chatgpt-clone-695d8.appspot.com",
	messagingSenderId: "197264320112",
	appId: "1:197264320112:web:e3440849c51b346e71f6b5",
};

class Firebase {
	private static instance: Firebase;
	public app: FirebaseApp;
	public auth: Auth;
	public db: Firestore;

	private constructor() {
		this.app = initializeApp(firebaseConfig);
		this.auth = getAuth(this.app);
		this.db = getFirestore(this.app);
	}

	public static getInstance(): Firebase {
		if (!Firebase.instance) {
			Firebase.instance = new Firebase();
		}
		return Firebase.instance;
	}
}

const firebaseInstance = Firebase.getInstance();
export const auth: Auth = firebaseInstance.auth;
export const db: Firestore = firebaseInstance.db;
