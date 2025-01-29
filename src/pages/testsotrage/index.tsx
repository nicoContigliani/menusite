// "use client";
// import React, { useEffect, useState } from 'react';
// import { initializeApp } from "firebase/app";
// import { getStorage, ref, listAll } from "firebase/storage";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCXu9fNEQkwwyKEChptQGTNBHsOyp-IqpE",
//   authDomain: "llakascript.firebaseapp.com",
//   projectId: "llakascript",
//   storageBucket: "llakascript.firebasestorage.app",
//   messagingSenderId: "657861850105",
//   appId: "1:657861850105:web:0c6ffd20b785715b514328",
//   measurementId: "G-HM967NB15L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const storage = getStorage(app);

// const TestStoragePage = () => {
//   const [folders, setFolders] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchFolders = async () => {
//       try {
//         setLoading(true);
//         const storageRef = ref(storage, '/'); // Root reference
//         const result = await listAll(storageRef); // List all items in the root

//         // Extract the folder names
//         const folderNames = result.prefixes.map((folder) => folder.name);
//         setFolders(folderNames);
//       } catch (err) {
//         setError("Error al conectar con Firebase Storage");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFolders();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Test de Conexión a Firebase Storage</h1>
//       {loading && <p>Cargando...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {folders.length > 0 && (
//         <div>
//           <h2>Carpetas encontradas:</h2>
//           <ul>
//             {folders.map((folder) => (
//               <li key={folder}>{folder}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestStoragePage;


"use client";
import { useEffect, useState } from "react";
import { getStorage, ref, listAll } from "firebase/storage";
import { storage } from "../../../firebase/client";

const FirebaseStorageComponent = () => {
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        const storageRef = ref(storage, ""); // El directorio raíz de Firebase Storage
        const result = await listAll(storageRef);

        const folderNames = result.prefixes.map((folderRef) => folderRef.name);
        setFolders(folderNames);
      } catch (err) {
        setError("Error al obtener las carpetas de Firebase Storage.");
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test de Conexión a Firebase Storage</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {folders.length > 0 && (
        <div>
          <h2>Carpetas encontradas:</h2>
          <ul>
            {folders.map((folder, index) => (
              <li key={index}>{folder}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FirebaseStorageComponent;
