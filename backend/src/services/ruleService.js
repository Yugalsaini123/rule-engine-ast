// backend/src/services/ruleService.js
const Node = require('../models/Node');

// Helper to parse individual tokens in the rule string
const parseRuleToken = (token, stack) => {
  if (['AND', 'OR'].includes(token)) {
    const right = stack.pop();
    const left = stack.pop();
    return new Node('OPERATOR', token, left, right);
  } else if (token.match(/\w+\s?(>|<|=)\s?\w+/)) {
    // Parse condition like "age > 30"
    const [field, operator, value] = token.split(/(>|<|=)/).map(item => item.trim());
    return new Node('CONDITION', { field, operator, value });
  }
};

// Create AST from rule string
const createRule = (ruleString) => {
  if (!ruleString) throw new Error('Rule string cannot be empty');
  
  // Split the rule string using parentheses and space
  const tokens = ruleString.match(/(\(|\)|\w+\s?[><=]\s?'?\w+'?|AND|OR)/g); 
  const stack = [];

  for (const token of tokens) {
    if (token === '(' || token === ')') {
      // Handle parentheses logic here (if needed)
    } else {
      const node = parseRuleToken(token, stack);
      stack.push(node);
    }
  }

  if (stack.length !== 1) throw new Error('Invalid rule structure');
  return stack[0];
};


// Function to combine multiple ASTs into one using the OR operator
const combineRules = (rules) => {
  if (rules.length === 0) {
    throw new Error('No rules provided');
  }

  const ruleNodes = rules.map(createRule);

  while (ruleNodes.length > 1) {
    const left = ruleNodes.shift();
    const right = ruleNodes.shift();
    const combined = new Node('OPERATOR', 'OR', left, right);
    ruleNodes.unshift(combined);
  }

  return ruleNodes[0];
};

// Function to evaluate AST rules with user data
const evaluateRule = (root, data) => {
  if (!root || !data) throw new Error('Invalid rule or data');

  if (root.type === 'CONDITION') {
    const { field, operator, value } = root.value;
    const dataValue = data[field];

    if (operator === '=') return String(dataValue) === value;
    if (operator === '>') return parseFloat(dataValue) > parseFloat(value);
    if (operator === '<') return parseFloat(dataValue) < parseFloat(value);

    throw new Error('Unsupported operator');
  }

  if (root.type === 'OPERATOR') {
    if (root.value === 'AND') return evaluateRule(root.left, data) && evaluateRule(root.right, data);
    if (root.value === 'OR') return evaluateRule(root.left, data) || evaluateRule(root.right, data);
  }

  throw new Error('Invalid node type');
};


module.exports = {
  createRule,
  combineRules,
  evaluateRule,
};
