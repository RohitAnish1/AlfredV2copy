// Certificate.tsx
import React, { Component, createRef, ChangeEvent, LegacyRef } from 'react';

import { exportComponentAsPNG } from 'react-component-export-image';
import '../Components/Certificate/styles.css';

interface CertificateState {
  uploadedImage: string | null;
}

class Certificate extends Component<{}, CertificateState> {
  certificateWrapper = createRef<HTMLDivElement>();
  textAreaRef: React.RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();
  state: CertificateState = {
    uploadedImage: null,
  };

  handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ uploadedImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  handleDownload = () => {
    if (this.certificateWrapper.current) {
      exportComponentAsPNG(this.certificateWrapper, {
        html2CanvasOptions: { backgroundColor: null },
      });
    }
  };


  componentDidMount() {
    const myDiv = document.getElementById("mydiv");
    if (myDiv) {
      this.dragElement(myDiv);
    }
  }

  dragElement(elmnt: HTMLElement) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const header = document.getElementById(elmnt.id + "header");

    if (header) {
      header.addEventListener("mousedown", dragMouseDown);
    } else {
      elmnt.addEventListener("mousedown", dragMouseDown);
    }

      function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e: MouseEvent) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  

  render() {
    const { uploadedImage } = this.state;

    return (
      <div className="Certificate">
        <div className="Meta">
          <h1>Certificates</h1>
          <p>Please upload an image.</p>
          <input type="file" accept="image/*" onChange={this.handleImageUpload} />
          <button onClick={this.handleDownload}>Download</button>
        </div>
        <div id="mydiv">
          <div id="mydivheader"></div>
          <textarea ref={this.textAreaRef}></textarea>
        </div>
        
<div id="downloadWrapper" ref={this.certificateWrapper}>
  <div id="certificateWrapper" style={{ position: 'relative' }}>
    {uploadedImage && <img src={uploadedImage} alt="Certificate" />}
    {this.textAreaRef && this.textAreaRef.current && (
      <div
      style={{
        position: 'absolute',
        bottom: '0px', // Align to bottom
        left: '0px', // Align to left
      }}
      >
        {this.textAreaRef.current.value}
      </div>
    )}
  </div>
</div>

      </div>
    );
  }
}

export default Certificate;
