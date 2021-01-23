import React from 'react'
import { Table } from "antd";

const ApiTable = ({ dataSource, columns, scroll, bordered }) => {
    return (
      <div className = "apitable">
        <Table dataSource={dataSource} columns={columns} scroll = {scroll} bordered = {bordered} />;
      </div>
    );
}

export default ApiTable;

 