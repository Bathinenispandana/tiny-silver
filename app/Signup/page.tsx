"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [focused, setFocused] = useState<
    "name" | "email" | "password" | "confirm" | null
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

  function fieldStyle(
    name: "name" | "email" | "password" | "confirm"
  ) {
    return {
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${
        focused === name ? "#c9a961" : "rgba(255,255,255,0.14)"
      }`,
      padding: "11px 12px",
      fontFamily: "'Jost', sans-serif",
      fontSize: 14,
      color: "#f3ede4",
      borderRadius: 1,
      outline: "none",
      transition: "border-color 0.2s ease",
    };
  }

  const labelStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    color: "rgba(243,237,228,0.6)",
  };

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
          Create your account
        </h1>

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            color: "rgba(243,237,228,0.6)",
            textAlign: "center",
            margin: "0 0 8px",
          }}
        >
          Join us for early access to new pieces
        </p>

        <GoldDivider />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/account");
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span style={labelStyle}>Full name</span>

            <input
              type="text"
              placeholder="Ananya Rao"
              required
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              style={fieldStyle("name")}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span style={labelStyle}>Email address</span>

            <input
              type="email"
              placeholder="you@example.com"
              required
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={fieldStyle("email")}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span style={labelStyle}>Password</span>

            <input
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={fieldStyle("password")}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span style={labelStyle}>Confirm password</span>

            <input
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              onFocus={() => setFocused("confirm")}
              onBlur={() => setFocused(null)}
              style={fieldStyle("confirm")}
            />
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginTop: -4,
            }}
          >
            <input
              type="checkbox"
              required
              style={{
                marginTop: 3,
                accentColor: "#c9a961",
                cursor: "pointer",
              }}
            />

            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12,
                color: "rgba(243,237,228,0.6)",
                lineHeight: 1.5,
              }}
            >
              I agree to the{" "}
              <a
                href="/terms"
                style={{
                  color: "#c9a961",
                  textDecoration: "none",
                }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                style={{
                  color: "#c9a961",
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </a>
            </span>
          </label>

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
            Create Account
          </button>
        </form>

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            color: "rgba(243,237,228,0.6)",
            textAlign: "center",
            marginTop: 22,
          }}
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
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
            Login
          </button>
        </p>
      </div>
    </div>
  );
}