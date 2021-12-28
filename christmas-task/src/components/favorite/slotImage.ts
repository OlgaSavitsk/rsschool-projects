import Control from "@/common/control";
import { ILimit } from "@/models/limit";

interface defaultPosition {
  left: string,
  top: string
}

const old: defaultPosition = {
  left: '',
  top: ''
}

export default class SlotImage extends Control {
  topIndent = 0
  leftIndent = 0
  offsetX: any;
  offsetY: any;
  isReturn!: boolean
  isActive!: boolean
  
  
    constructor(parentNode: HTMLElement, public num: string, index: number, public limit?: ILimit) {
      super(parentNode, 'img', 'favorites-card-img', '');
      this.node.setAttribute('src', `./toys/${num}.png`)
      this.node.setAttribute('draggable', 'true')
      this.node.setAttribute('id', `${index+num}`)
      this.node.ondragstart = (e) => {
        this.dragStart(e)
        this.getCoords(e)
      }
      this.node.ondragend = (e) => { 
        this.dragEnd(e)
        this.returnToStart()
      };
    }

    dragStart(event) {
      event
        .dataTransfer
        .setData('text', this.node.id);
    }
    
  getCoords(e) {
      const old = {
        left: this.node.offsetLeft,
        top: this.node.offsetTop
      };
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
      
    }

    dragEnd(e) {
      this.node.style.left = e.pageX - this.offsetX + 'px'
      this.node.style.top = e.pageY - this.offsetY + 'px'
    }

    moveAt(e) {
      this.node.style.left = e.pageX - this.leftIndent + 'px'
      this.node.style.top = e.pageY - this.topIndent + 'px'
    } 

    public returnToStart() { 
      if(this.node.getBoundingClientRect().left <= this.limit!.left) {
        this.node.style.left = old.left
        this.node.style.top = old.top
        this.node.setAttribute('dissabled', 'true')
      }
      if(this.node.getBoundingClientRect().right >= this.limit!.right) {
        this.node.style.left = old.left
        this.node.style.top = old.top
        this.node.setAttribute('dissabled', 'true')
      }
    }
}