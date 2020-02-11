import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, Select, Tree } from 'antd';
import oprandController from './oprandController';
import ClouseView from '../clouse/ClouseView';
import filterIcon from '../../svg/filter-icon';

const InputGroup = Input.Group;
const { Option } = Select;
const { TreeNode } = Tree;

const OprandView = (props) => {
  const {
    addClouse,
    deleteChild,
    changeOprand,
    addOprand,
    data,
  } = oprandController(props);
  const {
    fields,
    constraints,
    operandIndex,
    deleteOprand,
    makeMainQuery,
  } = (props);

  const OprandNode = () => (
    <InputGroup compact>
      <Select defaultValue={data.op} onChange={(value) => changeOprand(value)}>
        <Option value="and">And</Option>
        <Option value="or">Or</Option>
      </Select>
      <Button icon="plus" onClick={() => addClouse()} />
      <Button onClick={() => addOprand()}>
        <Icon component={filterIcon} />
      </Button>
      <Button icon="close" onClick={() => deleteOprand(operandIndex)} />
    </InputGroup>
  );

  return (

    <Tree defaultExpandAll>
      <TreeNode title={<OprandNode />}>
        {
          data.childs.map((item, index) => {
            if (item.op && (item.childs.length >= 0)) {
              return (
                <TreeNode
                  key={index}
                  title={(
                    <OprandView
                      makeMainQuery={makeMainQuery}
                      filterData={item}
                      deleteOprand={deleteChild}
                      constraints={props.constraints}
                      fields={props.fields}
                      operandIndex={index}
                    />
                  )}
                />
              );
            }
            if (item) {
              return (
                <TreeNode
                  key={index}
                  title={(
                    <ClouseView
                      deleteClouse={deleteChild}
                      queryIndex={index}
                      query={item}
                      fields={fields}
                      constraints={constraints}
                    />
                  )}
                />
              );
            }
          })
        }
      </TreeNode>

    </Tree>
  );
};

OprandView.propTypes = {
  fields: PropTypes.object.isRequired,
  constraints: PropTypes.object.isRequired,
  operandIndex: PropTypes.object.isRequired,
  deleteOprand: PropTypes.func.isRequired,
  makeMainQuery: PropTypes.func.isRequired,
};

export default OprandView;
