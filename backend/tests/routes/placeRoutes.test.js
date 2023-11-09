const request = require('supertest');
const server = require('../../server');

describe('User Routes', () => {
  let userId; // Assuming you will get this ID after creating a user

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/users')
      .send({
        first_name: 'Homer',
        last_name: 'Simpson',
        age: 30,
        phone_number: '0688551136',
        address: '123 Main St'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    userId = res.body._id;
  });

  it('should get a user by ID', async () => {
    const res = await request(server).get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', userId);
  });

  it('should update a user by ID', async () => {
    const res = await request(server)
      .put(`/users/${userId}`)
      .send({
        first_name: 'Moe',
        last_name: 'Szyslak'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', userId);
    expect(res.body).toHaveProperty('first_name', 'Moe');
    expect(res.body).toHaveProperty('last_name', 'Szyslak');
  });

  it('should delete a user by ID', async () => {
    const res = await request(server).delete(`/users/${userId}`);

    expect(res.statusCode).toBe(204);
  });

  it('should return 404 when trying to get a non-existent user', async () => {
    const res = await request(server).get('/users/nonexistent_id');

    expect(res.statusCode).toBe(404);
  });
});