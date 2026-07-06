import { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillWave, FaChartPie, FaSun, FaMoon } from "react-icons/fa";

import { Pessoas } from "./pages/Pessoas";
import { Transacoes } from "./pages/Transacoes";
import { Totais } from "./pages/Totais";

const THEME_KEY = "controle-gastos-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [pagina, setPagina] = useState("pessoas");
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getInitialTheme();
    document.documentElement.setAttribute("data-theme", initial);
    return initial;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="app">

      <div className="dashboard">

        <header className="header">

          <div>

            <h1>💰 Controle de Gastos</h1>

            <p>
              Sistema de gerenciamento financeiro residencial
            </p>

          </div>

          <div className="badges">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
              title={theme === "light" ? "Tema escuro" : "Tema claro"}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

        </header>

        <nav className="menu">

          <button
            className={pagina == "pessoas" ? "active" : ""}
            onClick={() => setPagina("pessoas")}
          >
            <FaUsers />
            Pessoas
          </button>

          <button
            className={pagina == "transacoes" ? "active" : ""}
            onClick={() => setPagina("transacoes")}
          >
            <FaMoneyBillWave />
            Transações
          </button>

          <button
            className={pagina == "totais" ? "active" : ""}
            onClick={() => setPagina("totais")}
          >
            <FaChartPie />
            Dashboard
          </button>

        </nav>

        <div className="content">

          {pagina == "pessoas" && <Pessoas />}

          {pagina == "transacoes" && <Transacoes />}

          {pagina == "totais" && <Totais />}

        </div>

      </div>

    </div>
  );
}