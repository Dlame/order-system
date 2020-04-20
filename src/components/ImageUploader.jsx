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
    console.log('handleChange', info.file.status);
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

  handleUpload = (data) => {
    let formdata = new FormData();
    formdata.append('file', data.file);
    $axios.post('/upload/img', formdata).then((res) => {
      if (res.code !== 200) {
        message.error(res.desc);
        return;
      }
      message.success('上传成功');
      this.setState({
        imageUrl: res.data,
        loading: false,
      });
      this.props.onChange(res.data);
    });
  };
  render() {
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        customRequest={this.handleUpload}
      >
        {this.state.imageUrl ? (
          <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">上传图片</div>
          </div>
        )}
      </Upload>
    );
  }
}

export default ImageUploader;
