import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { createStoreHook } from 'react-redux';

const dataStore = createStoreHook();

function App() {
  return (
    <div className="App">
      <Col span={24}>
        <Row>
          <Col>
            <h1>Test</h1>
          </Col>
          <Col>

          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default App;
