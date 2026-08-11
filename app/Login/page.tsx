// "use client";

// import React, {
//   useState,
//   FormEvent,
//   ChangeEvent,
// } from "react";

// import {
//   COLORS,
//   FONT_IMPORT,
//   COMMON_STYLES,
// } from "./theme";

// import { GoldDivider } from "./AccountPage";

// type LoginPageProps = {
//   onNavigate?: (path: string) => void;
// };

// function IconEye({
//   open,
// }: {
//   open: boolean;
// }) {
//   return open ? (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//     >
//       <path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8S1 12 1 12z" />
//       <circle
//         cx="12"
//         cy="12"
//         r="3"
//       />
//     </svg>
//   ) : (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//     >
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//       <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
//       <line
//         x1="1"
//         y1="1"
//         x2="23"
//         y2="23"
//       />
//     </svg>
//   );
// }

// export default function LoginPage({
//   onNavigate,
// }: LoginPageProps) {
//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const [
//     showPassword,
//     setShowPassword,
//   ] = useState(false);

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const handleLogin = async (
//     e: FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     setError("");

//     if (!email || !password) {
//       setError(
//         "Please fill all fields."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       await new Promise(
//         (resolve) =>
//           setTimeout(
//             resolve,
//             1500
//           )
//       );

//       console.log({
//         email,
//         password,
//       });

//       // router.push("/dashboard")
//     } catch (err) {
//       setError(
//         "Something went wrong."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         background: `radial-gradient(
//           ellipse at 50% 20%,
//           ${COLORS.panel} 0%,
//           ${COLORS.navy} 55%,
//           ${COLORS.navyDeep} 100%
//         )`,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         boxSizing:
//           "border-box",
//       }}
//     >
//       <style>{`
//         ${FONT_IMPORT}
//         ${COMMON_STYLES}
//       `}</style>

//       <div
//         style={{
//           width: "100%",
//           maxWidth: 420,
//           background: `linear-gradient(
//             180deg,
//             ${COLORS.panel},
//             ${COLORS.navyDeep}
//           )`,
//           border: `1px solid ${COLORS.border}`,
//           padding:
//             "40px 40px 36px",
//           position: "relative",
//           boxShadow:
//             "0 30px 80px rgba(0,0,0,.5)",
//         }}
//       >
//         <p
//           style={{
//             textAlign:
//               "center",
//             color:
//               COLORS.gold,
//             fontSize: 11,
//             letterSpacing:
//               "3px",
//             textTransform:
//               "uppercase",
//             margin: 0,
//           }}
//         >
//           Tiny Silver Collection
//         </p>

//         <h2
//           style={{
//             textAlign:
//               "center",
//             color:
//               COLORS.cream,
//             fontSize: 30,
//             margin:
//               "10px 0",
//           }}
//         >
//           Welcome Back
//         </h2>

//         <p
//           style={{
//             textAlign:
//               "center",
//             color:
//               COLORS.creamMuted,
//           }}
//         >
//           Sign in to continue
//         </p>

//         <GoldDivider />

//         {error && (
//           <p
//             style={{
//               color:
//                 "#ff6b6b",
//               textAlign:
//                 "center",
//             }}
//           >
//             {error}
//           </p>
//         )}

//         <form
//           onSubmit={
//             handleLogin
//           }
//           style={{
//             display:
//               "flex",
//             flexDirection:
//               "column",
//             gap: 20,
//           }}
//         >
//           <div>
//             <label
//               style={{
//                 color:
//                   COLORS.creamMuted,
//                 fontSize: 12,
//               }}
//             >
//               Email Address
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(
//                 e: ChangeEvent<HTMLInputElement>
//               ) =>
//                 setEmail(
//                   e.target.value
//                 )
//               }
//               placeholder="you@example.com"
//               style={{
//                 width:
//                   "100%",
//                 marginTop: 8,
//                 padding: 12,
//                 background:
//                   "rgba(255,255,255,.03)",
//                 border:
//                   "1px solid rgba(255,255,255,.12)",
//                 color:
//                   COLORS.cream,
//                 outline:
//                   "none",
//                 boxSizing:
//                   "border-box",
//               }}
//             />
//           </div>

//           <div>
//             <label
//               style={{
//                 color:
//                   COLORS.creamMuted,
//                 fontSize: 12,
//               }}
//             >
//               Password
//             </label>

//             <div
//               style={{
//                 position:
//                   "relative",
//               }}
//             >
//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 value={
//                   password
//                 }
//                 onChange={(
//                   e: ChangeEvent<HTMLInputElement>
//                 ) =>
//                   setPassword(
//                     e.target
//                       .value
//                   )
//                 }
//                 placeholder="••••••••"
//                 style={{
//                   width:
//                     "100%",
//                   marginTop: 8,
//                   padding:
//                     "12px 45px 12px 12px",
//                   background:
//                     "rgba(255,255,255,.03)",
//                   border:
//                     "1px solid rgba(255,255,255,.12)",
//                   color:
//                     COLORS.cream,
//                   outline:
//                     "none",
//                   boxSizing:
//                     "border-box",
//                 }}
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//                 style={{
//                   position:
//                     "absolute",
//                   right: 12,
//                   top: "50%",
//                   transform:
//                     "translateY(-20%)",
//                   background:
//                     "none",
//                   border:
//                     "none",
//                   color:
//                     COLORS.creamMuted,
//                   cursor:
//                     "pointer",
//                 }}
//               >
//                 <IconEye
//                   open={
//                     showPassword
//                   }
//                 />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={
//               loading
//             }
//             style={{
//               padding: 14,
//               border:
//                 "none",
//               background: `linear-gradient(
//                 90deg,
//                 ${COLORS.gold},
//                 ${COLORS.goldSoft}
//               )`,
//               color:
//                 COLORS.navyDeep,
//               fontWeight: 600,
//               cursor:
//                 loading
//                   ? "not-allowed"
//                   : "pointer",
//             }}
//           >
//             {loading
//               ? "Signing In..."
//               : "Sign In"}
//           </button>
//         </form>

//         <p
//           style={{
//             textAlign:
//               "center",
//             marginTop: 24,
//             color:
//               COLORS.creamMuted,
//           }}
//         >
//           Don't have an account?{" "}
//           <button
//             onClick={() =>
//               onNavigate?.(
//                 "/signup"
//               )
//             }
//             style={{
//               background:
//                 "none",
//               border:
//                 "none",
//               color:
//                 COLORS.gold,
//               cursor:
//                 "pointer",
//             }}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [focused, setFocused] = useState<
    "email" | "password" | null
  >(null);

  function GoldDivider() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "28px 0",
        }}
      >
        <span
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,97,0.35))",
          }}
        />

        <span
          style={{
            width: 6,
            height: 6,
            background: "#c9a961",
            transform: "rotate(45deg)",
          }}
        />

        <span
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(201,169,97,0.35), transparent)",
          }}
        />
      </div>
    );
  }

  function IconClose() {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(243,237,228,0.6)"
        strokeWidth="1.5"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(ellipse at 50% 20%, #232a45 0%, #1b2136 55%, #12172a 100%)",
        fontFamily: "'Jost', sans-serif",
        padding: 20,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@400;500;600&display=swap');

        input::placeholder {
          color: rgba(243,237,228,0.35);
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "linear-gradient(180deg, #232a45, #12172a)",
          border: "1px solid rgba(201,169,97,0.35)",
          borderRadius: 2,
          padding: "40px 40px 36px",
          position: "relative",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Corner ornaments */}

        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            width: 18,
            height: 18,
            borderTop: "1px solid #c9a961",
            borderLeft: "1px solid #c9a961",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 18,
            height: 18,
            borderTop: "1px solid #c9a961",
            borderRight: "1px solid #c9a961",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            width: 18,
            height: 18,
            borderBottom: "1px solid #c9a961",
            borderLeft: "1px solid #c9a961",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            width: 18,
            height: 18,
            borderBottom: "1px solid #c9a961",
            borderRight: "1px solid #c9a961",
          }}
        />

        {/* Close Button */}

        <button
          type="button"
          onClick={() => router.push("/account")}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            lineHeight: 0,
          }}
        >
          <IconClose />
        </button>

        {/* Brand */}

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 11,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#c9a961",
            textAlign: "center",
            margin: 0,
          }}
        >
          Tiny Silver Collection
        </p>

        {/* Heading */}

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 30,
            color: "#f3ede4",
            textAlign: "center",
            margin: "6px 0 4px",
          }}
        >
          Welcome back
        </h1>

        {/* Description */}

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            color: "rgba(243,237,228,0.6)",
            textAlign: "center",
            margin: "0 0 8px",
          }}
        >
          Sign in to continue your collection
        </p>

        <GoldDivider />

        {/* Login Form */}

        <form
          onSubmit={(e) => {
            e.preventDefault();

            // TODO:
            // Add your real authentication API here.

            router.push("/account");
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Email */}

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(243,237,228,0.6)",
              }}
            >
              Email address
            </span>

            <input
              type="email"
              placeholder="you@example.com"
              required
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  focused === "email"
                    ? "#c9a961"
                    : "rgba(255,255,255,0.14)"
                }`,
                padding: "11px 12px",
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                color: "#f3ede4",
                borderRadius: 1,
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
            />
          </label>

          {/* Password */}

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(243,237,228,0.6)",
              }}
            >
              Password
            </span>

            <input
              type="password"
              placeholder="••••••••"
              required
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  focused === "password"
                    ? "#c9a961"
                    : "rgba(255,255,255,0.14)"
                }`,
                padding: "11px 12px",
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                color: "#f3ede4",
                borderRadius: 1,
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
            />
          </label>

          {/* Forgot Password */}

          <div
            style={{
              textAlign: "right",
              marginTop: -8,
            }}
          >
            <a
              href="/forgot-password"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12,
                color: "#c9a961",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In */}

          <button
            type="submit"
            style={{
              marginTop: 6,
              padding: "14px",
              background: "linear-gradient(135deg, #c9a961, #e3cf9a)",
              color: "#12172a",
              border: "none",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 1,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Sign In
          </button>
        </form>

        {/* Signup Link */}

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            color: "rgba(243,237,228,0.6)",
            textAlign: "center",
            marginTop: 22,
          }}
        >
          New to Tiny Silver Collection?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            style={{
              background: "none",
              border: "none",
              color: "#c9a961",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
              padding: 0,
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}