import fs from 'fs';
import { Graph } from './graph.js';

console.log('\nPara criar um grafo adicione os dados no arquivo txt na raiz do projeto obedecendo a estrutura\n\n')

// TODO Itens restantes a fazer
// TODO 1 - Busca em largura
// TODO 2 - Componentes conexos

try {
    const data = fs.readFileSync('./listaDeAdjacencia.txt', 'UTF-8');

    const lines = data.split(/\r?\n/);

    const [verticesAmount, ...adjacency] = lines;

    const vertices = adjacency.map(item => item.split(' '))

    const graph = new Graph(verticesAmount)

    vertices.map((vertice) => {
        graph.addEdge(...vertice);
    })
    
    graph.getRepresentationalAddjacencyMatrix()

} catch (err) {
    console.error('Erro ao ler o arquivo, verifique o arquivo e tente novamente');
}


// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('A', 'D');
// graph.addEdge('C', 'D');
// graph.addEdge('C', 'G');
// graph.addEdge('D', 'G');
// graph.addEdge('D', 'H');
// graph.addEdge('B', 'E');
// graph.addEdge('B', 'F');
// graph.addEdge('E', 'I');

// graph.addEdge('1', '3');
// graph.addEdge('2', '4');
// graph.addEdge('2', '5');
// graph.addEdge('3', '4');
// graph.addEdge('3', '5');
// graph.addEdge('4', '5');
// graph.addEdge('4', '6');
// graph.addEdge('5', '6');
// graph.addEdge('0', '1');
// graph.addEdge('0', '2');
// graph.addEdge('0', '3');
// graph.addEdge('0', '4');
// graph.addEdge('2', '3');
// console.log('Número de vértices: ' + graph.getTotalVertices());
// console.log('Número de arestas: ' + graph.countEdges());
// console.log('Grau máximo: ' + graph.getGrauMaximo());
// console.log('Grau mínimo: ' + graph.getGrauMinimo());
// console.log('Representação em matriz de adjacência ');
// graph.getRepresentationalAddjacencyMatrix()

// console.log(graph.toString());

