import supertest from 'supertest';
import app from './../index';
import path from 'path';


describe('User Routes', () => {
    let token: any;

    test("POST /api/v1/users/create", async () => {
        await supertest(app)
            .post('/api/v1/users/create')
            .send({
                email: "ezesinachijim@gmail.com",
                password: "Jesusboi44%",
                fullName: "Jim Ezesinachi",
            })
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("User Created Successfully!");
            });
        ;
    });

    test("POST /api/v1/users/login", async () => {
        await supertest(app)
            .post('/api/v1/users/login')
            .send({ email: "ezesinachijim@gmail.com", password: "Jesusboi44%" })
            .expect(200)
            .then((response) => {
                token = response.body.token;
                expect(response.body.message).toBe('User Logged In Successfully!');
                expect(response.body.token).toBeTruthy();
            });
        ;
    });

    test("POST /api/v1/posts/upload", async () => {
        await supertest(app)
            .post('/api/v1/posts/upload')
            .attach('file', path.resolve(__dirname, './file/Jim.jpg'))
            .field({
                title: "My Upload",
            })
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("Post Created Successfully!");
            });
        ;
    });

    test("POST /api/v1/posts/download", async () => {
        await supertest(app)
            .post('/api/v1/posts/download')
            .send({
                fileId: "1",
            })
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("Here's Your File: ");
            });
        ;
    });

    test("POST /api/v1/folders/create", async () => {
        await supertest(app)
            .post('/api/v1/folders/create')
            .send({
                name: "Uploads", 
            })
            .set('Authorization', token)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("Folder Created Successfully!");
            });
        ;
    });
});