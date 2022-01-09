export enum Edit {
  None = 0,
  Hour = 1,
  Minute = 2
}

export class Clock {

  deltaHours: number;
  deltaMinutes: number;
  mode: number; // 3 modes: editable hour, editable minute or non-editable

  constructor(){
    this.deltaHours = 0;
    this.deltaMinutes = 0;
    this.mode = 0;
  }

  // get current mode
  public getMode(): number{
    return this.mode;
  }

  public getHours(): string{
    const date: Date = new Date();
    date.setHours(date.getHours() + this.deltaHours);
    return this.formatTime(date.getHours());
  }

  public getMinutes(): string{
    const date: Date = new Date();
    date.setMinutes(date.getMinutes() + this.deltaMinutes);
    return this.formatTime(date.getMinutes());
  }

  public getSeconds(): string{
    const date: Date = new Date();
    return this.formatTime(date.getSeconds());
  }

  // format to 2 digit number
  private formatTime(time: number): string{
    if ( time < 10 ) {
      return '0' + time;
    }
    return '' + time;
  }

  // change mode
  public nextMode(): void{
    this.mode++;
    this.mode %= 3; // only 3 modes
  }

  // add hour or minute when time is editable
  public increaseTime(): void{
    if(this.mode === Edit.Hour){
      this.deltaHours += 1;
      this.deltaHours %= 24; // 1day = 24h
    }
    else if(this.mode === Edit.Minute){
      this.deltaMinutes += 1;
      this.deltaMinutes %= 60; // 1h = 60min
    }
  }
}
