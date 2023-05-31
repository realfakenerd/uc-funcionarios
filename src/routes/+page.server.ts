import type { Actions } from "./$types";


export const actions: Actions = {
  createFuncionario: async ({ request, fetch }) => {
    const id = Math.round(Math.random() * 999);
    const funcionario = await createOrUpdateFuncionario(await request.formData());
    const res = await fetch('http://187.60.56.72:9191/funcionario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, ...funcionario })
    });

    if (res.ok) return { nome: funcionario.nome, success: true };
  },
  updateFuncionario: async ({ request, fetch }) => {
    const data = await request.formData();
    const id = data.get('btnId');
    const funcionario = await createOrUpdateFuncionario(data);
    const res = await fetch('http://187.60.56.72:9191/funcionario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, ...funcionario })
    });

    if (res.ok) return { nome: funcionario.nome, success: true };
  }
};

async function createOrUpdateFuncionario(formData: FormData) {
  const nome = formData.get('Nome');
  const sobrenome = formData.get('Sobrenome');
  const dataInicio = formData.get('inputDate');
  const cargo = formData.get('cargoSelect');
  const ativo = formData.get('estaAtivo');

  const date = (dataInicio as string).split('-')
  const lastDate = parseInt(date[2])

  date[2] = lastDate + 1;

  return { nome, sobrenome, dataInicio: date.join('-'), cargo, ativo };
}

