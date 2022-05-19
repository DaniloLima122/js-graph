export class Graph {

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


        this.adjacentList.get(originVertex).push(targetVertex);
        this.adjacentList.get(targetVertex).push(originVertex);
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

 
    bfs(node, destination = '') {
        let visited = {};

        let q = [];

        visited[node] = true;
        q.push(node);

        let resultMessage = ``;

        while (q.length > 0) {
            var element = q.shift();

            var adjList = this.adjacentList.get(element.toString());

            for (var index in adjList) {
                var item = adjList[index];
                if (!visited[item]) {
                    visited[item] = true;
                    console.log('Vértice visitado: ', item)
                    q.push(item);
                }

                if ((item == destination)) {
                    resultMessage = `\nValor ${destination} encontrado`;
                }
            }

        }
        console.log(resultMessage)
    }

    dfs(v, visited) {
        visited[v] = true;
        process.stdout.write(v + " ");

        const list = Object.fromEntries(this.adjacentList)

        for (const key in list[v]) {
            if (!visited[list[v][key.toString()]]) {
                this.dfs(list[v][key.toString()], visited);
            }
        }
    }

    connectedComponents() {

        const adjList = Object.fromEntries(this.adjacentList);

        const visitedList = Object.fromEntries(this.adjacentList)

        for (const key in visitedList) {
            visitedList[key.toString()] = false;
        }

        let conexosQtd = 0;

        for (const key in adjList) {
            if (!visitedList[key.toString()]) {
                process.stdout.write(`\n${conexosQtd + 1}º componente conexo -> `);
                conexosQtd++;
                this.dfs(key, visitedList);
            }
        }

        console.log('\n\nQuantidade total de componentes conexos: ', conexosQtd)
    }

} 