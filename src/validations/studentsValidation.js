import { Segments, Joi } from "celebrate";
import { isValidObjectId } from "mongoose";

const validateObjectId = (value, helpers) => {
  // isValidObjectId(value) true або false
  // якшо це валідний id то повернути value
  // якшо не валідний повернути helpers.message("повідомлення про помилка")

  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.message("Invalid id format");
};

export const studentIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(validateObjectId).required(),
  }),
};

export const getAllStudentsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().min(10).max(50).integer(),
  }),
};

export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    age: Joi.number().min(12).integer().required(),
    onDuty: Joi.boolean(),
    avgMark: Joi.number().min(2).max(12).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
  }),
};

export const updateStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(20),
    age: Joi.number().min(12).integer(),
    onDuty: Joi.boolean(),
    avgMark: Joi.number().min(2).max(12),
    gender: Joi.string().valid("male", "female", "other"),
  }).min(1),
  ...studentIdParamSchema,
};
