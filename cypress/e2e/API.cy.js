import responce from "../e2e/backEndPages/validations"

const ApiResponce = new responce()

describe('Backend testing', () => {
    it('Verify the Get request', () => {
        cy.request({
            method: "Get",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                connection: "keep-alive"
            }
        }).then((res) => {
            ApiResponce.validateRequestStatusCode(res.status, 200)
            ApiResponce.validateRequestDuration(res.duration, 400)
            expect(res.body).to.have.property('page')
            ApiResponce.validateRequestHeaders(res.headers['content-encoding'], 'gzip')
        })
    })
    it('Verify the POST request', () => {
        cy.fixture('backendData.json').then((data) => {
            let requestData = data.PostRequestBody

            cy.request({
                method: "POST",
                url: "https://reqres.in/api/users",
                body: requestData
            }).then((res) => {
                ApiResponce.validateRequestStatusCode(res.status, 201)
                ApiResponce.validateRequestDuration(res.duration, 1000)
            })
        })
    })
    it('Verify PUT request', () => {

        cy.fixture('backendData.json').then((data) => {
            let RequestBody = data.PutRequestBody

            cy.request({
                method: "PUT",
                url: "https://reqres.in/api/users/2",
                body: RequestBody
            }).then((res) => {

                ApiResponce.validateRequestStatusCode(res.status, 200)
                expect(res.body).to.have.deep.property('updatedAt')
                ApiResponce.validateRequestDuration(res.duration, 1000)
            })
        })
    })
    it('Verify DELETE request', () => {
        cy.request({
            method: "DELETE",
            url: "https://reqres.in/api/users/2",
            headers: {
                connection: "keep-alive"
            }
        }).then((res) => {
            ApiResponce.validateRequestDuration(res.duration, 1000)
            ApiResponce.validateRequestStatusCode(res.status, 204)
            ApiResponce.validateRequestHeaders(res.headers['server'], 'cloudflare')
        })
    })
    it('Verify the PATCH request', () => {
        let updateEmail = `sunil${Math.random() * 1000}@gmail.com`
        let id = ""
        
        cy.fixture('backendData.json').then((data) => {
            let reqHeaders = data.PatchRequestHeader

            cy.request({
                method: 'GET',
                url: "https://gorest.co.in/public/v2/users",
                headers: reqHeaders
            }).then((res) => {
                ApiResponce.validateRequestStatusCode(res.status, 200)
                id = res.body[0].id
            }).then(() => {
                cy.request({
                    method: 'PATCH',
                    url: `https://gorest.co.in/public/v2/users/${id}`,
                    headers: reqHeaders,
                    body: {
                        "name": "Allasani Peddana",
                        "email": updateEmail,
                        "status": "active"
                    }
                }).then(() => {
                    cy.request({
                        method: 'GET',
                        url: `https://gorest.co.in/public/v2/users/${id}`,
                        headers: reqHeaders
                    }).then((res) => {
                        ApiResponce.validateRequestStatusCode(res.status, 200)
                        expect(res.body.email).to.eq(updateEmail)
                    })
                })
            })
        })

    })
})