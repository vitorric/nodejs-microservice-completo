const { Schema } = require('mongoose'),
  { mongoDB } = require('../conn/index.js');

const BNCCSchema = new Schema(
  {
    component: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    thematic_unit: {
      type: String,
      required: true
    },
    knowledge_objects: {
      type: String,
      required: true
    },
    skills: {
      type: String,
      required: true
    }
  }, {
    collection: 'BNCC',
    timestamps: true
  }
);

exports.BNCC = mongoDB.model('BNCC', BNCCSchema);
