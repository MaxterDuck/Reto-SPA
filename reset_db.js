const fs = require('fs');

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

fs.writeFile('db.json', JSON.stringify(defaultData, null, 2), (err) => {
  if (err) {
    console.error("❌ Error resetting database:", err);
  } else {
    console.log("✅ Base de datos reiniciada correctamente.");
  }
});
