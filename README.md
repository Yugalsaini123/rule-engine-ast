# rule-engine-ast
# Rule Engine with AST

This project implements a simple 3-tier rule engine application using Abstract Syntax Trees (AST) to determine user eligibility based on various attributes. It uses Node.js for the backend, React for the frontend, and PostgreSQL for data storage.

## Features

- Create rules using a simple string syntax
- Combine multiple rules into a single AST
- Evaluate rules against user data
- Store and retrieve rules from a PostgreSQL database
- RESTful API for rule management and evaluation
- React-based frontend for rule creation and evaluation

## Prerequisites

- Node.js and npm
- PostgreSQL
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/rule-engine-ast.git
   cd rule-engine-ast
   ```

2. Install backend dependencies:
   ```
   npm install
   ```

3. Set up the PostgreSQL database and update the `src/config/database.js` file with your database credentials.

4. Run database migrations:
   ```
   npx sequelize-cli db:migrate
   ```

5. Start the backend server:
   ```
   npm start
   ```

6. Install frontend dependencies and start the React app:
   ```
   cd frontend
   npm install
   npm start
   ```

7. Access the application at `http://localhost:3000`

## Usage

1. Use the web interface to create rules and evaluate them against user data.
2. Alternatively, use the API endpoints directly:
   - `POST /api/rules/create`: Create a new rule
   - `POST /api/rules/combine`: Combine multiple rules
   - `POST /api/rules/evaluate`: Evaluate a rule against user data

## Testing

Run the backend tests:

```
npm test
```

Run the frontend tests:

```
cd frontend
npm test
```

## Security Considerations

- Input validation and sanitization are implemented to prevent injection attacks.
- Authentication and authorization should be added for production use.
- HTTPS should be used in production to encrypt data in transit.

## Performance Optimization

- The AST structure allows for efficient rule evaluation.
- Database indexes are used to improve query performance.
- Caching can be implemented for frequently accessed rules.

## Future Improvements

- Implement user-defined functions for advanced conditions
- Add more complex rule parsing and evaluation
- Implement versioning for rules

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.