import supertest from 'supertest';
import app from './../index';


describe('Testing response to root route, invaild routes, bad requests and error handling', () => {
    test("GET /", async () => {
        await supertest(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe('Welcome To File Upload API!');
            })
        ;
    });

    test("GET /invalid", async () => {
        await supertest(app)
            .get('/invalid')
            .expect(404)
            .then((response) => {
                expect(response.body.message).toBe('Page Not Found!');
            })
        ;
    });
});