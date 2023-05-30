import type { Funcionario } from "../lib/types";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const res = await fetch('http://187.60.56.72:9191/funcionario')
  const data = await res.json();

  return {
    funcionarios: data as Funcionario[]
  }
}) satisfies PageLoad
