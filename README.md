Input Validation:

Check if the endWord exists in the wordList. If not, return an empty result.

BFS Layer Construction:

Use a queue to explore words level-by-level, maintaining only the shortest paths to each word.
Transform each word by replacing one letter at a time and check if it’s valid (exists in the word list).
Shortest Path Tracking:

Use a Map (layers) to store paths leading to each word.
Append new valid paths to the layers map for each transformation.

End Condition:

Stop BFS once the endWord is found. Extract all paths leading to it.
