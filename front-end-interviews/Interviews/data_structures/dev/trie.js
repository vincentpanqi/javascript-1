/**
 * https://en.wikipedia.org/wiki/Trie
 * https://en.wikipedia.org/wiki/List_of_data_structures
 *
 * Implementations:
 * - http://bit.ly/1DIHPWp
 * - 
 */
var trie = function() {
	this.head = {};
};

trie.prototype.validate = function(word) {
	if((word === undefined) || (word === null)) { throw new Error('The given word is invalid.'); }
	if (typeof word !== 'string') { throw new Error('The given word is not a string'); }
};

trie.prototype.add = function(word) {
	this.validate(word);

	var current = this.head;

	for (var i = 0; i < word.length; i++) {
		if(!(word[i] in current)) {
			current[word[i]] = {};
		}

		current = current[word[i]];
	}

	current.$ = 1;	//word end marker
};

trie.prototype.hasWord = function(word) {
	this.validate(word);

	var current = this.head;

	for (var i = 0; i < word.length; i++) {
		if(!(word[i] in current)) {
			return false;
		}

		current = current[word[i]];
	}

	return current.$ === 1;	//word end marker
};

trie.prototype.remove = function(word) {
	this.validate(word);

  var noKids = function (node) {
    return Object.keys(node).length === 0;
  };

	var canDelete = function (word, index, node){
		if (word === undefined ) { throw new Error('Bad Word'); }
		if (index >= word.length) { throw new Error('Bad index to check for deletion.'); }
		if (node === undefined ) { throw new Error('Bad Node at ' + index + ' for ' + word); }

		if (index === word.length - 1) {
			//last letter
			//always delete word marker (as we are deleting word)
			return (delete node.$) && noKids(node); //if last letter of word, should be empty.
		} else {
			//any other letter in word
			//check child, and after child check, I am now empty
			if (canDelete(word, index + 1, node[word[index + 1]])) {
				//delete me
				return (delete node[word[index + 1]]) && noKids(node);
			}
		}
		return false;
	};

  canDelete(word, -1, this.head);
};

trie.prototype.sort = function() {
	var word = '';
	var sorted = [];

  var sortTrie = function (node, word, sorted) {
    for(var letter in node) {
      if (letter === '$') { sorted.push(word); }
      else {
        sortTrie(node[letter], word + letter, sorted);
      }
    }
  };

	sortTrie(this.head, word, sorted);

	return sorted;
};

module.exports = trie;
