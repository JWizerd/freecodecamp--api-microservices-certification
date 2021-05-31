module.exports = {
  body: {
    url: "http://google.com"
  },
  app: {
    locals: {
        db: {
        insert: jest.fn(),
        find: jest.fn()
      }
    }
  }
}