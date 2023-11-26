import axios, { AxiosInstance } from "axios";

export default class HttpClient {

    public http: AxiosInstance;

    constructor(private path: string) {
        this.http = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL + this.path })
    }
}
