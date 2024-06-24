/**
 * @module Request
 * @author Udara Premadasa
 */
/**
 * @interface RequestOptions
 * @description 
 */
 export declare type RequestOptions = {
    body?: BodyInit | undefined;
    credentials?: RequestCredentials | undefined;
    headers?: HeadersInit | undefined;
    integrity?: string | undefined;
    keepalive?: boolean | undefined;
    mode?: RequestMode | undefined;
    referrer?: string | undefined;
    window?: any;
    signal?: AbortSignal | undefined;
}
declare interface RequestMethod {
    AddPostInterceptor(postInterceptor:PostInterceptor_):void;
    AddHeader(key:string, value:string) : RequestMethod;
    GET() : RequestExecute;
    POST(payload:any) : RequestExecute;
    POSTJson(payload:any) : RequestExecute;
    PUT(payload:any) : RequestExecute;
    PUTJson(payload:any) : RequestExecute;
    PATCH(payload:any) : RequestExecute;
    PATCHJson(payload:any) : RequestExecute;
    DELETE() : RequestExecute;
}
declare interface RequestPath {
    AddPostInterceptor(postInterceptor:PostInterceptor_):void;
    Path(path:string) : RequestMethod;
}
declare type PreInterceptor_ = (host: string, path: string, options:RequestInit) => Promise<RequestOptions>;
declare type PostInterceptor_ = (host: string, path: string, options:RequestInit, status: number, statusText: string, responseHeader:Headers, response: any) => void;
export class RequestError {
    status:number
    statusText:string;
    response:any
    constructor(status:number, statusText:string, response:any){
        this.status = status
        this.statusText = statusText
        this.response = response
    }
}
class RequestMethodImpl implements RequestMethod {
    private host:string
    private options:RequestInit
    private path:string
    private preInterceptors:PreInterceptor_[]
    private postInterceptors:PostInterceptor_[]
    constructor(host:string, options:RequestInit, path:string, preInterceptors:PreInterceptor_[], postInterceptors:PostInterceptor_[]) {
        this.host = host
        this.options = options
        this.options.method = "GET"
        this.path = path
        this.preInterceptors = preInterceptors
        this.postInterceptors = postInterceptors
    }
    private addHeader(key:string, value:string) {
        let headers = new Headers(this.options.headers)
        headers.append(key, value)
        this.options.headers = headers    
    }
    public AddPostInterceptor(postInterceptor:PostInterceptor_):RequestMethodImpl {
        this.postInterceptors.push(postInterceptor)
        return this
    }
    public AddHeader(key:string, value:string) : any {
        this.addHeader(key, value)
        return this
    }
    public GET():RequestExecute {
        this.options.method = "GET"
        return new RequestExecute(this.host, "GET", this.options, this.path, undefined, this.preInterceptors, this.postInterceptors)
    }
    public POST(payload:any):RequestExecute {
        this.options.method = "POST"
        return new RequestExecute(this.host, "POST", this.options, this.path, payload, this.preInterceptors, this.postInterceptors)
    }
    public POSTJson(payload:any):RequestExecute {
        this.options.method = "POST"
        this.addHeader("Content-Type", "application/json")
        return new RequestExecute(this.host, "POST", this.options, this.path, JSON.stringify(payload), this.preInterceptors, this.postInterceptors)
    }
    public PUT(payload:any):RequestExecute {
        this.options.method = "PUT"
        return new RequestExecute(this.host, "PUT", this.options, this.path, payload, this.preInterceptors, this.postInterceptors)
    }
    public PUTJson(payload:any):RequestExecute {
        this.options.method = "PUT"
        this.addHeader("Content-Type", "application/json")
        return new RequestExecute(this.host, "PUT", this.options, this.path,  JSON.stringify(payload), this.preInterceptors, this.postInterceptors)
    }
    public PATCH(payload:any):RequestExecute {
        this.options.method = "PATCH"
        return new RequestExecute(this.host, "PATCH", this.options, this.path, payload, this.preInterceptors, this.postInterceptors)
    }
    public PATCHJson(payload:any):RequestExecute {
        this.options.method = "PATCH"
        this.addHeader("Content-Type", "application/json")
        return new RequestExecute(this.host, "PATCH", this.options, this.path, JSON.stringify(payload), this.preInterceptors, this.postInterceptors)
    }
    public DELETE():RequestExecute {
        this.options.method = "DELETE"
        return new RequestExecute(this.host, "DELETE", this.options, this.path, undefined, this.preInterceptors, this.postInterceptors)
    }
}
class RequestExecute {
    private host:string
    private method:string
    private payload:any
    private options:RequestInit
    private path:string
    private preInterceptors:PreInterceptor_[]
    private postInterceptors:PostInterceptor_[]
    constructor(host:string, method:string, options:RequestInit, path:string, payload:any, preInterceptors:PreInterceptor_[], postInterceptors:PostInterceptor_[]) {
        this.host = host
        this.method = method
        this.options = options
        this.path = path
        this.payload = payload
        this.preInterceptors = preInterceptors
        this.postInterceptors = postInterceptors
    }
    private async executePreInterceptors() : Promise<RequestInit> {
        let options:RequestInit = this.options
        for (let preInterceptor of this.preInterceptors) {
            options = await preInterceptor(this.host, this.path, options)
        }
        return options
    }
    private executePostInterceptors(status: number, statusText: string, responseHeader:Headers, response: any) {
        for (let postInterceptor of this.postInterceptors) {
            postInterceptor(this.host, this.path, this.options, status, statusText,responseHeader, response)
        }
    }
    public AddPostInterceptor(postInterceptor:PostInterceptor_):RequestExecute{
        this.postInterceptors.push(postInterceptor)
        return this
    }
    public async ExecuteText():Promise<any> {
        let responseBody : any
        try {
            this.options = await this.executePreInterceptors() 
        } catch (error:any) {
            throw new RequestError(401, "Unauthorized",  error.message);
        }
        this.options.method = this.method
        this.options.body = this.payload
        let response = await fetch(`${this.host}${this.path}`, this.options)
        if (!response.ok) {
            let contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseBody = await response.json()
            } else {
                responseBody = await response.text()
            }
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            throw new RequestError(response.status, response.statusText, responseBody);
        } else {
            responseBody = await response.text()
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            return responseBody
        }
    }
    public async ExecuteJson():Promise<any> {
        let responseBody : any
        try {
            this.options = await this.executePreInterceptors() 
        } catch (error:any) {
            throw new RequestError(0, "INTERCEPTOR_TERMINATED", {code: 0, message: error.message});
        }
        this.options.method = this.method
        this.options.body = this.payload
        let response = await fetch(`${this.host}${this.path}`, this.options)
        if (!response.ok) {
            let contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseBody = await response.json()
            } else {
                responseBody = await response.text()
            }
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            throw new RequestError(response.status, response.statusText, responseBody);
        } else {
            responseBody = await response.json()
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            return responseBody
        }
    }
    public async ExecuteBlob():Promise<any> {
        let responseBody : any
        try {
            this.options = await this.executePreInterceptors() 
        } catch (error:any) {
            throw new RequestError(0, "INTERCEPTOR_TERMINATED",  error.message);
        }
        this.options.method = this.method
        this.options.body = this.payload
        let response = await fetch(`${this.host}${this.path}`, this.options)
        if (!response.ok) {
            let contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseBody = await response.json()
            } else {
                responseBody = await response.text()
            }
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            throw new RequestError(response.status, response.statusText, responseBody);
        } else {
            responseBody = await response.blob()
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            return responseBody
        }
    }
    public async Execute():Promise<any> {
        let responseBody : any
        try {
            this.options = await this.executePreInterceptors() 
        } catch (error:any) {
            throw new RequestError(0, "INTERCEPTOR_TERMINATED",  error.message);
        }
        this.options.method = this.method
        this.options.body = this.payload
        let response = await fetch(`${this.host}${this.path}`, this.options)
        if (!response.ok) {
            let contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseBody = await response.json()
            } else {
                responseBody = await response.text()
            }
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            throw new RequestError(response.status, response.statusText, responseBody);
        } else {
            responseBody = response.clone()
            this.executePostInterceptors(response.status, response.statusText, response.headers, responseBody)
            return responseBody
        }
    }
}
export class Request {
    private host:string
    private options:RequestInit
    private preInterceptors:PreInterceptor_[] = []
    private postInterceptors:PostInterceptor_[] = []
    constructor(host:string, options:RequestInit) {
        this.host = host
        this.options = options
        this.options.method = "GET"
    }
    public Header(header:any) : RequestPath {
        this.options.headers = new Headers(header)
        return new (class RequestPath{
            private host:string
            private options:RequestInit
            private path:string = ""
            private preInterceptors:PreInterceptor_[]
            private postInterceptors:PostInterceptor_[]
            constructor(host:string, options:RequestInit, preInterceptors:PreInterceptor_[], postInterceptors:PostInterceptor_[]) {
                this.host = host
                this.options = options
                this.options.method = "GET"
                this.preInterceptors = preInterceptors
                this.postInterceptors = postInterceptors
            }
            public Path(path:string) : RequestMethod {
                this.path = path
                return new RequestMethodImpl(this.host, this.options, this.path, this.preInterceptors, this.postInterceptors);
            }
            public AddPostInterceptor(postInterceptor:PostInterceptor_) {
                this.postInterceptors.push(postInterceptor)
            }
        })(this.host, this.options, this.preInterceptors, this.postInterceptors);
    }
    public Path(path:string) : RequestMethod {
        this.options.method = "GET"
        return new RequestMethodImpl(this.host, this.options, path, this.preInterceptors, this.postInterceptors);
    }
    public AddPreInterceptor(preInterceptor:PreInterceptor_): Request {
        this.preInterceptors.push(preInterceptor)
        return this
    }
    public AddPostInterceptor(postInterceptor:PostInterceptor_): Request {
        this.postInterceptors.push(postInterceptor)
        return this
    }
}