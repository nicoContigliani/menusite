// import React, { useState } from "react";
// import axios from "axios";
// import styles from '@/styles/auth.module.css';
// import { localhostStorage } from "@/services/localstorage.services";
// import VerifyCodeForm from "./VerifyCodeForm";
// import { Button } from "antd";

// const LoginForm = (props: any) => {
//   const {
//     redirections,
//     setOpenResponsive,
//     fullUrl,
//   } = props

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [verifications, setVerifications] = useState(false);


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/login", { email, password });
//       localhostStorage(response?.data)
//       setOpenResponsive(false)
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         localStorage.setItem("isLogin", `true`);
//       }
//     } catch (error: any) {
//       setMessage(error.response?.data?.error || "Error logging in");
//     }
//   };

//   const handleSubmitCode = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/generateCode", { email, password });
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         console.log("🚀 ~ handleSubmitCode ~ response:", response)
//         setVerifications(true);
//       }
//     } catch (error: any) {
//       setMessage(error.response?.data?.error || "Error logging in");
//     }
//   };

//   return (
//     <div
//       className={styles.authContainer}
//     >
//       {verifications ? (
//         <VerifyCodeForm email={email}
//           setOpenResponsive={setOpenResponsive}
//         /> 
//       ) : (
//         <div>
//           <div>
//             <form onSubmit={handleSubmit} className={styles.form}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button type="submit">Login</button>
//               {message && <p>{message}</p>}
//             </form>
//           </div>
//           <hr />
//           <div>
//             <form onSubmit={handleSubmitCode} className={styles.form}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit">validate with code</button>
//               {message && <p>{message}</p>}
//             </form>
//           </div>


//         </div>
//       )
//       }

//     </div>
//   );
// };

// export default LoginForm;

// import React, { useState } from "react";
// import axios from "axios";
// import styles from '@/styles/auth.module.css';
// import { localhostStorage } from "@/services/localstorage.services";
// import VerifyCodeForm from "./VerifyCodeForm";
// import { Button, Input } from "antd";

// const LoginForm = (props: any) => {
//   const {
//     redirections,
//     setOpenResponsive,
//     fullUrl,
//     setIsLogin
//   } = props

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [verifications, setVerifications] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/login", { email, password });
//       console.log("🚀 ~ handleSubmit ~ response?.data:", response?.data)
//       localhostStorage(response?.data)
//       setOpenResponsive(false)
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         localStorage.setItem("isLogin", `true`);
//       }
//     } catch (error: any) {
//       setMessage(error.response?.data?.error || "Error logging in");
//     }
//   };

//   const handleSubmitCode = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/generateCode", { email, password });
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         console.log("🚀 ~ handleSubmitCode ~ response:", response)
//         setVerifications(true);
//         setIsLogin(true)
//       }
//     } catch (error: any) {
//       setMessage(error.response?.data?.error || "Error logging in");
//     }
//   };

//   return (
//     <div className={styles.authContainer}>
//       {verifications ? (
//         <VerifyCodeForm email={email} setOpenResponsive={setOpenResponsive} />
//       ) : (
//         <div>
//           <div>
//             <form onSubmit={handleSubmit} className={styles.form}>
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <Input.Password
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <Button type="primary" htmlType="submit" block>
//                 Login
//               </Button>
//               {message && <p>{message}</p>}
//             </form>
//           </div>
//           <hr />
//           <div>
//             <form onSubmit={handleSubmitCode} className={styles.form}>
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <Button type="default" htmlType="submit" block>
//                 Validate with code
//               </Button>
//               {message && <p>{message}</p>}
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import styles from '@/styles/auth.module.css';
import { localhostStorage } from "@/services/localstorage.services";
import { Button, Input } from "antd";

const LoginForm = (props: any) => {
  const { setOpenResponsive, setIsLogin } = props;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);
      
      if (response.ok) {
        localhostStorage(data);
        setOpenResponsive(false);
        setMessage(data.message);
        localStorage.setItem("isLogin", "true");
        setIsLogin(true);
      } else {
        setMessage(data.error || "Error logging in");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;