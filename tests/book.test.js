import chai from 'chai';
import chatHttp from 'chai-http';
import app from '../src/app';

chai.use(chatHttp);
chai.should();
const { expect } = chai;


describe('Testing the book endpoints:', () => {
  it('Should return welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Welcome to Book app');
        done();
      });
  });
  it('It should create a book', (done) => {
    const book = {
      title: 'First Awesome book',
      price: 1000,
      description: 'This is the awesome book'
    };
    chai.request(app)
      .post('/api/v1/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('It should not create a book with incomplete parameters', (done) => {
    const book = {
      price: 1000,
      description: 'This is the awesome book'
    };
    chai
      .request(app)
      .post('/api/v1/books')
      .set('Accept', 'application/json')
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all books', (done) => {
    chai
      .request(app)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('It should get a particular book', (done) => {
    const bookId = 1;
    chai
      .request(app)
      .get(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('It should not get a particular book with invalid id', (done) => {
    const bookId = 8888;
    chai
      .request(app)
      .get(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Cannot find book with the id ${bookId}`);
        done();
      });
  });

  it('It should not get a particular book with non-numeric id', (done) => {
    const bookId = 'aaa';
    chai
      .request(app)
      .get(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a book', (done) => {
    const bookId = 1;
    const updatedBook = {
      id: bookId,
      title: 'Updated Awesome book',
      price: 1000,
      description: 'We have updated the price'
    };
    chai
      .request(app)
      .patch(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('It should not update a book with invalid id', (done) => {
    const bookId = '9999';
    const updatedBook = {
      id: bookId,
      title: 'Updated Awesome book again',
      price: 1000,
      description: 'We have updated the price'
    };
    chai
      .request(app)
      .patch(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql(`Cannot find book with the id: ${bookId}`);
        done();
      });
  });

  it('It should not update a book with non-numeric id value', (done) => {
    const bookId = 'ggg';
    const updatedBook = {
      id: bookId,
      title: 'Updated Awesome book again',
      price: 1000,
      description: 'We have updated the price'
    };
    chai
      .request(app)
      .patch(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should delete a book', (done) => {
    const bookId = 1;
    chai
      .request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('It shoulod return books not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('It should not delete a book with invalid id', (done) => {
    const bookId = 777;
    chai.request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message')
          .eql(`Book with the id ${bookId} cannot be found`);
        done();
      });
  });

  it('It should not delete a book with non-numeric id', (done) => {
    const bookId = 'bbb';
    chai
      .request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message')
          .eql('Please provide a numeric value');
        done();
      });
  });
});
