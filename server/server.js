require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const equipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/brand.model");


const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const page = parseInt(req.query.page) || 1
  if (page < 1) {
    res.status(500).json({ error: "Page can't be lower than 1!" })
  } else {
    const employees = await EmployeeModel.find().populate("favoriteBrand").skip((page - 1) * 10).limit(10).sort({ name: 1 });
    return res.json(employees);
  }

});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("favoriteBrand");
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;
  const brandId = await BrandModel.findOne({ name: employee.favoriteBrand })
  employee.favoriteBrand = brandId

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const updatedEmployee = req.body
    const brandId = await BrandModel.findOne({ name: updatedEmployee.favoriteBrand })
    updatedEmployee.favoriteBrand = brandId
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...updatedEmployee } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/employees/search/:search", async (req, res, next) => {
  try {
    const name = req.params.search
    const filteredEmployees = await EmployeeModel.find({ name: { $regex: name, $options: "i" } })
    if (filteredEmployees.length === 0) {
      res.status(404).json({ error: "Employee not found" })
    } else {
      res.json(filteredEmployees)
    }
  } catch (err) {
    return next(err)
  }
})

app.get("/api/employees/missing/all", async (req, res, next) => {       // /employees/missing ???!!
  try {
    const missingEmployees = await EmployeeModel.find({ isPresent: false })
    if (missingEmployees.length === 0) {
      res.json({ info: "every employee is here!" })
    } else {
      res.json(missingEmployees)
    }

  } catch (err) {
    return next(err)
  }
})

app.put("/api/employees/missing/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const employee = await EmployeeModel.findById(id)
    employee.isPresent = !employee.isPresent
    employee.save()
    res.json(employee)
  } catch (err) {
    return next(err)
  }

})


// ------------------------------------------------------------------------------

// equipments CRUD

app.post("/api/equipments", async (req, res, next) => {
  try {
    const equipment = req.body
    const newEquipment = await EquipmentModel.create(equipment)
    return res.status(200).json(newEquipment)
  } catch (err) {
    return next(err)
  }
})

app.get("/api/equipments", async (req, res, next) => {
  try {
    const equipments = await EquipmentModel.find({})
    return res.json(equipments)
  } catch (err) {
    return next(err)
  }
})

app.get("/api/equipments/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const equipment = await equipmentModel.findById(id)
    res.json(equipment)
  } catch (err) {
    return next(err)
  }
})

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const deleted = await EquipmentModel.findByIdAndDelete(id)
    return res.json(deleted)
  } catch (err) {
    return next(err)
  }
})

app.put("/api/equipments/:id", async (req, res, next) => {
  try {
    const newEquipment = req.body
    const updated = await EquipmentModel.findByIdAndUpdate(req.params.id, {
      $set: newEquipment
    })
    res.json(updated)
  } catch (err) {
    return next(err)
  }

})


// Main function

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
