export class User{
    private id : number;
    public username : string;
    public password : string;
    public name : string;
    public role : string;
    public designation : string;
    public mobileNo : string;
    public status : string;
    public locationCode : string;
    public locationName : string;
    public locationShortName: string;
    public officeType : string;
    public generator : string;
    private sessionId : number;
    public zone : any;

    setId(id : number){
      this.id = id;
    }

    getId() : number{
      return this.id;
    }

    setUsername(username : string){
        this.username = username;
    }

    getUsername() : string{
        return this.username
    }

    setPassword(password : string){
        this.password = password;
    }

    getPassword() : string {
        return this.password;
    }

    setName(name : string){
      this.name = name;
    }

    getName():string{
      return this.name;
    }

    setRole(role : string){
      this.role = role;
    }

    getRole() : string{
      return this.role;
    }

    setDesignation(designation : string){
      this.designation = designation;
    }

    getDesignation() : string{
      return this.designation;
    }

    setLocationCode(locationCode : string){
      this.locationCode = locationCode;
    }

    getLocationCode() : string{
      return this.locationCode;
    }

    setLocationName(locationName:string){
      this.locationName = locationName;
    }

    getLocationName():string{
      return this.locationName;
    }

    setLocationShortName(locationShortName: string){
      this.locationShortName =locationShortName;
    }

    getLocationShortName():string{
      return this.locationShortName;
    }

    setOfficeType(officeType :string){
      this.officeType = officeType;
    }

    getOfficeType():string{
      return this.officeType;
    }

    setMobileNo(mobileNo : string){
      this.mobileNo = mobileNo;
    }

    getMobileNo() : string{
      return this.mobileNo;
    }

    setStatus(status : string){
      this.status = status;
    }

    getStatus() : string{
      return this.status;
    }

    setSessionId(sessionId : number) : void{
      this.sessionId = sessionId;
    }

    getSessionId() : number{
      return this.sessionId;
    }
    
    setZone(zone : any) : void {
      this.zone = zone;
    }

    getZone() : any {
      return this.zone;
    }
    
    setGenerator(generator : any) : void {
      this.generator = generator;
    }

    getGenerator() : any {
      return this.generator;
    }

    constructor(json : any){
      if(json != null){
        //console.log("constructing object from passed json string ");
        //console.log(json);
        this.setUsername(json.username);
        this.setPassword(json.password);
        // this.setRole(json.role);
        // this.setName(json.name);
        // this.setDesignation(json.designation);
        // this.setLocationCode(json.location_code);
      }
    }
}
