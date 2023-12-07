class Biblioteca {
    constructor() {
        this.acervo = [];
        this.usuarios = [];
    }

    adicionarItem(item) {
        this.acervo.push(item);
        console.log(`${item.titulo} adicionado ao acervo.`);
    }

    adicionarUsuario(usuario) {
        this.usuarios.push(usuario);
        console.log(`${usuario.nome} adicionado(a) à lista de usuários.`);
    }

    emprestarItem(codigo, registroAcademico) {
        const item = this.acervo.find(i => i.codigo === codigo);
        const usuario = this.usuarios.find(u => u.registroAcademico === registroAcademico);

        if (item && usuario) {
            item.emprestar(usuario);
        } else {
            console.log("Item ou usuário não encontrado.");
        }
    }

    devolverItem(codigo) {
        const item = this.acervo.find(i => i.codigo === codigo);

        if (item) {
            item.devolver();
        } else {
            console.log("Item não encontrado.");
        }
    }

    listarAcervo() {
        console.log("Acervo da Biblioteca:");
        this.acervo.forEach(item => {
            console.log(`${item.titulo} - ${item.autor}`);
            
        });
        console.log("-------------------");
    }
}

class Usuario {
    constructor(nome, registroAcademico, dataDeNascimento) {
        this.nome = nome;
        this.registroAcademico = registroAcademico;
        this.dataDeNascimento = dataDeNascimento;
    }
}


class EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.codigo = codigo;
        this.emprestado = false;
        this.usuarioEmprestimo = null;
    }

    emprestar(usuario) {
        if (!this.emprestado) {
            this.emprestado = true;
            this.usuarioEmprestimo = usuario;
            console.log(`${this.titulo} emprestado para ${usuario.nome}.`);
        } else {
            console.log(`${this.titulo} já está emprestado.`);
        }
    }

    devolver() {
        if (this.emprestado) {
            this.emprestado = false;
            const usuarioAntigo = this.usuarioEmprestimo;
            this.usuarioEmprestimo = null;
            console.log(`${this.titulo} devolvido por ${usuarioAntigo.nome}.`);
        } else {
            console.log(`${this.titulo} não está emprestado.`);
        }
    }
}

class Livro extends EntidadeBibliografica {
    static generos = ["Ficção Científica", "Terror", "Comédia", "Suspense", "Drama", "História", "Policial"];
    constructor(titulo, autor, anoPublicacao, codigo, genero) {
        super(titulo, autor, anoPublicacao, codigo);
        this.genero = genero;
    }

    informacoes() {
        console.log("Informações do livro :");
        console.log(`Livro: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Ano de Publicação: ${this.anoPublicacao}`);
        console.log(`Gênero: ${this.genero}`);
        console.log(`Código: ${this.codigo}`);
        console.log(`Emprestado: ${this.emprestado ? 'Sim' : 'Não'}`);
        console.log(`Usuário de Empréstimo: ${this.usuarioEmprestimo ? this.usuarioEmprestimo.nome : 'Nenhum'}`);
        console.log('-------------------');
    }
}
// const generos = [{
//     ficcao_cientifica: "Ficção científica",
//     terror: "Terror",
//     comedia: "Comédia",
//     suspense: "Suspense",
//     drama: "Drama",
//     historia: "História", 
//     policial: "Policial",
// }]

class Revista extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo, edicao) {
        super(titulo, autor, anoPublicacao, codigo);
        this.edicao = edicao;
    }

    informacoes() {
        console.log("Informações da revista:");
        console.log(`Revista: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Ano de Publicação: ${this.anoPublicacao}`);
        console.log(`Edição: ${this.edicao}`);
        console.log(`Código: ${this.codigo}`);
        console.log(`Emprestado: ${this.emprestado ? 'Sim' : 'Não'}`);
        console.log(`Usuário de Empréstimo: ${this.usuarioEmprestimo ? this.usuarioEmprestimo.nome : 'Nenhum'}`);
        console.log('-------------------');
    }
}

const biblioteca = new Biblioteca();
const usuario1 = new Usuario("João", "12345", "01/01/1990");
const usuario2 = new Usuario("Carlos", "54321", "02/02/1991");
const usuario3 = new Usuario("Albert", "67890", "03/03/1993");
const usuario4 = new Usuario("Matilda", "09876", "04/04/1994");
const usuario5 = new Usuario("Kaisa", "99999", "03/12/1989");

async function fetchData() {
    try {
        const response = await fetch("http://api-biblioteca-mb6w.onrender.com/acervo");
        const data = await response.json();

        const livro1 = new Livro(data[0].titulo, data[0].autor, data[0].anoPublicacao, data[0].codigo, data[0].genero);
        const livro2 = new Livro(data[1].titulo, data[1].autor, data[1].anoPublicacao, data[1].codigo, data[1].genero)
        const revista1 = new Revista(data[2].titulo, data[2].autor, data[2].anoPublicacao, data[2].codigo, data[2].edicao);
        const revista2 = new Revista(data[3].titulo, data[3].autor, data[3].anoPublicacao, data[3].codigo, data[3].edicao);

        biblioteca.adicionarItem(livro1);
        biblioteca.adicionarItem(livro2);

        biblioteca.adicionarItem(revista1);
        biblioteca.adicionarItem(revista2);
        console.log("--------------------");
        biblioteca.listarAcervo();

        livro1.informacoes();
        livro2.informacoes();

        revista1.informacoes();
        revista2.informacoes();

        console.log("Lista de usuários:");
        console.log(`Nome: ${usuario1.nome}, Registro Acadêmico: ${usuario1.registroAcademico}, Data de nascimento: ${usuario1.dataDeNascimento}`);
        console.log(`Nome: ${usuario2.nome}, Registro Acadêmico: ${usuario2.registroAcademico}, Data de nascimento: ${usuario2.dataDeNascimento}`);
        console.log(`Nome: ${usuario3.nome}, Registro Acadêmico: ${usuario3.registroAcademico}, Data de nascimento: ${usuario3.dataDeNascimento}`);
        console.log(`Nome: ${usuario4.nome}, Registro Acadêmico: ${usuario4.registroAcademico}, Data de nascimento: ${usuario4.dataDeNascimento}`);
        console.log(`Nome: ${usuario5.nome}, Registro Acadêmico: ${usuario5.registroAcademico}, Data de nascimento: ${usuario5.dataDeNascimento}`);
        console.log("--------------------");

        biblioteca.emprestarItem(livro1.codigo, usuario1.registroAcademico);
        biblioteca.emprestarItem(livro2.codigo, usuario2.registroAcademico);
        biblioteca.emprestarItem(revista1.codigo, usuario3.registroAcademico);
        biblioteca.devolverItem(revista1.codigo, usuario3.registroAcademico);
        biblioteca.emprestarItem(revista2.codigo, usuario4.registroAcademico);
        biblioteca.devolverItem(livro1.codigo, usuario1.registroAcademico);
        biblioteca.emprestarItem(livro1.codigo, usuario5.registroAcademico);
        
        console.log("Status após empréstimos e devoluções:");
        livro1.informacoes();
        livro2.informacoes();
        revista1.informacoes();
        revista2.informacoes();


    } catch (error) {
        console.error("Erro ao buscar dados da API", error);
    }
}



console.log("ADDING USERS:")
biblioteca.adicionarUsuario(usuario1);
biblioteca.adicionarUsuario(usuario2);
biblioteca.adicionarUsuario(usuario3);
biblioteca.adicionarUsuario(usuario4);
biblioteca.adicionarUsuario(usuario5);
console.log("--------------------");

await fetchData();

console.log(biblioteca);

