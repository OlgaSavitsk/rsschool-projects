import { IToysModel } from "../models/toys-model"

 export class FilterController {
    static _hide: IToysModel[] | undefined;
    static _params: string[];
    static _filter: any;
    static toys: IToysModel[][] = [];
    static removeToys: IToysModel[][] = [];
    static filteredArr: IToysModel[][] = []

    static get hide (){
      return this._hide;
    }
  
    static set hide (value){
      this._hide = value;
    }

    static get params (){
      return this._params;
    }
  
    static set params (value){
      this._params = value;
    }

    static get filters (){
      return this._filter;
    }
  
    static set filters (value){
      this._filter = value;
    }

      constructor() {
        //FilterController.filter()
      }
    
     static add(value: IToysModel[]) {
        this.toys.push(value)   
      }

      static getData() {
        console.log('toys1', this.toys)
          return this.filteredArr
      }

    static filter(value) {
      this.toys.push(value)
        console.log('вход', this.toys.flat())
        
        let val = this.toys.flat().filter((item, index) => {
            for(let i = index + 1; i < this.toys.flat().length; i++ ){ 
              if(this.toys.flat()[i].num === item.num) {  
                console.log( `${index} is a duplicate of ${i}` );  
               return true; 
              }
            }
            return false;   
          });
          console.log('toys2', val)
         
        /*  
         if(val.length !== 0) {
          this.filteredArr.flat().map(item => {
            let toy = val.flat().filter(i => i.num === item.num)
            console.log('val3', toy)
            this.filteredArr = Array.from([toy])
          })
        } */
          if(val.length === 0) {
            this.filteredArr = this.toys.slice()
          }
          else {
            this.filteredArr = Array.from([val])
          }

          console.log('toys4', this.filteredArr)
          return this.filteredArr
      }

     static remove() {
        console.log('hide', FilterController.hide)
        for(let i of FilterController.hide!) { 
            console.log('removetoys', this.toys.flat())
            let val = this.toys!.flat().filter((item => item.num !== i.num)) 
            this.toys = []
            this.toys.push(val)
          }
          console.log('valueAfterRemove', this.toys) 
          return this.toys
    }

      emit(param: IToysModel) {
       // this.toys.forEach((toy) => toy.param);
      }
  }