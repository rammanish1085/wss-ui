export class IssueMaster{
   
    public username : string;
    public locationCode : string;
    public locationName : string;
    

    setUsername(username : string){
        this.username = username;
    }

    getUsername() : string{
        return this.username
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
  

}