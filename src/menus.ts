import { MessageType, WAClient } from "@adiwajshing/baileys";

export function Principal(
  remoteJid: string,
  client: WAClient,
  type: MessageType
): void {
  client.sendMessage(
    remoteJid,
    `
              ----- MENU PRINCIPAL -----
              Escolha uma das opções:
              1 - Pizzas
              2 - Lanches
              3 - Porções
              4 - Fazer uma sugestão, reclamação ou elogio
              `,
    type
  );
}

export function Pizzas(
  remoteJid: string,
  client: WAClient,
  type: MessageType
): void {
  client.sendMessage(
    remoteJid,
    `
              ----- PIZZAS -----
              Calabreza
              Bauru
              Quatro queijos
              Portuguesa
              À moda da casa
              `,
    type
  );
}
export function Lanches(
  remoteJid: string,
  client: WAClient,
  type: MessageType
): void {
  client.sendMessage(
    remoteJid,
    `
              ----- LANCHES -----
              X-Salada
              X-Salada Bacon
              X-Burger
              "menu" para voltar ao menu principal
              `,
    type
  );
}
export function Porcoes(
  remoteJid: string,
  client: WAClient,
  type: MessageType
): void {
  client.sendMessage(
    remoteJid,
    `
              ----- PORÇÕES -----
              Salaminho
              Queijos
              Palmito
              "menu" para voltar ao menu principal
              `,
    type
  );
}
export function NotaAtendimento(
  remoteJid: string,
  client: WAClient,
  type: MessageType
): void {
  client.sendMessage(
    remoteJid,
    `
              ----- NOTA PARA O ATENDIMENTO -----
              1 - Ótimo
              2 - Bom
              3 - Ruim
              4 - Péssimo
              `,
    type
  );
}
