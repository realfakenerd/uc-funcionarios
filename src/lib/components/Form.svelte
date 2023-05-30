<form class="pb-4" method="POST">
	<fieldset class="flex flex-col md:flex-row gap-2">
		<TextField value={nome} style="outlined" title="Nome" />
		<TextField value={sobrenome} style="outlined" title="Sobrenome" />
	</fieldset>

	<fieldset class="text-label-large">
		<label for="selection">Selecione um cargo</label>
		<select bind:value={cargo} name="cargoSelect" id="selection">
			<option value="DESENVOLVEDOR">Desenvolvedor</option>
			<option value="ADMINISTRADOR">Administrador</option>
		</select>
	</fieldset>

	<fieldset>
		<DateFieldAndPicker
			fieldOptions={{ name: 'inputDate' }}
			clearable={true}
			bind:value={iniciouEm}
			dateValidator={(d) => {
				const lastChar = d.charCodeAt(9);
				return Boolean(lastChar && lastChar % 2);
			}}
		/>
	</fieldset>

	<fieldset class="text-label-large">
		<legend>está ativo</legend>
		<div class="radio-container">
			<input
				checked
				type="radio"
				id="radioSIM"
				name="estaAtivo"
				class="radio-input-primary radio-input"
				bind:group={estaAtivo}
				value={true}
			/>
			<label for="radioSIM">Sim</label>
		</div>

		<div class="radio-container">
			<input
				type="radio"
				id="radioNAO"
				bind:group={estaAtivo}
				name="estaAtivo"
				class="radio-input radio-input-primary"
				value={false}
			/>
			<label for="radioNAO">Não</label>
		</div>
	</fieldset>

	<button class="btn interactive-bg-primary-container w-full" type="submit">enviar</button>
</form>
