import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore database with specified databaseId and long-polling settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Connectivity validation with graceful timeout
export async function testFirestoreConnection() {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('connection_timeout')), 3500)
    );
    await Promise.race([
      getDocFromServer(doc(db, 'test', 'connection')),
      timeoutPromise
    ]);
    console.log("🔥 Kết nối thành công tới Firebase Firestore!");
  } catch (error: any) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (isOffline) {
      console.warn("⚠️ Thiết bị không có kết nối internet (Chế độ ngoại tuyến).");
    } else {
      console.info("ℹ️ Khởi tạo dữ liệu đám mây Firebase:", errMsg);
    }
  }
}

testFirestoreConnection();
