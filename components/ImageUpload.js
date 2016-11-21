import React, { Component } from 'react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: props.inputImage || ''
    };
  }

  componentWillReceiveProps(props) {
    if(props.inputImage){
      this.setState({
        file: props.inputImage
      });
    }
  }

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.onValueChange(reader.result, this.props.name);
    }
    reader.readAsDataURL(file);
  }

  render() {
    let $imagePreview = null;
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<img src={this.state.imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <input className="form-control" type="file" onChange={(event)=>this.handleImageChange(event)} />
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default ImageUpload;
