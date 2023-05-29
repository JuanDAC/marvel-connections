# Disney Connections

This repository contains a project that focuses on establishing connections between actors in Disney movies using graph theory. The project utilizes a graph model where actors are represented as vertices and movies as edges connecting them. The goal is to visualize and analyze the relationships between actors in a subset of 8 Disney movies.

## Abstract

This project addresses the problem of establishing connections between actors in Disney movies using graph theory. A graph model is proposed, where actors are represented as vertices and movies as edges connecting them. By focusing on a subset of 8 Disney movies and their main actors, the relationships between actors are visualized and analyzed. The theoretical and computational solutions involve creating nodes and edges to represent the actors and their collaborations. The count of possible combinations in the graph model depends on the number of movies and actors, highlighting the scalability of the approach.

## Problem

The problem consists of finding and establishing connections between actors in Disney movies. This involves identifying an appropriate model for representation using a graph.

## Modeling

To model the problem, a graph is used to represent the connections between actors. Each actor is represented by a vertex, and the movies in which they have participated are the edges that connect the corresponding actors. To simplify the complexity, a subset of 8 Disney movies is considered, focusing on the main actors.

## Theoretical Solution

The theoretical solution involves creating nodes for each actor and generating connections (edges) between the actors based on the movies they have collaborated on. This allows us to create a graph that models the connections between actors in Disney movies. The graph provides a visual and structured representation of the relationships between actors, facilitating analysis and identification of common connections.

## Computational Solution

The computational solution involves creating the nodes and edges for the graph. The nodes are generated by iterating over the set of movies to extract the actor names and remove duplicates. Each actor name is mapped to a node object. The generation of edges involves iterating over the movies and the actors participating in each movie. Nested loops are used to generate all possible combinations of actor pairs in a particular movie. The code for the computational solution can be found [here](https://github.com/JuanDAC/marvel-connections-client).

## Counting Problem

The number of possible results or combinations depends on the size of the input data. For example, if we consider two selected movies with an average of 3 actors per movie, there would be a total of 6 nodes (actors) and 12 edges (connections). The count can vary based on the number of movies and actors, with a larger number resulting in a higher total number of combinations.

## Real-Life Interpretation

The project has practical applications in the entertainment industry and can be useful for various purposes, including identifying frequent collaborations, analyzing popularity based on movie participation, and assisting in casting planning for future Disney movies.

## Conclusion

The project effectively addresses the problem of finding and establishing connections between actors in Disney movies using a graph model. The modeling approach provides a clear and structured visualization of the relationships between actors, facilitating analysis and identification of common
