import fs from 'fs';
import prompt from 'prompt';
import { Graph } from './graph.js';

// TODO Itens restantes a fazer
// TODO 3 - Interface de linha de comando pro usuario interagir


const gerarGrafoDoArquivo = () => {
    const data = fs.readFileSync('./listaDeAdjacencia.txt', 'UTF-8');

    const lines = data.split(/\r?\n/);

    const [verticesAmount, ...adjacency] = lines;

    const vertices = adjacency.map(item => item.split(' '))

    const graph = new Graph(verticesAmount)

    vertices.map((vertice) => {
        graph.addEdge(...vertice);
    })

    return graph;

}

try {

    const graph = gerarGrafoDoArquivo();

    prompt.start();

    console.log('\x1b[32m', '\n-- Grafo gerado com sucesso a partir do arquivo, o que deseja fazer? --\n')

    const actions = [
        {
            label: 'A',
            desc: 'Mostrar número de vértices',
            fn: () => console.log('Número de vértices: ' + graph.getTotalVertices())
        },
        {
            label: 'B',
            desc: 'Mostrar número de arestas',
            fn: () => console.log('Número de arestas: ' + graph.countEdges())
        },
        {
            label: 'C',
            desc: 'Grau mínimo do grafo',
            fn: () => console.log('Grau mínimo: ' + graph.getGrauMinimo())
        },
        {
            label: 'D',
            desc: 'Grau máximo do grafo',
            fn: () => console.log('Grau máximo: ' + graph.getGrauMaximo())
        },
        {
            label: 'F',
            desc: 'Mostrar saída para busca em largura',
            fn: (node, dest) => graph.bfs(node, dest)
        },
        {
            label: 'G',
            desc: 'Buscar por componentes conexas',
            fn: () => graph.connectedComponents()
        },
    ]

    console.log('\x1b[37m', '-- Para escolher, digite a letra de uma das opções abaixo --\n')

    actions.forEach(action => {
        console.log('\x1b[37m', `${action.label}. ${action.desc}`);
    })
    console.log('\n-----------------------------\n')

    prompt.get(['action'], (err, result) => {

        if (err === '') return;

        if (result.action.length === 0) {
            console.log('\x1b[33m', '\nInforme uma opção válida')
            return;
        }

        const optionIsValid = actions.some(action => action.label.toLowerCase() === result.action.toLowerCase());

        if (!optionIsValid) {
            console.error('\x1b[31m', 'Opção inválida')
            return;
        };

        const option = actions.find(act => act.label.toLowerCase() === result.action.toLowerCase());

        console.log(`\nOpção escolhida: ${option.desc} \n`)

        if (option.label.toLowerCase() === 'f') {
            console.log('\n-- Informe o vértice de partida, o valor procurado é opcional --\n')

            prompt.get([
                { name: 'Valor inicial', required: true },
                { name: 'Valor procurado', required: false }
            ], (err, result) => {
                if (err) return;


                option.fn(result['Valor inicial'], result['Valor procurado'])
            })

            return;
        }
        

        option.fn()

    })

} catch {
    console.error('\x1b[31m', 'Algo de errado não está certo!');
}

