/**
 * Generic CRUD controller factory for simple, user-scoped Mongoose models.
 * Pass the Model itself (not a string) plus a human-readable name for error messages.
 *
 * Every record is scoped to req.user.id, so users can only ever see/edit/delete
 * their own data.
 */
const crudFactory = (Model, resourceName = "Record") => {
  const getAll = async (req, res, next) => {
    try {
      const records = await Model.find({ userId: req.user.id }).sort({ createdAt: -1 });
      res.json({ success: true, count: records.length, data: records });
    } catch (err) {
      next(err);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const record = await Model.findOne({ _id: req.params.id, userId: req.user.id });
      if (!record) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  };

  const create = async (req, res, next) => {
    try {
      const record = await Model.create({ ...req.body, userId: req.user.id });
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  };

  const update = async (req, res, next) => {
    try {
      const record = await Model.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!record) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const record = await Model.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      if (!record) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  };

  return { getAll, getOne, create, update, remove };
};

module.exports = crudFactory;
