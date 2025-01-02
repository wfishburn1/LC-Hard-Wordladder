/**
 * Finds all shortest transformation sequences from beginWord to endWord.
 * @param beginWord - The starting word.
 * @param endWord - The target word.
 * @param wordList - A list of valid words for transformation.
 * @returns An array of all shortest transformation sequences.
 */
function findLadders(
    beginWord: string,
    endWord: string,
    wordList: string[]
): string[][] {
    const wordSet = new Set(wordList);
    const result: string[][] = [];

    if (!wordSet.has(endWord)) return result;

    // Step 1: Breadth-First Search (BFS) to build the shortest path tree
    const layers: Map<string, string[][]> = new Map(); // Tracks paths reaching each word
    layers.set(beginWord, [[beginWord]]);
    const queue = [beginWord];
    let found = false;

    while (queue.length > 0 && !found) {
        const nextQueue: string[] = [];
        const visitedInLayer = new Set<string>();

        for (const word of queue) {
            const paths = layers.get(word) || [];
            for (let i = 0; i < word.length; i++) {
                for (let charCode = 97; charCode <= 122; charCode++) {
                    const newChar = String.fromCharCode(charCode);
                    if (word[i] === newChar) continue;

                    const newWord = word.slice(0, i) + newChar + word.slice(i + 1);
                    if (!wordSet.has(newWord)) continue;

                    if (newWord === endWord) found = true;

                    if (!layers.has(newWord)) {
                        layers.set(newWord, []);
                        nextQueue.push(newWord);
                        visitedInLayer.add(newWord);
                    }

                    // Append paths leading to the newWord
                    const newPaths = paths.map(path => [...path, newWord]);
                    layers.get(newWord)?.push(...newPaths);
                }
            }
        }

        // Mark all visited words in this layer to avoid reprocessing
        for (const word of visitedInLayer) {
            wordSet.delete(word);
        }

        queue.splice(0, queue.length, ...nextQueue);
    }

    // Step 2: Collect results from the endWord
    if (layers.has(endWord)) {
        result.push(...(layers.get(endWord) || []));
    }

    return result;
}

// Example Usage
const beginWord = "hit";
const endWord = "cog";
const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];

console.log(findLadders(beginWord, endWord, wordList));