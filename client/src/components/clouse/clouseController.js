import { Record } from 'immutable';
import { withState, withHandlers, pipe } from '../../util';


const setConstraint = ({ setData, data }) => (selectedConstraint) => {
  setData((d) => d.set('selectedConstraint', selectedConstraint));
  console.log('query constraint', data.query)

};

const setFieldValue = ({ data, setData }) => (fieldValue) => {
  data.query._where = {};

  switch (data.selectedConstraint) {
    case 'EqualTo':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.equalTo(data.fieldName, fieldValue),
      }));
      break;
    case 'NotEqualTo':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.notEqualTo(data.fieldName, fieldValue),
      }));
      break;
    case 'GreaterThan':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.greaterThan(data.fieldName, fieldValue),
      }));
      break;
    case 'LessThan':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.lessThan(data.fieldName, fieldValue),
      }));
      break;
    case 'GreaterThanOrEqualTo':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.greaterThanOrEqualTo(data.fieldName, fieldValue),
      }));
      break;
    case 'LessThanOrEqualTo':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.lessThanOrEqualTo(data.fieldName, fieldValue),
      }));
      break;

    case 'StartsWith':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.startsWith(data.fieldName, fieldValue),
      }));
      break;
    case 'Contains':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.contains(data.fieldName, fieldValue),
      }));
      break;
    case 'EndsWith':
      setData((d) => d.merge({
        fieldValue,
        query: data.query.endsWith(data.fieldName, fieldValue),
      }));
      break;
    default:
      setData((d) => d.set('query', data.query.equalTo(data.fieldName, fieldValue)));
  }
  console.log('query constraint', data.query)

};

const setFieldName = ({ setData, data }) => (fieldName) => {
  setData((d) => d.merge({
    fieldValue: '',
    fieldName,
  }));
  console.log('query name', data.query)
};

const init = (props) => Record({
  fieldName: 'name',
  fieldValue: null,
  query: props.query,
  selectedConstraint: 'EqualTo',
  jsonq: props.query.toJSON(),
});

const clouseController = pipe(
  withState((props) => init(props)),
  withHandlers({
    setFieldValue,
    setConstraint,
    setFieldName,
  }),
);

export default clouseController;
