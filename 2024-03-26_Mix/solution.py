class Graph:
    def __init__(self, edges) -> None:
        self.graph = {}
        for src, dst in edges:
            if src not in self.graph:
                self.graph[src] = []
            if dst not in self.graph:
                self.graph[dst] = []
            self.graph[src].append(dst)

    def route(self, src, dst):
        visited = set()
        parents = {}
        
        queue = [src]
        visited.add(src)

        while len(queue):
            node = queue.pop(0)

            if node == dst:
                result = [node]
                current_node = parents.get(node)
                while current_node != None:
                    result.append(current_node)
                    current_node = parents.get(current_node)
                return list(reversed(result))

            for node_dst in self.graph[node]:
                if node_dst not in visited:
                    visited.add(node_dst)
                    parents[node_dst] = node
                    queue.append(node_dst)


flights = [
    ['USA', 'JPN'],
    ['JPN', 'ANG'],
    ['USA', 'FRA'],
    ['FRA', 'USA'],
    ['ANG', 'AUS'],
    ['PER', 'FRA'],
    ['AUS', 'BRA'],
    ['FRA', 'BRA']
]


def findWay(src, dst, flights):
    g = Graph(flights)
    return g.route(src, dst)


print(findWay("USA", "BRA", flights))
