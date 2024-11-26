import React, { useState, useEffect } from "react";
import { Table, Column } from "react-virtualized";
import { Button } from "antd";
import "react-virtualized/styles.css";
import "antd/dist/antd.css";
import AddDataModal from "../component/AddDataModal";

const Home = () => {
  const [data, setData] = useState([]); // Dữ liệu bảng
  const [isModalVisible, setIsModalVisible] = useState(false); // Quản lý modal
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải dữ liệu
  const [page, setPage] = useState(1); // Quản lý trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Quản lý tổng số trang

  useEffect(() => {
    fetchData();
  }, [page]);

  // Lấy dữ liệu từ API
  const fetchData = () => {
    if (loading) return; // Prevent multiple calls if loading is true
    setLoading(true);
    fetch(`https://66f5fdd4436827ced975a180.mockapi.io/api/v1/persons?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((newData) => {
        setData((prevData) => [...prevData, ...newData]);
        setLoading(false);
        setTotalPages(8); // Example: set the total number of pages for pagination purposes (you can replace this with actual response data if available)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // Hiển thị modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Ẩn modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Thêm dữ liệu
  const handleAdd = (newData) => {
    fetch("https://66f5fdd4436827ced975a180.mockapi.io/api/v1/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData), // Chuyển đối tượng thành chuỗi JSON
    })
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => [...prevData, data]);
        handleCancel();
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  // Hàm xử lý sự kiện scroll
  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    // Kiểm tra nếu người dùng đã cuộn gần tới cuối bảng
    if (scrollHeight - clientHeight - scrollTop <= 200 && !loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Tăng số trang để lấy thêm dữ liệu
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Virtualized Table</h1>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: "20px" }}
      >
        Add Data
      </Button>

      <Table
        width={800}
        height={400}
        headerHeight={40}
        rowHeight={50}
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        onScroll={handleScroll} // Thêm sự kiện scroll
      >
        <Column label="ID" dataKey="id" width={100} />
        <Column label="Name" dataKey="name" width={300} />
        <Column label="Gender" dataKey="gender" width={200} />
        <Column label="Hometown" dataKey="hometown" width={200} />
      </Table>

      <AddDataModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Home;
