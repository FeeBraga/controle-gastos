import { useEffect, useState } from "react";
import { FaTrash, FaUserPlus, FaUser } from "react-icons/fa";
import { api } from "../services/api";

type Pessoa = {
  id: number;
  nome: string;
  idade: number;
};

export function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");

  async function carregar() {
    const res = await api.get("/pessoas");
    setPessoas(res.data);
  }

  async function criar() {
    if (!nome.trim()) {
      alert("Informe o nome.");
      return;
    }

    if (idade === "" || idade < 0) {
      alert("Informe uma idade válida.");
      return;
    }

    await api.post("/pessoas", {
      nome,
      idade
    });

    setNome("");
    setIdade("");

    carregar();
  }

  async function excluir(id: number) {
    if (!confirm("Deseja remover esta pessoa?"))
      return;

    await api.delete(`/pessoas/${id}`);

    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="page-grid">

      <div className="panel">

        <h2>
          <FaUserPlus /> Nova Pessoa
        </h2>

        <label>Nome</label>

        <input
          value={nome}
          placeholder="Digite o nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Idade</label>

        <input
          type="number"
          min={0}
          value={idade}
          placeholder="Ex: 25"
          onChange={(e) =>
            setIdade(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <button className="primary-btn" onClick={criar}>
          Cadastrar Pessoa
        </button>

      </div>

      <div className="panel">

        <h2>Pessoas cadastradas</h2>

        {pessoas.length === 0 && (
          <p>Nenhuma pessoa cadastrada.</p>
        )}

        {pessoas.map((p) => (

          <div className="person-card" key={p.id}>

            <div>

              <h3>

                <FaUser />

                {p.nome}

              </h3>

              <span>{p.idade} anos</span>

            </div>

            <button
              className="danger-btn"
              onClick={() => excluir(p.id)}
            >

              <FaTrash />

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}