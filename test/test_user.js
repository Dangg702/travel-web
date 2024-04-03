const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../src/index');
const User = require('../src/models/User');
const serverAddress = 'http://localhost:9000';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Register API', () => {
    before(async () => {
        // Clear the User collection before the tests start
        await User.deleteMany({});
    });

    after((done) => {
        // Close the server connection after all tests are finished
        server.close(() => {
            done();
        });
    });

    it('should register a new user', (done) => {
        chai.request(app)
            .post('/user/register')
            .send({ email: 'test@example.com', username: 'test', password: 'password' })
            .redirects(1) // Allow one redirect
            .end((err, res) => {
                res.should.have.status(200); // Check for a successful status code
                res.redirects.should.have.lengthOf(1); // Check that there was one redirect
                console.log('Actual redirect URL:', res.redirects[0]); // Successful redirect index URL
                const redirectUrl = new URL(res.redirects[0]);
                const expectedPath = '/';
                redirectUrl.pathname.should.equal(expectedPath);
                done();
            });
    });

    it('should redirect to login if email is already registered', (done) => {
        const existingUser = new User({
            email: 'existing@example.com',
            username: 'existinguser',
            password: 'existingpassword',
        });

        existingUser
            .save()
            .then(() => {
                const userData = {
                    email: 'existing@example.com',
                    username: 'existinguser',
                    password: 'existingpassword',
                };

                chai.request(app)
                    .post('/user/register')
                    .send(userData)
                    .redirects(1) // Allow one redirect
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.redirects.should.have.lengthOf(1); // Check that there was one redirect
                        console.log('Actual redirect URL:', res.redirects[0]);
                        const redirectUrl = new URL(res.redirects[0]);
                        const expectedPath = '/user/login';
                        redirectUrl.pathname.should.equal(expectedPath);
                        done();
                    });
            })
            .catch((error) => {
                done(error);
            });
    });
});

describe('Login API', () => {
    it('should return "Login successfully" and set cookies when valid credentials are provided', (done) => {
        chai.request(app)
            .post('/user/login')
            .send({ email: 'test@example.com', password: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('Login successfully');
                expect(res).to.have.cookie('access_token');
                expect(res).to.have.cookie('refresh_token');
                done();
            });
    });

    it('should return "Wrong password" when invalid password is provided', (done) => {
        chai.request(app)
            .post('/user/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('Wrong password');
                done();
            });
    });

    it('should return "User does not exist" when invalid email is provided', (done) => {
        chai.request(app)
            .post('/user/login')
            .send({ email: 'invalid@example.com', password: 'password123' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('User does not exist');
                done();
            });
    });
});
