// __mocks__/firebase.js
const mockData = {}
const doc = jest.fn((id) => ({
 id,
 get: jest.fn(() => Promise.resolve({exists: !!mockData[id], data: () => mockData[id]})),
 set: jest.fn((d) => {
  mockData[id] = d
  return Promise.resolve()
 }),
 update: jest.fn((d) => {
  mockData[id] = {...mockData[id], ...d}
  return Promise.resolve()
 }),
 delete: jest.fn(() => {
  delete mockData[id]
  return Promise.resolve()
 })
}))

const collection = jest.fn(() => ({
 doc,
 where: jest.fn().mockReturnValue({get: jest.fn(() => Promise.resolve({empty: true, docs: []}))})
}))

module.exports = {db: {collection}}
