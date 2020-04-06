import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { $axios } from '@/utils/interceptor';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 文件!');
  }
  return isJpgOrPng;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class ImageUploader extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      imageUrl: props.value,
    };
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  handleUpload(data) {
    $axios.post('/upload/img', data.file).then((res) => {
      message.error(res.desc);
      console.log(res);
    });
  }
  render() {
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.handleUpload}
      >
        {this.imageUrl ? (
          <img src={this.imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          <div>
            <Icon type={this.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">上传图片</div>
          </div>
        )}
      </Upload>
    );
  }
}

export default ImageUploader;
