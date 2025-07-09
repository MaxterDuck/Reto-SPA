const fs = require('fs');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

// 👇 RESET AUTOMÁTICO AL INICIAR (opcional para desarrollo)
const defaultData = {
  users: [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "3001234567",
      enrollNumber: "123456789",
      dateOfAdmission: "2023-08-15"
    }
  ]
};

fs.writeFileSync('db.json', JSON.stringify(defaultData, null, 2));

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`✅ JSON Server running at http://localhost:${PORT}`);
});
