const { sendUserData } = require('../Controller/TestingController');

describe('sendUserData controller', () => {
  let req, res;

  beforeEach(() => {
    req = { a: 0, b: 0 }; // mock request object
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test('should return 200 and message "Working" when a + b > 1', () => {
    req.a = 2;
    req.b = 2;

    sendUserData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'Working' });
  });

  test('should return 400 and message "not Working" when a + b <= 1', () => {
    req.a = 1000;
    req.b = -100;

    sendUserData(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'not Working' });
  });
});
