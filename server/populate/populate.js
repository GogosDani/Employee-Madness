/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json")
const tools = require("./tools.json")
const EmployeeModel = require("../db/employee.model");
const BrandModel = require("../db/brand.model");
const ToolsModel = require("../db/tools.model");
const colors = require("./colors.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}



function randomDateGenerator() {
  const startDate = new Date('2020-01-01').getTime();
  const endDate = new Date().getTime();
  const randomTimestamp = Math.floor(Math.random() * (endDate - startDate + 1)) + startDate;
  const randomDate = new Date(randomTimestamp);
  return randomDate
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brandsFromDb = await BrandModel.find({})

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    isPresent: false,
    favoriteBrand: pick(brandsFromDb)._id,
    startingDate: randomDateGenerator(),
    currentSalary: Math.round(20 + Math.random() * (60 - 20) + 20),
    desiredSalary: Math.round(Math.random() * (80 - 10) + 10),
    favoriteColor: "#E9FF33",
    kittens: [],
    boardGame: "",
    yearsOfExperience: Math.round((Math.random() * 10)),
    color: pick(colors)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

async function populateBrands() {
  await BrandModel.deleteMany({})

  const brandCollection = brands.map(brand => ({ name: brand }))
  await BrandModel.create(brandCollection)
  console.log("Brands created!")
}

async function populateTools() {
  await ToolsModel.deleteMany({});
  await Promise.all(tools.map(tool => ToolsModel.create(tool)));
  console.log("Tools created!");
}

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands()
  await populateEmployees();
  await populateTools()

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
