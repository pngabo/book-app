"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _BookController = _interopRequireDefault(require("../controllers/BookController"));

var router = (0, _express.Router)();
router.get('/api/v1/books', _BookController["default"].getAllBooks);
router.post('/api/v1/books', _BookController["default"].addBook);
router.get('/api/v1/books/:id', _BookController["default"].getABook);
router.put('/api/v1/books/:id', _BookController["default"].updatedBook);
router["delete"]('/api/v1/books/:id', _BookController["default"].deleteBook);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=router.js.map