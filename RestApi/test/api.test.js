let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp)

describe('Testing Rest API', () => {
    it('should test / endpoint',(done) => {
        chai
            .request('http://localhost:8700')
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
    it('should test /user endpoint',(done) => {
        chai
            .request('http://localhost:8700')
            .get('/user')
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
    it('should test post endpoint',(done) => {
        chai
            .request('http://localhost:8700')
            .post('/addUser')
            .send({"_id":3, "name":"Ankit", "class":"React","phone":897878})
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
});

