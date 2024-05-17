import { applicationDefault, getApps } from "firebase-admin/app";
import admin from "firebase-admin";

if (!getApps().length) {
	admin.initializeApp({
		credential: applicationDefault(),
	});
}

const adminDb = admin.firestore();

export { adminDb };
