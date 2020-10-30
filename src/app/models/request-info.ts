export class RequestInfo {

    public tokenNumber: string;

    public username: string;

    public name: string;

    public requestedUsername: string;

    public requestedName: string;

    public responseMessage: string;

    public requestMessage: string;

    setTokenNumber(tokenNumber: string) {
        this.tokenNumber = tokenNumber;
    }
    getTokenNumber(): string {
        return this.tokenNumber;
    }

    setUsername(username: string) {
        this.username = username;
    }
    getUsername(): string {
        return this.username;
    }

    setName(name: string) {
        this.name = name;
    }
    getName(): string {
        return this.name;
    }
    setRequestedUsername(requestUsername: string) {
        this.requestedUsername = requestUsername;
    }
    getRequestedUsername(): string {
        return this.requestedUsername;
    }

    setRequestedName(requestName: string) {
        this.requestedName = requestName;
    }
    getRequestedName(): string {
        return this.requestedName;
    }

    setResponseMessage(reponseMessage: string) {
        this.responseMessage = reponseMessage;
    }

    getResponseMessage(): string {
        return this.responseMessage;
    }

    setRequestMessage(requestMessage: string) {
        this.requestMessage = requestMessage;
    }

    getRequestMessage(): string {
        return this.requestMessage;
    }

}

