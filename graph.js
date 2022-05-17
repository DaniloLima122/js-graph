export class Graph {

    edgeNumber = 0;

    constructor(verticesNumber = 0) {
        this.vertices = [];
        this.adjacentList = new Map();
        this.verticesNumber = verticesNumber;
    }

    limitExceeds() {
        if (this.vertices.length >= this.verticesNumber) {
            console.log('Número de vertices definidos chegou ao limite');
            return true;
        }

        return false;
    }

    addVertex(vertex) {

        if (this.limitExceeds()) return;

        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
            this.adjacentList.set(vertex, []);
        }
    }

    addEdge(originVertex, targetVertex) {
        if (!this.adjacentList.has(originVertex)) {

            if (this.limitExceeds()) return;
            this.addVertex(originVertex);
        }

        if (!this.adjacentList.has(targetVertex)) {

            if (this.limitExceeds()) return;
            this.addVertex(targetVertex)
        }


        if (!this.adjacentList.get(originVertex).find(item => item === targetVertex)) {
            this.adjacentList.get(originVertex).push(targetVertex);
        }

        if (!this.adjacentList.get(targetVertex).find(item => item === originVertex)) {
            this.adjacentList.get(targetVertex).push(originVertex);
        }
    }

    countEdges() {
        if (this.vertices.length === 0) return 'Grafo vazio';

        let total = 0;

        this.adjacentList.forEach(value => {
            total += value.length
        });

        return total / 2;
    }

    getGrauVertice(vertex) {
        let ajdList = this.adjacentList.get(vertex);

        let grau = ajdList.length;

        ajdList.forEach(vertx => {
            if (vertex === vertx) {
                grau += 1;
            }
        })

        return grau;
    }

    getGrauMaximo() {

        let maximo = 0;

        const keys = Array.from(this.adjacentList.keys())

        keys.forEach(vertex => {

            const grauDoVertice = this.getGrauVertice(vertex);
            if (grauDoVertice > maximo) {
                maximo = grauDoVertice;
            }
        })

        return maximo;
    }

    getGrauMinimo() {

        let minimo = this.adjacentList.size;
        const keys = Array.from(this.adjacentList.keys())

        keys.forEach(vertex => {

            const grauDoVertice = this.getGrauVertice(vertex);
            if (grauDoVertice < minimo) {
                minimo = grauDoVertice;
            }
        })
        return minimo;
    }

    getVertices() {
        return this.vertices;
    }

    getTotalVertices() {
        return this.vertices.length;
    }

    getAdjacentList() {
        return this.adjacentList;
    }

    toString() {
        let s = '';
        this.vertices.map((vertice, index) => {
            s += `${vertice} -> `;

            const vizinhos = this.adjacentList.get(this.vertices[index])

            vizinhos.map(vizinho => {
                s += `${vizinho} `;
            })

            s += '\n'


        })

        return s;
    }

    getAdjacencyMatrix() {
        const matrix = Array.from(Array(9), () => Array(9).fill(0));

        for (let i = 0; i < this.vertices.length; i++) {

            for (let j of this.adjacentList.get(this.vertices[i])) {
                matrix[i][j] = 1;
            }
        }

        return matrix;
    }

    getRepresentationalAddjacencyMatrix() {

        const adjacencyMatrix = this.getAdjacencyMatrix();

        let colum = '  |  ';
        let headerline = '-------'

        this.vertices.map(v => {
            colum += v + '    '
            headerline += '----';
        })
        console.log(colum)
        console.log(headerline)

        for (let i = 0; i < this.verticesNumber; i++) {

            let line = '';

            for (let j = 0; j < this.verticesNumber; j++) {
                let arr = adjacencyMatrix[i][j];

                line += arr + '    ';

            }
            console.log(this.vertices[i] + ' |  ' + line)
        }
    }
} 