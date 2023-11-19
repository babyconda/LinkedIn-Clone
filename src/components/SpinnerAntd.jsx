import React from "react";
import { Alert, Space, Spin } from "antd";
import styled from "styled-components";
const App = () => (
  <Container>
    <Space
      // direction="vertical"
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>
  </Container>
);
export default App;

const Container = styled.div`
  .content {
    padding: 50px;
    margin-top: 120px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;
