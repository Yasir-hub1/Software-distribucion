const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

class Graph {
    constructor() {
        this.edges = [];
        this.nodes = {};
        this.predecessors = {};
    }

    addEdge(u, v, w) {
        this.edges.push([u, v, w]);
    }

    bellmanFord(src, vertices) {
        let dist = Array(vertices).fill(Infinity);
        dist[src] = 0;
        this.predecessors = Array(vertices).fill(null);

        for (let i = 1; i < vertices; i++) {
            let anyUpdate = false;
            for (let [u, v, w] of this.edges) {
                if (dist[u] != Infinity && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    this.predecessors[v] = u;
                    anyUpdate = true;
                }
            }
            if (!anyUpdate) break;
        }

        for (let [u, v, w] of this.edges) {
            if (dist[u] != Infinity && dist[u] + w < dist[v]) {
                console.log("Graph contains negative weight cycle");
                return;
            }
        }

        return dist;
    }

    buildGraphFromData(data) {
        data.features.forEach(feature => {
            const coordinates = feature.geometry.coordinates;
            const oneway = feature.properties.oneway;
            if (coordinates && coordinates.length > 1) {
                for (let i = 0; i < coordinates.length - 1; i++) {
                    const [lon1, lat1] = coordinates[i];
                    const [lon2, lat2] = coordinates[i + 1];

                    if (!this.nodes[`${lat1},${lon1}`]) {
                        this.nodes[`${lat1},${lon1}`] = Object.keys(this.nodes).length;
                    }
                    if (!this.nodes[`${lat2},${lon2}`]) {
                        this.nodes[`${lat2},${lon2}`] = Object.keys(this.nodes).length;
                    }

                    const u = this.nodes[`${lat1},${lon1}`];
                    const v = this.nodes[`${lat2},${lon2}`];
                    const w = haversineDistance(lat1, lon1, lat2, lon2);

                    // Añadir arista en dirección directa
                    this.addEdge(u, v, w);

                    // Añadir arista en dirección inversa si la calle no es de un solo sentido
                    if (oneway !== "yes" && oneway !== true) {
                        this.addEdge(v, u, w);
                    }
                }
            }
        });
    }
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (x) => x * Math.PI / 180;
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon1 - lon2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

// Leer el archivo JSON
const filePath = path.join(__dirname, 'nodosc.json');
let data;

try {
    console.log('Leyendo archivo JSON...');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('Archivo JSON leído con éxito');
    data = JSON.parse(fileContent);
    console.log('Archivo JSON parseado con éxito');
} catch (err) {
    console.error('Error leyendo el archivo JSON:', err);
}

const graph = new Graph();
if (data) {
    console.log('Construyendo el grafo desde los datos');
    graph.buildGraphFromData(data);
    console.log('Grafo construido con éxito');
} else {
    console.error('Los datos no se pudieron cargar, el grafo no fue construido');
}
const vertices = Object.keys(graph.nodes).length;

function findClosestNode(latitude, longitude) {
    let closestNode = null;
    let minDistance = Infinity;

    Object.keys(graph.nodes).forEach(key => {
        const [lat, lon] = key.split(',').map(Number);
        const distance = haversineDistance(latitude, longitude, lat, lon);
        if (distance < minDistance) {
            minDistance = distance;
            closestNode = key;
        }
    });

    return closestNode;
}

app.post('/findRoute', (req, res) => {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required" });
    }

    const originKey = findClosestNode(origin.latitude, origin.longitude);
    const destinationKey = findClosestNode(destination.latitude, destination.longitude);

    if (!originKey || !destinationKey) {
        return res.status(400).json({ error: "Invalid origin or destination" });
    }

    const sourceIndex = graph.nodes[originKey];
    const destinationIndex = graph.nodes[destinationKey];

    const distances = graph.bellmanFord(sourceIndex, vertices);

    if (distances[destinationIndex] === Infinity) {
        return res.status(400).json({ error: "No path found" });
    }

    // Reconstruct the path from source to destination
    let path = [];
    let currentNode = destinationIndex;

    while (currentNode !== sourceIndex) {
        path.unshift(currentNode); // Use unshift to add to the beginning of the array
        currentNode = graph.predecessors[currentNode];

        if (currentNode === null) {
            return res.status(400).json({ error: "No path found" });
        }
    }
    path.unshift(sourceIndex); // Add the source at the beginning

    // Convert node indices back to coordinates
    const routeCoordinates = path.map(index => {
        const coord = Object.keys(graph.nodes).find(key => graph.nodes[key] === index);
        const [lat, lon] = coord.split(',').map(Number);
        return { latitude: lat, longitude: lon };
    });

    res.json({ route: routeCoordinates });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
