import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://boonelist-client.herokuapp.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class BoonelistApi {
// the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BoonelistApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
        return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
        console.error("API Error:", err.response);
        console.log(data)
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
        }
        }

    /** Individual API routes -->
     */

        // Get current user

        static async getCurrentUser(username) {
            let res = await this.request(`users/${username}`);
            return res.user;
        }

        // Signup with user data input

        static async signup(data) {
            let res = await this.request(`auth/register`, data, "post");
            return res.token
        }

        // log user in and assign token

        static async login(data) {
            let res = await this.request(`auth/token`, data, "post");
            return res.token;
        }

        // Update user profile from form data

        static async saveProfile(username, data) {
            let res = await this.request(`users/${username}`, data, "patch");
            return res.user;
        }

        // Get list of services, filter by title if search used

        static async getServices(title){
            let res = await this.request(`services`, { title })
            return res.services
        }

        // Get single service by id
        
        static async getService(id){
            let res = await this.request(`services/${id}`);
            return res.service
        }

        // Create new service with data and save to backend

        static async createService(data, username){

            let res = await this.request(`services/new`, {...data, postedBy: username}, "post");
            return res.service
        }

        // Create new sale with data and save to backend

        static async createSale(data, username){
 
            let res = await this.request(`sales/new`, {...data, postedBy: username}, "post");
            return res.sale
        }

        static async getSales(itemName){
            let res = await this.request(`sales`, { itemName })
            return res.sales
        }

        // Get single sale by id

        static async getSale(id){
            let res = await this.request(`sales/${id}`);
            return res.sale
        }

        // Create a comment for sale or service

        static async createComment(data, subjectId, route){
            let res = await this.request(`${route}/${subjectId}`, {...data}, "post");
            return res.comment
        }

        // Get comments of by sale_id or service_id

        static async getComments(id, route){
            let res = await this.request(`${route}/${id}`);
            return res.comments
        }

        // Deletes a post by id and route specification

        static async remove(id, route){
            let res = await this.request(`${route}/${id}`, {}, "delete")
            return res.sale
        }

        // Deletes comment by id and route specification

        static async removeComment(route, id, commentId){
            let res = await this.request(`${route}/${id}/${commentId}`, {}, "delete")
            return res.comment
        }

}

// BoonelistApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyMjcyNTg0Mn0.nJsOKBaufn81VX7rL70oev_KemBmKE5sSwk6S3Ax_wk"

export default BoonelistApi