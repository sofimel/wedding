import { createClient } from "@supabase/supabase-js";

const uuidValido = (valor) =>
  typeof valor === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(valor);

function responder(dados, status = 200) {
  return Response.json(dados, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request) {
    if (!["GET", "POST"].includes(request.method)) {
      return responder({ erro: "Método não permitido." }, 405);
    }

    const urlBanco = process.env.SUPABASE_URL;
    const chave = process.env.SUPABASE_SECRET_KEY;

    if (!urlBanco || !chave) {
      return responder(
        { erro: "Serviço de confirmação indisponível." },
        503
      );
    }

    const banco = createClient(urlBanco, chave, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    try {
      const url = new URL(request.url);
      let dados = null;

      if (request.method === "POST") {
        try {
          dados = await request.json();
        } catch {
          return responder({ erro: "Dados inválidos." }, 400);
        }
      }

      const codigo =
        request.method === "GET"
          ? url.searchParams.get("codigo")
          : dados?.codigo;

      if (!uuidValido(codigo)) {
        return responder({ erro: "Código de convite inválido." }, 400);
      }

      // Identifica quem possui o código do link.
      const { data: convidado, error: erroConvidado } = await banco
        .from("convidados")
        .select("id, nome, presenca, mensagem, crianca")
        .eq("codigo", codigo)
        .maybeSingle();

      if (erroConvidado) throw erroConvidado;

      if (!convidado) {
        return responder({ erro: "Convite não encontrado." }, 404);
      }

      // Um adulto pode responder pelas crianças vinculadas a ele.
      let criancas = [];

      if (!convidado.crianca) {
        const { data, error } = await banco
          .from("convidados")
          .select("id, nome, presenca, mensagem, crianca")
          .eq("responsavel_id", convidado.id)
          .eq("crianca", true)
          .order("nome");

        if (error) throw error;

        criancas = data ?? [];
      }

      if (request.method === "GET") {
        return responder({ convidado, criancas });
      }

      // Valida a resposta que será salva.
      const {
        convidado_id,
        presenca,
        mensagem = ""
      } = dados;

      if (
        !uuidValido(convidado_id) ||
        !["confirmada", "recusada"].includes(presenca) ||
        typeof mensagem !== "string" ||
        mensagem.length > 1000
      ) {
        return responder({ erro: "Confira os dados da resposta." }, 400);
      }

      const pessoasPermitidas = [
        convidado.id,
        ...criancas.map((crianca) => crianca.id)
      ];

      if (!pessoasPermitidas.includes(convidado_id)) {
        return responder(
          { erro: "Este convite não permite responder por essa pessoa." },
          403
        );
      }

      let atualizacao = banco
        .from("convidados")
        .update({
          presenca,
          mensagem: mensagem.trim(),
          respondido_em: new Date().toISOString()
        })
        .eq("id", convidado_id);

      // Reconfere o vínculo no momento da gravação.
      if (convidado_id === convidado.id) {
        atualizacao = atualizacao.eq("codigo", codigo);
      } else {
        atualizacao = atualizacao
          .eq("responsavel_id", convidado.id)
          .eq("crianca", true);
      }

      const { data: salvo, error: erroSalvar } = await atualizacao
        .select("id, presenca")
        .maybeSingle();

      if (erroSalvar) throw erroSalvar;

      if (!salvo) {
        return responder(
          { erro: "O cadastro mudou. Recarregue o convite." },
          409
        );
      }

      return responder({ ok: true, convidado: salvo });
    } catch {
      return responder(
        { erro: "Não foi possível acessar o banco. Tente novamente." },
        500
      );
    }
  }
};