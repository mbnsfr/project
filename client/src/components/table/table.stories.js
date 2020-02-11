import React from 'react';
import { Map } from 'immutable';
import 'antd/dist/antd.css';
import Parse from 'parse';
import TableView from './TableView';
import OprandView from '../oprand/OprandView';
import ClouseView from '../clouse/ClouseView'

export default {
  title: 'datafilter',
};

const fields = Map({
  name: 'string',
  id: 'number',
  date: 'time',
  boolean: 'boolean',
});

const constraints = Map({
  string: [
    'Contains',
    'StartsWith',
    'EndsWith',
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsEmpty',
    'NotIsEmpty',
    'IsNull',
    'NotIsNull',
  ],
  number: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
  time: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
  boolean: [],
  default: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],

});

const ClouseQuery = Parse.Object.extend('ClouseQuery');
const query = new Parse.Query(ClouseQuery);
const mainQuery = new Parse.Query(ClouseQuery);

const filterData = {
  op: 'and',
  childs: [],
  mainQuery,
  searchResults: [],
};

export const Operand = () => (
  <OprandView
    filterData={filterData}
    constraints={constraints}
    fields={fields}
  />
);

export const Clouse = () => (
  <ClouseView
    queryIndex={1}
    query={query}
    fields={fields}
    constraints={constraints}
  />
);

export const Table = () => (
  <TableView />
);
