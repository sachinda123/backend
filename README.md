To set up the project, follow these steps:

1. **Ensure Docker is Installed**: Make sure you have Docker installed and running on your machine.

2. **Open Terminal**: Navigate to the project folder in your terminal.

3. **Load Environment Variables**: Run the command `source .env` to load environment variables.

4. **Start Docker Compose**: Execute `docker-compose up -d` to start the containers in detached mode.

5. **Check Running Containers**: Confirm the containers are running by running `docker ps`.

6. **Access Container Shell**: Identify the ID of the `api-container` container from the previous step. Then run `docker exec -it <container ID> sh` to access the container shell.

7. **Run Database Migrations**: Inside the container, execute `npx sequelize-cli db:migrate` to run the database migrations.

8. **Seed Database**: Run `npx sequelize-cli db:seed:all` inside the container to seed the database with default user values.

9. **Access PhpMyAdmin**: You can access PhpMyAdmin at http://localhost:44066. Use the username `root` and password `root` to log in.

10. **Run Tests**: Execute `npm test` to run the test cases.

Note:

- All documents are located in the `document` folder, including the answer sheet and Postman collection.
- Not all functions are covered by test cases; only samples are done.
- User passwords are stored as plain text for testing purposes.
- we will able to add process manages Pm2 Node mon but in this phase not added

You can use the following credentials to log in:

- **Owner**: Username: owner, Password: 123456
- **Managers**: Username: managers, Password: 123456
- **Cashiers**: Username: cashiers, Password: 123456
