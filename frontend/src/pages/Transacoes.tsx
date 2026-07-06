import { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaPlus,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { api } from "../services/api";

export function Transacoes() {

  const [lista, setLista] = useState<any[]>([]);
  const [pessoas, setPessoas] = useState<any[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [tipo, setTipo] = useState("Receita");
  const [pessoaId, setPessoaId] = useState<number | "">("");

  async function carregar() {
    const res = await api.get("/transacoes");
    setLista(res.data);
  }
  async function carregarPessoas() {
    const res = await api.get("/pessoas");
    setPessoas(res.data);
  }

  async function criar() {
  if (!descricao.trim()) {
    alert("Informe uma descrição.");
    return;
  }

  if (valor === "" || valor <= 0) {
    alert("Informe um valor válido.");
    return;
  }

  if (pessoaId === "") {
    alert("Selecione uma pessoa.");
    return;
  }

  try {
    await api.post("/transacoes", {
      descricao,
      valor,
      tipo,
      pessoaId
    });

    alert("Transação cadastrada com sucesso!");

    setDescricao("");
    setValor("");
    setPessoaId("");
    setTipo("Receita");

    carregar();

  } catch (err: any) {
    alert(err.response?.data || "Erro ao cadastrar transação.");
  }
}

  useEffect(() => {
    carregar();
    carregarPessoas();
  }, []);

  return (

    <div className="page-grid">

      <div className="panel">

        <h2>

          <FaPlus />

          Nova Transação

        </h2>

        <label>Descrição</label>

        <input
          value={descricao}
          placeholder="Ex.: Mercado"
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label>Valor</label>

        <input
          type="number"
          min={0}
          value={valor}
          placeholder="0,00"
          onChange={(e) =>
            setValor(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <label>Tipo</label>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>Receita</option>
          <option>Despesa</option>
        </select>

        <label>Pessoa</label>

        <select
          value={pessoaId}
          onChange={(e) =>
            setPessoaId(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
        >
          <option value="">Selecione...</option>

          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>

        <button
          className="primary-btn"
          onClick={criar}
        >
          Cadastrar Transação
        </button>

      </div>

      <div className="panel">

        <h2>

          <FaMoneyBillWave />

          Histórico

        </h2>

        {lista.map((t) => (

          <div
            className={`transaction-card ${t.tipo === "Receita" ? "receita" : "despesa"}`}
            key={t.id}
          >

            <div>

              <h3>{t.descricao}</h3>

            

                <small>{t.pessoaNome}</small>

           

            </div>

            <div className="transaction-amount">

              <span
                className={
                  t.tipo === "Receita"
                    ? "badge-success"
                    : "badge-danger"
                }
              >

                {t.tipo === "Receita"
                  ? <FaArrowUp />
                  : <FaArrowDown />
                }

                {t.tipo}

              </span>

              <h3>

                R$ {Number(t.valor).toFixed(2)}

              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

