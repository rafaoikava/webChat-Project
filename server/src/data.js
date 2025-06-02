const USERS = [
  {
    username: "comercial1",
    password: "comer1",
    role: "comer1",
    groups: ["todos", "comercial"],
  },
  {
    username: "comercial2",
    password: "comer2",
    role: "comer2",
    groups: ["todos", "comercial"],
  },
  {
    username: "suporte",
    password: "sup1",
    role: "sup1",
    groups: ["todos", "suporte"],
  },
  {
    username: "financeiro",
    password: "finan1",
    role: "finan1",
    groups: ["todos", "financeiro"],
  },
  {
    username: "adm",
    password: "adm",
    role: "adm",

    groups: ["todos", "comercial", "financeiro", "suporte"],
  },
];

const GROUPS = [
  { name: "Todos", id: "todos" },
  { name: "Comercial", id: "comercial" },
  { name: "Suporte", id: "suporte" },
  { name: "Financeiro", id: "financeiro" },
];

module.exports = { USERS, GROUPS };
