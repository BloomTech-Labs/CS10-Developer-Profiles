/**
 * @file Helper functions for sending HTTP responses
 */

const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const NOT_FOUND = '404';
const UNAUTHORIZED = '401';
const FORBIDDEN = '403';

/**
 * Sends an error HTTP response
 *
 * @param res {Object} HTTP response object.
 * @param err {(Object|String)} Error object or HTTP status code.
 * @param message {Object} Message to send on HTTP response object
 */
const sendErr = (res, err, message) => {
  switch (err.name || err) {
    case VALIDATION_ERROR:
      res.status(400);
      res.json({ error: err.message || message });
      return;
    case UNAUTHORIZED:
      res.status(401);
      res.json({ error: message });
      return;
    case FORBIDDEN:
      res.status(403);
      res.json({ error: message });
      return;
    case CAST_ERROR:
      res.status(404);
      res.json({ error: 'The document with the specified ID does not exist.' });
      return;
    case NOT_FOUND:
      res.status(404);
      res.json({ error: message });
      return;
    default:
      res.status(500);
      res.json({ error: message });
  }
};

/**
 * Sends an HTTP response
 *
 * @param res {Object} HTTP response object.
 * @param status {String} HTTP status code.
 * @param resData {Object} Data object to return on HTTP response object.
 */
const sendRes = (res, status, resData) => (resData
  ? res.status(status).json(resData)
  : res.status(404).json({ error: 'The document with the specified ID does not exist.' }));

module.exports = {
  sendErr,
  sendRes,
};
