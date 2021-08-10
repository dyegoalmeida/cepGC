export class Cep {

  public Id: number;
  public cep: string;
  public city:string;
  public user:number;

  constructor(Id:number,cep: string,city:string,user:number) {
    this.Id = Id;
    this.cep = cep;
    this.city = city;
    this.user = user;
  }

}
