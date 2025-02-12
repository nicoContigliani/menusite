// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import styles from '@/styles/auth.module.css';
// // import VerifyCodeForm from "./VerifyCodeForm";

// // const RegisterForm = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [fullname, setfullname] = useState("");
// //   const [birthday, setBirthday] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [verifications, setVerifications] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("/api/register", { email, password, fullname, birthday, phone });
// //       setMessage(response.data.message);
// //       if (response.data.status === 200) {
// //         setVerifications(true)
// //       }
// //       console.log("🚀 ~ handleSubmit ~ response:", response)
// //     } catch (error: any) {
// //       setMessage(error.response?.data?.error || "Error registering user");
// //     }
// //   };


// //   return (
// //     <div className={styles.authContainer}>
// //       {
// //         verifications ?
// //           <VerifyCodeForm />
// //           :
// //           <form onSubmit={handleSubmit} className={styles.form}>
// //             <input
// //               type="text"
// //               placeholder="Fullname"
// //               value={fullname}
// //               onChange={(e) => setfullname(e.target.value)}
// //               required
// //             />
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //             <input
// //               type="text"
// //               placeholder="Phone"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //               required
// //             />
// //             <input
// //               type="date"
// //               placeholder="Birthday"
// //               value={birthday}
// //               onChange={(e) => setBirthday(e.target.value)}
// //               required
// //             />
// //             <button type="submit">Register</button>
// //             {message && <p>{message}</p>}
// //           </form>
// //       }

// //     </div>
// //   );
// // };

// // export default RegisterForm;


// import React, { useState } from "react";
// import axios from "axios";
// import styles from "@/styles/auth.module.css";
// import VerifyCodeForm from "./VerifyCodeForm";

// const RegisterForm = (props:any) => {
//   const {setOpenResponsive} = props
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullname, setFullname] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [verifications, setVerifications] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(""); // Limpiar mensaje previo

//     try {
//       const response = await axios.post("/api/register", { email, password, fullname, birthday, phone });

//       if (response.status === 200) {
//         setVerifications(true);
//       } else {
//         setMessage(response.data?.message || "Registration failed");
//       }
//     } catch (error: any) {
//       setMessage(error.response?.data?.error || "Error registering user");
//     }
//   };

//   return (
//     <div className={styles.authContainer}>
//       {verifications ? (
//         <VerifyCodeForm email={email} setOpenResponsive={setOpenResponsive} /> // Se pasa el email a VerifyCodeForm si lo necesitas
//       ) : (
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             type="text"
//             placeholder="Fullname"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <input
//             type="date"
//             placeholder="Birthday"
//             value={birthday}
//             onChange={(e) => setBirthday(e.target.value)}
//             required
//           />
//           <button type="submit">Register</button>
//           {message && <p className={styles.error}>{message}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from "react";
import axios from "axios";
import styles from "@/styles/auth.module.css";
import VerifyCodeForm from "./VerifyCodeForm";
import { Button, Input } from "antd";

const RegisterForm = (props: any) => {
  const { setOpenResponsive } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [verifications, setVerifications] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/register", { email, password, fullname, birthday, phone });
      if (response.status === 200) {
        setVerifications(true);
      } else {
        setMessage(response.data?.message || "Registration failed");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error registering user");
    }
  };

  return (
    <div className={styles.authContainer}>
      {verifications ? (
        <VerifyCodeForm email={email} setOpenResponsive={setOpenResponsive} />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input placeholder="Fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
          <Button type="primary" htmlType="submit" block>Register</Button>
          {message && <p className={styles.error}>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
