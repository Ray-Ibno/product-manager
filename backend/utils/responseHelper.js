/**
 * @param {import('http').ServerResponse} res
 * @param {number} statusCode
 * @param {Object} data
 * @param {string} message
 */

export const responseHelper = (res, statusCode, data, message = null) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  })
}
