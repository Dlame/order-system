import React, { Component } from 'react';

import { Result, Button } from 'antd';

class PageNotFound extends Component {
  state = {};
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push('/');
            }}
          >
            Back Home
          </Button>
        }
      />
    );
  }
}

export default PageNotFound;
