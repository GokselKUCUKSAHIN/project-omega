const yup = require("yup");
const schema = yup.object().shape({
  vmid: yup.string().trim().matches(/[\w\- ]{1,20}/i).required(),
  result: yup.object().shape({}).required(),
  algorithm: yup.object().shape({
    name: yup.string().trim().matches(/[\w\( \)]+/i).required(),
    config: yup.object().shape({

    }).required()
  }).required()
});

function bodySchemaValidate(requestBody) {
  // Not READY
}

module.exports = bodySchemaValidate;