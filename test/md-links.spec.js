const { mdLinks } = require('../src/index.js');

// global.fetch = jest.fn();
// beforeEach(() => {
//   fetch.mockImplementationOnce(() => Promise.resolve({ status: 200, statusText: 'OK' }))
//   fetch.mockImplementationOnce(() => Promise.resolve({ status: 404, statusText: 'FAIL' }))
// });


describe('function returns information about HTTP request', () => {
  it('returns a Promise', () => {
    const mdResult =  mdLinks('src\\assets\\Pruebas\\inicial.md', { validate: true})
    expect(mdResult).toBeInstanceOf(Promise);
  });
 

//   it('fetchRequestStatus returns an array of objects with status and statusText properties', () => {
//     return fetchRequestStatus(matrixLinks)
//       .then(result => {
//         expect(Array.isArray(result)).toBe(true);
//         expect(result.length).toBe(matrixLinks.length);
//         result.forEach((obj) => {
//           expect(obj.hasOwnProperty('status')).toBe(true);
//           expect(obj.hasOwnProperty('statusText')).toBe(true);
//         })
//       })
//   });

//   it('fetchRequestStatus sets status to FAIL for links with status code 400 or higher', () => {
//     return fetchRequestStatus(matrixLinks)
//       .then(result => {
//         result.forEach((obj) => {
//           if (obj.status >= 400) {
//             expect(obj.statusText).toBe('FAIL');
//           }
//         })
//       })
//   })
});

