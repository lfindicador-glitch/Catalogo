// ============================================================
//  CONFIGURAÇÃO DA LOJA  —  edite só este arquivo
// ============================================================
window.CONFIG = {
  LOJA_NOME: "Corte e Cria Decor",
  SLOGAN: "Decoração em MDF personalizada",

  // WhatsApp da loja que vai RECEBER os pedidos de orçamento.
  // Formato: código do país + DDD + número, só números. Exemplo: 5585999999999
  WHATSAPP: "5585987040243",

  // Endereço do Instagram da loja (opcional). Exemplo: "https://instagram.com/sualoja"
  INSTAGRAM: "",

  // Cores que o cliente pode escolher. Para criar uma cor nova, acrescente uma linha.
  CORES: [
    { nome: "Preto",   hex: "#222222" },
    { nome: "Branco",  hex: "#FFFFFF" },
    { nome: "Cru",     hex: "#E8DCC0" },
    { nome: "Rosa",    hex: "#F2A5C0" },
    { nome: "Verde",   hex: "#5FA36A" },
    { nome: "Azul",    hex: "#4A7FC1" },
    { nome: "Laranja", hex: "#E87120" },
    { nome: "Vermelho", hex: "#C62828" },
    { nome: "Cinza",   hex: "#9E9E9E" },
    { nome: "Dourado", hex: "#D4AF37" }
  ],

  // Sistema de demandas (opcional). Veja o arquivo COMO_CONFIGURAR_DEMANDAS.md.
  // Enquanto estiver vazio, o catálogo funciona normalmente, só não guarda os pedidos no sistema.
  SUPABASE: {
    URL: "https://uuhxnwkwpxzmddwsmmhd.supabase.co",
    CHAVE_PUBLICA: "sb_publishable_eR5bK22m-9qnDTzeR614-A_APdlAEEa"
  },

  // Texto que aparece no fim da mensagem enviada ao WhatsApp
  MENSAGEM_FINAL: "Aguardo o retorno com valores e prazo. Obrigado!"
};
