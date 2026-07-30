import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
}

export default new UserService();