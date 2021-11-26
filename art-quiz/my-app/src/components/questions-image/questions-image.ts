import Control from '../../common/control';

export default class QuestionsImage extends Control {
  imageContainer: Control<HTMLImageElement>;

  i: number;

  downloadButton: Control<HTMLElement>;

  canvas: Control<HTMLCanvasElement>;

  constructor(parentNode: HTMLElement, i: number) {
    super(parentNode, 'div', 'settings-container question-author', '');
    this.i = i;
    this.downloadButton = new Control(this.node, 'button', 'settings download-button', 'download');
    this.downloadButton.node.innerHTML = '<span class="download-icon"></span>download';
    this.imageContainer = new Control(this.node, 'img', 'question-image', '');
    this.canvas = new Control(this.node, 'canvas', 'canvas', '');
    this.canvas.node.style.display = 'none';
    // this.dotsContainer = new Control(this.node, 'div', 'dots-container', '')
    // this.dot = new Control(this.node, 'span', 'dot', '')
    // this.dotsContainer.node.appendChild(this.dot.node)
    this.styleBg(this.i);
    this.downloadButton.node.onclick = () => {
      this.saveImage();
    };
  }

  async styleBg(i: number) {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/OlgaSavitsk/image-data/master/img/${i}.jpg`;
    img.onload = () => {
      this.imageContainer.node.setAttribute('src', `${img.src}`);
    };
  }

  saveImage() {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymouse');
    img.src = this.imageContainer.node.src;
    img.onload = () => {
      this.canvas.node.width = img.width;
      this.canvas.node.height = img.height;
      const ctx = this.canvas.node.getContext('2d');
      ctx!.drawImage(img, 0, 0, this.canvas.node.width, this.canvas.node.height);
      const link = document.createElement('a');
      link.download = 'download.png';
      link.href = this.canvas.node.toDataURL();
      link.click();
      // link.delete();
    };
  }
}
