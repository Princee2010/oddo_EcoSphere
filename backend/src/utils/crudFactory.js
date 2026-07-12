const prisma = require("../config/prismaClient");

const crudFactory = (modelName) => {
  const model = prisma[modelName];

  const getAll = async (req, res, next) => {
    try {
      const records = await model.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      });
      res.json({ success: true, count: records.length, data: records });
    } catch (err) {
      next(err);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const record = await model.findFirst({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (!record) {
        res.status(404);
        throw new Error(`${modelName} record not found`);
      }
      res.json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  };

  const create = async (req, res, next) => {
    try {
      const record = await model.create({
        data: { ...req.body, userId: req.user.id },
      });
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  };

  const update = async (req, res, next) => {
    try {
      const existing = await model.findFirst({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (!existing) {
        res.status(404);
        throw new Error(`${modelName} record not found`);
      }
      const record = await model.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const existing = await model.findFirst({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (!existing) {
        res.status(404);
        throw new Error(`${modelName} record not found`);
      }
      await model.delete({ where: { id: req.params.id } });
      res.json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  };

  return { getAll, getOne, create, update, remove };
};

module.exports = crudFactory;