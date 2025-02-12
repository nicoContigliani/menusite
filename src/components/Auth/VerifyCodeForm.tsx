// import React, { useState } from "react";
// import axios from "axios";
// import { localhostStorage } from "@/services/localstorage.services";

// const VerifyCodeForm = (props: any) => {
//   const { email,setOpenResponsive } = props
//   const [code, setCode] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/verifyCode", { email, code });
//       setMessage(response.data.message);
//       localhostStorage(response?.data)
//       if (response.status === 200) {
//         localStorage.setItem("isLogin", `true`);
//         setOpenResponsive(false)
//       }
//       console.log("🚀 ~ handleSubmit ~ response:", response)
//     } catch (error: any) {
//       setMessage(error.response?.data?.error || "Error verifying code");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       /> */}
//       <input
//         type="text"
//         placeholder="Verification Code"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         required
//       />
//       <button type="submit">Verify Code</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default VerifyCodeForm;

import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message as antdMessage } from "antd";
import { localhostStorage } from "@/services/localstorage.services";

const VerifyCodeForm = (props: any) => {
  const { email, setOpenResponsive } = props;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/verifyCode", { email, code });
      localhostStorage(response?.data);

      if (response.status === 200) {
        localStorage.setItem("isLogin", "true");
        setOpenResponsive(false);
        antdMessage.success(response.data.message);
      } else {
        antdMessage.error(response.data.message || "Verification failed");
      }
    } catch (error: any) {
      antdMessage.error(error.response?.data?.error || "Error verifying code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Input 
        type="text" 
        placeholder="Verification Code" 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        required
      />
      <Button type="primary" htmlType="submit" loading={loading}>
        Verify Code
      </Button>
    </form>
  );
};

export default VerifyCodeForm;
