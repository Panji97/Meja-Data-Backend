import Employee from "../models/Employee.js";
import User from "../models/Users.js";
import { Op } from "sequelize";

export const getAllEmployees = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Employee.findAll({
        attributes: ["uuid", "name", "nik"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Employee.findAll({
        attributes: ["uuid", "name", "nik"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!employee) return res.status(404).json({ msg: "Employee Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Employee.findOne({
        attributes: ["uuid", "name", "nik"],
        where: {
          id: employee.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Employee.findOne({
        attributes: ["uuid", "name", "nik"],
        where: {
          [Op.and]: [{ id: employee.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { name, nik } = req.body;
  try {
    await Employee.create({
      name: name,
      nik: nik,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Employee Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!employee) return res.status(404).json({ msg: "Employee Not Found" });
    const { name, nik } = req.body;
    if (req.role === "admin") {
      await Employee.update(
        { name, nik },
        {
          where: {
            id: employee.id,
          },
        }
      );
    } else {
      if (req.userId !== employee.userId)
        return res.status(403).json({ msg: "Forbidden" });
      await Employee.update(
        { name, nik },
        {
          where: {
            [Op.and]: [{ id: employee.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Employee updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!employee) return res.status(404).json({ msg: "Employee Not Found" });
    if (req.role === "admin") {
      await Employee.destroy({
        where: {
          id: employee.id,
        },
      });
    } else {
      if (req.userId !== Employee.userId)
        return res.status(403).json({ msg: "Forbidden" });
      await Employee.destroy({
        where: {
          [Op.and]: [{ id: employee.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
