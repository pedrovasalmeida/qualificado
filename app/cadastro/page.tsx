"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [servicos, setServicos] = useState([""]);
  const [contato, setContato] = useState("");
  const [cidades, setCidades] = useState(["", ""]);

  const addServico = () => {
    setServicos([...servicos, ""]);
  };

  const removeServico = (index: number) => {
    if (servicos.length > 1) {
      setServicos(servicos.filter((_, i) => i !== index));
    }
  };

  const updateServico = (index: number, value: string) => {
    const newServicos = [...servicos];
    newServicos[index] = value;
    setServicos(newServicos);
  };

  const addCidade = () => {
    setCidades([...cidades, ""]);
  };

  const removeCidade = (index: number) => {
    if (cidades.length > 1) {
      setCidades(cidades.filter((_, i) => i !== index));
    }
  };

  const updateCidade = (index: number, value: string) => {
    const newCidades = [...cidades];
    newCidades[index] = value;
    setCidades(newCidades);
  };

  const handleLimpar = () => {
    setNome("");
    setServicos([""]);
    setContato("");
    setCidades(["", ""]);
  };

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log({
      nome,
      servicos: servicos.filter((s) => s.trim() !== ""),
      contato,
      cidades: cidades.filter((c) => c.trim() !== ""),
    });
    alert("Cadastro realizado com sucesso!");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-6">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-gray-700 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-lg font-medium">Voltar</span>
        </button>

        {/* Form */}
        <form onSubmit={handleCadastrar} className="space-y-4">
          {/* Nome */}
          <div>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors focus:border-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Serviços */}
          <div className="space-y-3">
            {servicos.map((servico, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={servico}
                  onChange={(e) => updateServico(index, e.target.value)}
                  placeholder={
                    index === 0 ? "Serviço prestado" : `Serviço ${index + 1}`
                  }
                  className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors focus:border-blue-500 placeholder:text-gray-400"
                  required={index === 0}
                />
                {servicos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeServico(index)}
                    className="shrink-0 rounded-xl border-2 border-red-300 bg-white px-3 text-red-500 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addServico}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-5 py-3.5 text-base font-medium text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
            >
              Adicionar serviço
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Contato */}
          <div>
            <input
              type="tel"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              placeholder="Contato (WhatsApp)"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors focus:border-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Cidades */}
          <div className="space-y-3">
            {cidades.map((cidade, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => updateCidade(index, e.target.value)}
                  placeholder={`Cidade ${index + 1}`}
                  className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors focus:border-blue-500 placeholder:text-gray-400"
                  required={index < 2}
                />
                {cidades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCidade(index)}
                    className="shrink-0 rounded-xl border-2 border-red-300 bg-white px-3 text-red-500 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCidade}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-5 py-3.5 text-base font-medium text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
            >
              Adicionar cidade
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <button
              type="button"
              onClick={handleLimpar}
              className="w-full rounded-xl bg-red-100 px-5 py-4 text-base font-semibold text-red-700 transition-colors hover:bg-red-200"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
