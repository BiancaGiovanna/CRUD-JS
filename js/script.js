class Pessoa {
  constructor () {
    this.id = 1;
    this.arrayPessoa = [];
    this.editId = null;

  }
  salvarPessoa() {
    let pessoa = this.lerDados();

    if(this.validaCampo(pessoa)) {
      if(this.editId == null) {
        this.adicionarPessoa(pessoa);
      } else {
        this.atualizar(this.editId, pessoa);
      }
    }
    this.listarPessoa();
    this.limpaCampo();
    // console.log(this.arrayPessoa);
  }
  listarPessoa() {

    let tbody = document.getElementById('tbody');
    tbody.innerText = '';
    for(let i = 0; i < this.arrayPessoa.length; i++) {
      let tr = tbody.insertRow();
      let td_id = tr.insertCell();
      let td_pessoa = tr.insertCell();
      let td_remover = tr.insertCell();
      let td_editar = tr.insertCell();

      td_id.innerText = this.arrayPessoa[i].id;
      td_pessoa.innerText = this.arrayPessoa[i].nomePessoa;

      let buttonRemove = document.createElement('button');
      buttonRemove.innerHTML = "Remover";
      td_remover.appendChild(buttonRemove);
      td_remover.setAttribute("onclick", "pessoa.deletarPessoa(" + this.arrayPessoa[i].id + ")")

      let buttonEdit = document.createElement('button');
      buttonEdit.innerHTML = "Editar";
      td_editar.appendChild(buttonEdit);
      td_editar.setAttribute("onclick", "pessoa.preparaEditar(" + JSON.stringify(this.arrayPessoa[i]) + ")")

      document.getElementById('printArray').innerHTML = JSON.stringify(this.arrayPessoa, null, ' ');
    }
  }
  adicionarPessoa(pessoa) {
    this.arrayPessoa.push(pessoa);
    this.id++;
  }
  atualizar(id, pessoa) {
    for(let i = 0; i < this.arrayPessoa.length; i++) {
      if(this.arrayPessoa[i].id == id) {
        this.arrayPessoa[i].nomePessoa = pessoa.nomePessoa;
      }
    }
  }
  preparaEditar(dados) {
    this.editId = dados.id;
    document.getElementById('nomePessoa').value = dados.nomePessoa;

    document.getElementById('btn-salvar').innerText = 'Atualizar';
  }
  lerDados() {
    let pessoa = {}

    pessoa.id = this.id;
    pessoa.nomePessoa = document.getElementById('nomePessoa').value;

    return pessoa;
  }
  validaCampo(pessoa) {
    let msg = '';
    if(pessoa.nomePessoa == '') {
      msg += '- Informe o nome da pessoa \n'
    };

    if(msg != '') {
      alert(msg);
      return false
    }
    return true
  }
  limpaCampo() {
    document.getElementById('nomePessoa').value = '';

    document.getElementById('btn-salvar').innerText = 'Incluir';
    this.editId = null;
  }
  deletarPessoa(id) {

    if(confirm('Deseja realmente deletar o usuario?')) {
      let tbody = document.getElementById('tbody');

      for(let i = 0; i < this.arrayPessoa.length; i++) {
        if(this.arrayPessoa[i].id == id) {
          this.arrayPessoa.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
  mostrarJSON(id) {
    for(let i = 0; i < this.arrayPessoa.length; i++) {
      let arrayJson = document.createElement('textarea')
      arrayJson.innerText = this.arrayPessoa[i].id;
    }
  }
}
const pessoa = new Pessoa();