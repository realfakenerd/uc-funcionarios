import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const id = Math.random() * 343;
    const nome = data.get('Nome');
    const sobrenome = data.get('Sobrenome');
    const inputDate = data.get('inputDate');
    const cargo = data.get('cargoSelect');
    const estaAtivo = data.get('estaAtivo');

    // Formatar a data no formato "$date-time"
    const iniciouEm = new Date(inputDate as string).toISOString();

    console.log(JSON.stringify({
      id, nome, sobrenome, iniciouEm, cargo, estaAtivo
    }));

    const res = await fetch('http://187.60.56.72:9191/funcionario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, nome, sobrenome, iniciouEm, cargo, estaAtivo
      })
    });

    if (res.ok) return { nome, success: true };
  }
};