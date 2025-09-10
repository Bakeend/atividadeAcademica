import promptSync from "prompt-sync";
const prompt = promptSync();

type StatusChamado = "Aberto" | "Em andamento" | "Fechado";

type Chamado = {
    id: number;
    nome: string;
    titulo: string;
    descricao: string;
    status: StatusChamado;
    dataAbertura: Date;
    responsavel?: String;  
};

type Tecnico = {
    id: number;
    nome: string;
}

const adm: Tecnico = {
    id: 10,
    nome: "Claudio"
}

let chamados: Chamado[] = [];
let usuarios: Tecnico[] = [];
usuarios.push(adm);

function fazerChamado() {
    const id = chamados.length + 1;

    let nome = "";
    while (!nome) { // enquanto estiver vazio
        nome = prompt("Digite seu nome: ")?.trim() || "";
        if (!nome) console.log("Nome não pode ficar vazio!");
    }

    let titulo = "";
    while (!titulo) {
        titulo = prompt("Digite o título do chamado: ")?.trim() || "";
        if (!titulo) console.log("Título não pode ficar vazio!");
    }

    let problema = "";
    while (!problema) {
        problema = prompt("Explique seu problema: ")?.trim() || "";
        if (!problema) console.log("Descrição não pode ficar vazia!");
    }

    const chamado: Chamado = {
        id: id,
        nome: nome.toLowerCase(), 
        titulo: titulo,
        descricao: problema,
        status: "Aberto",
        dataAbertura: new Date()
    };

    chamados.push(chamado);
    console.log("Chamado criado com sucesso!");
    console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
}



function listarChamado() {
    
    if (chamados.length == 0) {
        console.log("Nenhum chamado existente!");
    }
    else {
        chamados.forEach(chamado => {
        console.log(`ID: ${chamado.id}`);
        console.log(`Título: ${chamado.titulo}`);
        console.log(`Nome: ${chamado.nome}`);
        console.log(`Descrição: ${chamado.descricao}`);
        console.log(`Status: ${chamado.status}`);
        console.log(`Data: ${chamado.dataAbertura.toLocaleString()}`);
        console.log(`Responsável: ${chamado.responsavel ?? "Nenhum"}`);
        console.log("-----------------------------");
    });
    }
    console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
}



function resolverChamado() {
    const id = Number(prompt("Digite o ID do chamado:"));
    const nome = prompt("Digite seu nome: ").toLowerCase();

    const busca = buscarChamadoPorId(id);

    if (!busca) {
        console.log("Chamado não encontrado!");
        return;
    }

    if (busca.status === "Aberto") {
        console.log("Chamado aceito!");
        busca.status = "Em andamento";
        busca.responsavel = nome;
     console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
    } else if (busca.status === "Em andamento") {
        if (busca.responsavel === nome) {
            excluirChamado(id);
        } 
        
    else {
    console.log(`Este chamado já está em andamento pelo ${busca.responsavel}`);
    console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
        }
    } 
    
    else {
   console.log("Status não encontrado!");
    console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
    }
}



function excluirChamado(id: number) {
    const tamanhoAntes = chamados.length;
    chamados = chamados.filter(c => c.id !== id);
    if (chamados.length < tamanhoAntes) {
    console.log(`Chamado ${id} excluído com sucesso!`);
    console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
    } 
    else {
        console.log("Chamado não encontrado!");
     console.log("Clica em qualquer tecla pra continuar...");
    prompt("");
    }
}

function buscarChamadoPorId(id: number): Chamado | undefined {
    return chamados.find(chamado => chamado.id === id);
}

function main() {
    
  let loop = true;
  while (loop) {
    console.clear();
    console.log('===============================');
  console.log('  SISTEMA DE CHAMADA (SIMPLES) ');
  console.log('===============================');
    console.log('\nMenu:');
    console.log('1) Fazer um chamado');
    console.log('2) Listar chamados');
    console.log('3) Resolver chamado existente')
    console.log('4) Sair ');
    //console.clear();
    let escolha =  Number(prompt("Escolha: "));
    console.clear();
    switch(escolha) {
        case 1:
 console.log('===============================');
  console.log(' FAZER NOVO CHAMADO ');
  console.log('===============================');
        fazerChamado()
        break;
        
        case 2:
    console.log('===============================');
  console.log('  LISTAR NOVOS CHAMADOS ');
  console.log('===============================');
        listarChamado()
        break;

        case 3:
 console.log('===============================');
  console.log('  RESOLVER UM CHAMADO ');
  console.log('===============================');
        resolverChamado();
        break;
        
        case 4:
    console.log('===============================');
  console.log('  SAINDO... ');
  console.log('===============================');
        loop = false;
    }
    }
}

main()