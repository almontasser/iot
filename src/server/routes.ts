import * as express from "express";
import { Employee, Facility, Gas, Reading, User } from "./db";

const router = express.Router();

// USERS

router.get("/api/users", async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/api/users", async (req, res, next) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/api/users/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.put("/api/users/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.sendStatus(404);
  }
  await user.update(req.body);
  res.json(user);
});

router.delete("/api/users/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.sendStatus(404);
  }
  await user.destroy();
  res.sendStatus(204);
});

// EMPLOYEES
router.get("/api/employees", async (req, res, next) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

router.post("/api/employees", async (req, res, next) => {
  const employee = await Employee.create(req.body);
  res.json(employee);
});

router.get("/api/employees/:id", async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id);
  res.json(employee);
});

router.put("/api/employees/:id", async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return res.sendStatus(404);
  }
  await employee.update(req.body);
  res.json(employee);
});

router.delete("/api/employees/:id", async (req, res, next) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return res.sendStatus(404);
  }
  await employee.destroy();
  res.sendStatus(204);
});

// FACILITIES
router.get("/api/facilities", async (req, res, next) => {
  const facilities = await Facility.findAll();
  res.json(facilities);
});

router.post("/api/facilities", async (req, res, next) => {
  const facility = await Facility.create(req.body);
  res.json(facility);
});

router.get("/api/facilities/:id", async (req, res, next) => {
  const facility = await Facility.findByPk(req.params.id);
  res.json(facility);
});

router.put("/api/facilities/:id", async (req, res, next) => {
  const facility = await Facility.findByPk(req.params.id);
  if (!facility) {
    return res.sendStatus(404);
  }
  await facility.update(req.body);
  res.json(facility);
});

router.delete("/api/facilities/:id", async (req, res, next) => {
  const facility = await Facility.findByPk(req.params.id);
  if (!facility) {
    return res.sendStatus(404);
  }
  await facility.destroy();
  res.sendStatus(204);
});

// ANCHORS
router.get("/api/anchors", async (req, res, next) => {
  const anchors = await Facility.findAll();
  res.json(anchors);
});

router.post("/api/anchors", async (req, res, next) => {
  const anchor = await Facility.create(req.body);
  res.json(anchor);
});

router.get("/api/anchors/:id", async (req, res, next) => {
  const anchor = await Facility.findByPk(req.params.id);
  res.json(anchor);
});

router.put("/api/anchors/:id", async (req, res, next) => {
  const anchor = await Facility.findByPk(req.params.id);
  if (!anchor) {
    return res.sendStatus(404);
  }
  await anchor.update(req.body);
  res.json(anchor);
});

router.delete("/api/anchors/:id", async (req, res, next) => {
  const anchor = await Facility.findByPk(req.params.id);
  if (!anchor) {
    return res.sendStatus(404);
  }
  await anchor.destroy();
  res.sendStatus(204);
});

// EMERGENCIES
router.get("/api/emergencies", async (req, res, next) => {
  const emergencies = await Facility.findAll();
  res.json(emergencies);
});

router.get("/api/emergencies/:id", async (req, res, next) => {
  const emergencies = await Facility.findAll({
    where: {
      employee_id: req.params.id,
    },
  });
  res.json(emergencies);
});

// GASES
router.get("/api/gases", async (req, res, next) => {
  const gases = await Gas.findAll();
  res.json(gases);
});

router.get("/api/temperatures/:id", async (req, res, next) => {
  const gases = await Gas.findAll({
    where: {
      anchor_id: req.params.id,
    },
  });
  res.json(gases);
});

// READINGS
router.get("/api/readings", async (req, res, next) => {
  const readings = await Reading.findAll();
  res.json(readings);
});

router.get("/api/readings/:id", async (req, res, next) => {
  const readings = await Reading.findAll({
    where: {
      employee_id: req.params.id,
    },
  });
  res.json(readings);
});

export default router;
