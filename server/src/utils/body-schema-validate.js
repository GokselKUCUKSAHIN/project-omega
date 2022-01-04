const yup = require("yup");

const schema = Object.freeze(yup.object().shape({
  vmid: yup.string().trim().matches(/[\wğüşıöç\- ]{1,50}/i).required(),
  run: yup.object().shape({
    id: yup.string().trim().matches(/[a-z0-9\-_]{10}/i).required(),
    startTime: yup.number().integer().max(9223372036854775807).required(),
    stopTime: yup.number().integer().max(9223372036854775807).required()
  }),
  result: yup.object().shape({
    status: yup.mixed().oneOf(["SUCCESSFUL", "FAILED"]).required(),
    params: yup.object().shape({
      W: yup.number().required(),
      L: yup.number().required(),
      Ls: yup.number().required(),
      Lm: yup.number().required(),
      Ws: yup.number().required(),
      p: yup.number().required()
    }).required(),
    s11: yup.array().of(yup.array().of(yup.number()).length(2)).required(),
    fitness: yup.number().required()
  }).required(),
  algorithm: yup.object().shape({
    name: yup.string().trim().matches(/[\wğüşıöç( )]{3,}/i).required(),
    config: yup.object().required()
  }).required()
}));

async function bodySchemaValidate(requestBody) {
  return await schema.isValid(requestBody);
}

module.exports = bodySchemaValidate;

/*
{
  vmid: _0,
  result: {
    status: on of the FAILED | SUCCESSFUL
    params: {
      W: _20.5,
      L: _30.3,
      Ls: _14.7,
      Lm: _12.1,
      Ws: _13.2,
      p: _-4.2
    },
    s11: [
      _[x1, y1],
      _[x2, y2],
      _[x3, y3],
      _[x4, y4],
      _[x5, y5],
          .
          .
          .
      _[xn, yn]
    ],
    fitness: _123
  },
  algorithm: {
    name: _"EPO"
    config: {
      seed: _1234567,
      arg1: _1,
      arg2: _2,
      arg3: _7
    },
  }
}
*/