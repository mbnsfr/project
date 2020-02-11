import React from 'react';
import Parse from 'parse';
import { Map } from 'immutable';
import { Table, Divider, Button, Input, Icon, Row, Col, PageHeader, Modal, Switch, Select, DatePicker } from 'antd';
import tableController from './tableController';
import OprandView from '../oprand/OprandView';

const { Option } = Select

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
const mainQuery = new Parse.Query(ClouseQuery);

const filterData = {
  op: 'and',
  childs: [],
  mainQuery,
  searchResults: [],
};

const doNothing = () => {

};

const TableView = () => {
  const {
    data,
    addPerson,
    cancelEditing,
    setPersonName,
    selectChange,
    deletePerson,
    editPerson,
    confirmEdit,
    makeMainQuery,
    showDatafilter,
    closeDatafilter,
  } = tableController();


  const generateInputByType = (fieldType) => {
    switch (fieldType) {
      case 'name':
        return (
          <Input
            // value={data.personType}
            style={{ width: '9.5vw' }}
            placeholder="String"
            onChange={(e) => setPersonName(e.target.value)}
          />
        );
      case 'date':
        return (
          <DatePicker
            style={{ width: '9.5vw' }}
            onChange={(date, dateString) => setPersonName(dateString)}
          />
        );
      case 'id':
        return (
          <Input
            // value={data.personType}
            style={{ width: '9.5vw' }}
            placeholder="Number"
            type="number"
            onChange={(e) => setPersonName(e.target.value)}
          />
        );
      case 'boolean':
        return <Switch style={{ marginLeft: '10px' }} />;

      default:
        return <Input style={{ width: '10vw' }} disabled />;
    }
  };

  const columns = [
    {
      title: 'type of data',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'data',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (record.type === 'boolean') {
          return (
            <Switch value={record.personName} />
          )
        } else {
          return (
            <a>{text}</a>
          )
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon type="delete" key="delete" onClick={() => deletePerson(record.key)} />
          <Divider type="vertical" />
          <Icon type="edit" key="edit" onClick={() => editPerson(record.key)} />
        </span>
      ),
    },
  ];

  const dataSource = Object.values(data.personsList).map((item, key) => {
    return {
      ...item.toJSON(),
      key,
    }
  })

  return (
    <div>
      <PageHeader>
        <Button onClick={() => showDatafilter()}>Search</Button>
        <Modal
          footer={[
            <Button key="Cancle" onClick={() => closeDatafilter()}>
              Cancle
            </Button>,
            <Button key="Search" type="primary" onClick={() => makeMainQuery(data.tmpdata)}>
              Search
            </Button>,
          ]}
          onCancel={() => closeDatafilter()}
          onOk={() => closeDatafilter()}
          visible={data.dataFilterVisible}
          title="Search"

        >
          <OprandView
            deleteOprand={doNothing}
            makeMainQuery={makeMainQuery}
            filterData={filterData}
            constraints={constraints}
            fields={fields}
          />
        </Modal>
      </PageHeader>

      {data.editing &&
        <Row style={{ padding: 24 }}>
          <h3>Edit Mode</h3>
          <Col span={4}>
            <Select defaultValue='select type of data' onChange={(value) => selectChange(value)}>
              <Option value='name'>name</Option>
              <Option value='date'>date</Option>
              <Option value='id'>id</Option>
              <Option value='boolean'>boolean</Option>
            </Select>
          </Col>
          <Col span={4}>
            {generateInputByType(data.personType || 'name')}
          </Col>
          <Col span={4}>
            <Button onClick={() => confirmEdit()}>Confirm Edit</Button>
            <Button onClick={() => cancelEditing()}>Cancel</Button>
          </Col>
        </Row>
      }

      {!data.editing &&
        <Row style={{ padding: 24 }}>
          <Col span={4}>
            <Select defaultValue='select type of data' onChange={(value) => selectChange(value)}>
              <Option value='name'>name</Option>
              <Option value='date'>date</Option>
              <Option value='id'>id</Option>
              <Option value='boolean'>boolean</Option>
            </Select>
          </Col>
          <Col span={4}>
            {generateInputByType(data.personType || 'name')}
          </Col>
          <Col span={4}>
            <Button onClick={() => addPerson()}>add</Button>
          </Col>
        </Row>
      }

      <Row style={{ padding: 24 }}>
        <Col span={12}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </div >
  );
};

export default TableView;
