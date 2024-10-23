// backend/src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createRule, combineRules, evaluateRule } = require('./src/services/ruleService');
const Rule = require('./src/models/rule');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Improved error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// API to create an AST from a rule string
app.post('/api/rules/create', async (req, res) => {
  try {
    const { ruleString } = req.body;

    if (!ruleString || typeof ruleString !== 'string') {
      return res.status(400).json({ error: 'Invalid rule string' });
    }

    const ruleAST = createRule(ruleString); // Generate AST
    
    // Save rule to the database
    const savedRule = await Rule.create({
      name: 'Sample Rule', // Dynamic naming
      description: 'A rule for complex conditions', // Dynamic description
      ast: ruleAST, // Store the AST in JSONB format
    });

    res.json(savedRule); // Return the saved rule
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// API to combine multiple rules
app.post('/api/rules/combine', (req, res, next) => {
  try {
    const { rules } = req.body;
    if (!Array.isArray(rules)) return res.status(400).json({ error: 'Invalid rules array' });

    const combinedRule = combineRules(rules);
    res.json(combinedRule);
  } catch (error) {
    next(error);
  }
});

// API to evaluate a rule against user data
app.post('/api/rules/evaluate', async (req, res) => {
  try {
    const { ruleId, data } = req.body;

    if (!ruleId || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid rule or data' });
    }

    // Fetch the rule AST from the database using the ruleId
    const rule = await Rule.findByPk(ruleId);
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const result = evaluateRule(rule.ast, data); // Pass AST from the database
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
