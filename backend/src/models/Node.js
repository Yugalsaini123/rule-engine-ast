// backend/src/models/Node.js
class Node {
  constructor(type, value, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

module.exports = Node;