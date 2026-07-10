module.exports = function handler(req, res) {
  return res.status(200).json({
    success: true,
    service: 'kmu-lead-backend'
  });
};
