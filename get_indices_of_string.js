/**
  * Drawback: cant detect "aa" in "aaa" <=> should return [0,1] but the result is [0], bc it remove string after found.
  * 
  * @returns {number[]}
  */

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

/**
  * Solutions:
  * @returns {number[]} startingIndices
  */

var str = "...";
var searchKeyword = "...";

var startingIndices = [];

var indexOccurence = str.indexOf(searchKeyword, 0);

while(indexOccurence >= 0) {
    startingIndices.push(indexOccurence);

    indexOccurence = str.indexOf(searchKeyword, indexOccurence + 1);
}
