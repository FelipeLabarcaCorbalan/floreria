"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f7f4;
    font-family: 'Inter', sans-serif;
    padding: 24px;
  }

  .card {
    background: #ffffff;
    width: 100%;
    max-width: 380px;
    padding: 48px 40px 40px;
    border-radius: 4px;
    border: 1px solid #e8e4df;
    box-shadow: 0 4px 32px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: rise 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .brand {
    font-family: 'Inter', sans-serif;
    font-size: 28px;
    color: #1a1a1a;
    letter-spacing: -0.01em;
    line-height: 1;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .label-text {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #888;
  }

  .field input {
    width: 100%;
    padding: 11px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: #1a1a1a;
    background: #fafaf9;
    border: 1px solid #e0dbd5;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field input:focus {
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26,26,26,0.06);
    background: #fff;
  }

  .error {
    font-size: 13px;
    color: #c0392b;
    padding: 10px 14px;
    background: #fdf0ef;
    border-left: 3px solid #c0392b;
    border-radius: 2px;
  }

  .submit {
    width: 100%;
    padding: 13px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #fff;
    background: #1a1a1a;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 4px;
  }

  .submit:hover:not(:disabled) { background: #333; }
  .submit:active:not(:disabled) { transform: scale(0.99); }
  .submit:disabled { opacity: 0.55; cursor: not-allowed; }

  .help {
    text-align: center;
  }

  .link {
    font-size: 13px;
    color: #999;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .link:hover {
    color: #1a1a1a;
    border-bottom-color: #1a1a1a;
  }
`;

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <>
      <style>{css}</style>
      <main className="wrap" role="main">
        <form className="card" onSubmit={handleSubmit} autoComplete="on" noValidate>

          <div className="brand">Bienvenido</div>

          <label className="field">
            <span className="label-text">Usuario</span>
            <input
              type="text"
              name="username"
              inputMode="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label-text">Contraseña</span>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="submit" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="help">
            <a href="#" className="link">Olvidé mi contraseña</a>
          </div>

        </form>
      </main>
    </>
  );
}