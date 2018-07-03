
describe('Example test suite', () => {
  test('Test 1', (done) => {
    done();
  });

  test('Test 2', (done) => {
    done();
  });

  test('Test 3', () => {
    expect(1 + 2).toBe(3);

  });

  test('Test 4', done => done()
  );

  test('Test 5', (done) => {
    done();
  });
});