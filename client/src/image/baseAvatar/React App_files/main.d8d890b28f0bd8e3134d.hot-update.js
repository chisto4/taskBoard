webpackHotUpdate("main",{

/***/ "./src/pages/WorkSpace/OneBoard/OneBoard.tsx":
/*!***************************************************!*\
  !*** ./src/pages/WorkSpace/OneBoard/OneBoard.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../workSpace.module.scss */ "./src/pages/WorkSpace/workSpace.module.scss");
/* harmony import */ var _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icon_delete_red_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../icon/delete_red.png */ "./src/icon/delete_red.png");
/* harmony import */ var _image_baseAvatar_baseAvatar_jpeg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../image/baseAvatar/baseAvatar.jpeg */ "./src/image/baseAvatar/baseAvatar.jpeg");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_boardReducer_boardThunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store/boardReducer/boardThunk */ "./src/store/boardReducer/boardThunk.ts");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _api_const_const__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../api/const/const */ "./src/api/const/const.js");
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../store/reducers */ "./src/store/reducers.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../api */ "./src/api/index.ts");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/index.js");
/* harmony import */ var _UserList_UserList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../UserList/UserList */ "./src/pages/WorkSpace/UserList/UserList.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/chisto4/Documents/Projekt on Work/taskBoard/client/src/pages/WorkSpace/OneBoard/OneBoard.tsx",
    _s = __webpack_require__.$Refresh$.signature();















const OneBoard = ({
  index,
  boardItem
}) => {
  _s();

  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  let history = Object(react_router__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  const [titleBoardChange, setTitleBoardChange] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(boardItem.title);
  const userState = Object(_store_reducers__WEBPACK_IMPORTED_MODULE_8__["useAppSelector"])(state => state.user.user);
  const image = Object(_store_reducers__WEBPACK_IMPORTED_MODULE_8__["useAppSelector"])(state => state.user.user.Image);
  const urlAvatar = !image ? _image_baseAvatar_baseAvatar_jpeg__WEBPACK_IMPORTED_MODULE_3__["default"] : _api__WEBPACK_IMPORTED_MODULE_9__["baseURL"] + '/' + (image === null || image === void 0 ? void 0 : image.pathImages); //@ts-ignore

  const trueDateFormat = Object(date_fns__WEBPACK_IMPORTED_MODULE_10__["format"])(new Date(boardItem.updatedAt), 'MM/dd/yyyy');

  const boardUpdate = event => {
    var _userState$Image;

    console.log("BOARDID", boardItem.id);
    const board = {
      title: titleBoardChange,
      id: boardItem.id,
      userId: boardItem.userId,
      userLogin: userState.login,
      userPathImage: (_userState$Image = userState.Image) === null || _userState$Image === void 0 ? void 0 : _userState$Image.pathImages
    };
    dispatch(Object(_store_boardReducer_boardThunk__WEBPACK_IMPORTED_MODULE_5__["updateBoard"])(board));
    event.preventDefault();
  };

  const deleteOneBoard = id => {
    var _userState$Image2;

    const board = {
      id: boardItem.id,
      title: boardItem.title,
      userId: boardItem.userId,
      userLogin: userState.login,
      userPathImage: (_userState$Image2 = userState.Image) === null || _userState$Image2 === void 0 ? void 0 : _userState$Image2.pathImages
    };
    dispatch(Object(_store_boardReducer_boardThunk__WEBPACK_IMPORTED_MODULE_5__["deleteBoard"])(board));
  };

  const getAllColumnsClick = id => {
    const column = {
      id,
      Tasks: [],
      position: 0
    };
    dispatch(Object(_store_boardReducer_boardThunk__WEBPACK_IMPORTED_MODULE_5__["getAllColumns"])(column));
    history.push(_api_const_const__WEBPACK_IMPORTED_MODULE_7__["BOARD_WINDOW"].replace(':id', `${column === null || column === void 0 ? void 0 : column.id}`));
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
    className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.board,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
      className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.close_button_wrapper,
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("button", {
        className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.close_button,
        onClick: () => deleteOneBoard(boardItem.id),
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("img", {
          src: _icon_delete_red_png__WEBPACK_IMPORTED_MODULE_2__["default"],
          className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.close_button_img,
          alt: "delete"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 9
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
      className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.one_board_wrapper,
      onClick: () => getAllColumnsClick(boardItem.id)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
      className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.board_title_input_wrapper,
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("form", {
        onSubmit: boardUpdate,
        className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.board_title_input_form,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("input", {
          className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.border_update_input,
          onChange: e => setTitleBoardChange(e.target.value),
          name: "boardChange",
          required: true // value={titleBoard}
          ,
          value: titleBoardChange // defaultValue={board.title}
          ,
          type: "text",
          placeholder: "New board"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
      className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.user_info_mini_wrapper,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
        className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.user_info_left_wrapper,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("h5", {
          children: trueDateFormat
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 9
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 7
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
        className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.user_info_right_wrapper,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
          className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.user_wrapper,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("div", {
            className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.user_avatar_mini,
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("img", {
              src: urlAvatar,
              className: _workSpace_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.circle_avatar,
              alt: "User Avatar"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 110,
              columnNumber: 13
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 11
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxDEV"])("h6", {
            children: boardItem.userLogin
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 112,
            columnNumber: 11
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 9
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 7
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 5
    }, undefined),  false && /*#__PURE__*/false]
  }, index, true, {
    fileName: _jsxFileName,
    lineNumber: 75,
    columnNumber: 5
  }, undefined);
};

_s(OneBoard, "MsRBUYajMgFvZdjDWL9Ap6XNesE=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"], react_router__WEBPACK_IMPORTED_MODULE_6__["useHistory"], _store_reducers__WEBPACK_IMPORTED_MODULE_8__["useAppSelector"], _store_reducers__WEBPACK_IMPORTED_MODULE_8__["useAppSelector"]];
});

_c = OneBoard;
/* harmony default export */ __webpack_exports__["default"] = (OneBoard);

var _c;

__webpack_require__.$Refresh$.register(_c, "OneBoard");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.d8d890b28f0bd8e3134d.hot-update.js.map