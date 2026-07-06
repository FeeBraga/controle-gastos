import { useEffect, useState } from "react";
import {
  FaUsers,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaUser
} from "react-icons/fa";

import { api } from "../services/api";

export function Totais() {

    const [dados, setDados] = useState<any>(null);
    const [qtdPessoas, setQtdPessoas] = useState(0);

    async function carregar() {

        const totais = await api.get("/totais");

        setDados(totais.data);

        const pessoas = await api.get("/pessoas");

        setQtdPessoas(pessoas.data.length);

    }

    useEffect(() => {

        carregar();

    }, []);

    return (

        <>

            <div className="summary-grid">

                <div className="summary-card blue">

                    <FaUsers />

                    <h4>Pessoas</h4>

                    <h2>{qtdPessoas}</h2>

                </div>

                <div className="summary-card green">

                    <FaArrowUp/>

                    <h4>Receitas</h4>

                    <h2>

                        R$ {dados?.totalGeralReceitas?.toFixed(2)}

                    </h2>

                </div>

                <div className="summary-card red">

                    <FaArrowDown/>

                    <h4>Despesas</h4>

                    <h2>

                        R$ {dados?.totalGeralDespesas?.toFixed(2)}

                    </h2>

                </div>

                <div className="summary-card purple">

                    <FaWallet />

                    <h4>Saldo</h4>

                    <h2>

                        R$ {dados?.saldoGeral?.toFixed(2)}

                    </h2>

                </div>

            </div>

            <div className="panel mt">

                <h2>Totais por Pessoa</h2>

                {dados?.pessoas?.map((p: any) => (

                    <div
                        key={p.pessoaId}
                        className="resume-card"
                    >

                        <div>

                            <h3>

                                <FaUser/>

                                {p.nome}

                            </h3>

                            <small>

                                Receita

                                <strong>

                                    R$ {p.totalReceitas}

                                </strong>

                            </small>

                            <small>

                                Despesa

                                <strong>

                                    R$ {p.totalDespesas}

                                </strong>

                            </small>

                        </div>

                        <div>

                            <span>

                                Saldo

                            </span>

                            <h2
                                className={
                                    p.saldo >= 0
                                        ? "saldo-positive"
                                        : "saldo-negative"
                                }
                            >

                                R$ {p.saldo}

                            </h2>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );

}