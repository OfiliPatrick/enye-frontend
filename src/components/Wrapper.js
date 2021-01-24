import React, { useState, useEffect } from "react";
import Header from "./Header";
import Loader from "./Loader";
import ApiTable from "./ApiTable";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button, Space } from "antd";

const Wrapper = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  let searchInput = "";

  const addKey = (arr) => {
    for (let i = 0; i < 1000; i++) {
      if (i >= arr.length) {
        break;
      }
      let pair = { key: (i + 1).toString() };
      arr[i] = { ...pair, ...arr[i] };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "https://api.enye.tech/v1/challenge/records";
      const response = await fetch(apiUrl);
      const data = await response.json();
      let content = data.records.profiles;
      addKey(content);
      setApiData(content);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
      fixed: "left",
      width: 60,
      ...getColumnSearchProps("key"),
    },
    {
      title: "FirstName",
      dataIndex: "FirstName",
      key: "firstName",
      width: 120,
      ...getColumnSearchProps("FirstName"),
    },

    {
      title: "LastName",
      dataIndex: "LastName",
      key: "lastname",
      width: 120,
      ...getColumnSearchProps("LastName"),
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Prefer to skip", value: "Prefer to skip" },
      ],
      onFilter: (value, record) => record.Gender.indexOf(value) === 0,
      width: 121,
    },

    {
      title: "Latitude",
      dataIndex: "Latitude",
      key: "latitude",
      width: 110,
      ...getColumnSearchProps("Latitiude"),
    },
    {
      title: "Longitude",
      dataIndex: "Longitude",
      key: "longitude",
      width: 110,
      ...getColumnSearchProps("Longitude"),
    },
    {
      title: "CreditCardNumber",
      dataIndex: "CreditCardNumber",
      key: "creditcardnumber",
      width: 170,
      ...getColumnSearchProps("CreditCardNumber"),
    },
    {
      title: "CreditCardType",
      dataIndex: "CreditCardType",
      key: "creditcardtype",
      width: 145,
      filters: [
        { text: "MasterCard", value: "MasterCard" },
        { text: "Visa", value: "Visa" },
        { text: "JCB", value: "JCB" },
      ],
      onFilter: (value, record) => record.CreditCardType.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
      width: 200,
      ...getColumnSearchProps("email"),
    },
    {
      title: "DomainName",
      dataIndex: "DomainName",
      key: "domainname",
      width: 145,
      ...getColumnSearchProps("DomainName"),
    },
    {
      title: "PhoneNumber",
      dataIndex: "PhoneNumber",
      key: "phonenumber",
      width: 135,
      ...getColumnSearchProps("PhoneNumber"),
    },
    {
      title: "MacAddress",
      dataIndex: "MacAddress",
      key: "macaddress",
      width: 160,
      ...getColumnSearchProps("MacAddress"),
    },
    {
      title: "URL",
      dataIndex: "URL",
      key: "url",
      width: 290,
      ...getColumnSearchProps("URL"),
    },
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "userName",
      width: 110,
      ...getColumnSearchProps("UserName"),
    },
    {
      title: "LastLogin",
      dataIndex: "LastLogin",
      key: "lastlogin",
      width: 180,
      ...getColumnSearchProps("LastLogin"),
    },
    {
      title: "PaymentMethod",
      dataIndex: "PaymentMethod",
      key: "paymentmethod",
      filters: [
        { text: "Paypal", value: "paypal" },
        { text: "Money Order", value: "money order" },
        { text: "Check", value: "check" },
        { text: "CC", value: "cc" },
      ],
      onFilter: (value, record) => record.PaymentMethod.indexOf(value) === 0,
      width: 120,
    },
  ];

  const scroll = { x: 3000, y: 544 };
  return (
    <div className="wrapper">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <ApiTable
          dataSource={apiData}
          columns={columns}
          scroll={scroll}
          bordered={true}
        />
      )}
    </div>
  );
};

export default Wrapper;
