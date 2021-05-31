module.exports = {
  body: {
    username: "jwizerd"
  },
  params: {
    _id: "abc123",
  },
  query: {
    limit: 10,
    from: "2021-05-31",
    to: "2021-05-31",
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