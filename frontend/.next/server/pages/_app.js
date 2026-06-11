/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.jsx":
/*!****************************!*\
  !*** ./src/pages/_app.jsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store_appStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/appStore */ \"./src/store/appStore.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_appStore__WEBPACK_IMPORTED_MODULE_4__]);\n_store_appStore__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const getLinkClass = (path)=>router.pathname === path ? \"active\" : \"\";\n    const { isOffline, toggleOfflineMode, offlineRequests } = (0,_store_appStore__WEBPACK_IMPORTED_MODULE_4__.useAppStore)();\n    const [isMenuOpen, setIsMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);\n    // Author: Benadic - Ensure mobile menu closes on route change\n    (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(()=>{\n        const handleRouteChange = ()=>setIsMenuOpen(false);\n        router.events.on(\"routeChangeStart\", handleRouteChange);\n        return ()=>router.events.off(\"routeChangeStart\", handleRouteChange);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"RESCUE-MESH | Disaster Response Network\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                className: \"navbar\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"navbar-top\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                style: {\n                                    fontSize: \"15px\",\n                                    fontWeight: \"700\",\n                                    color: \"#e5534b\",\n                                    display: \"flex\",\n                                    alignItems: \"center\",\n                                    gap: \"6px\"\n                                },\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        style: {\n                                            display: \"inline-block\",\n                                            width: \"8px\",\n                                            height: \"8px\",\n                                            borderRadius: \"50%\",\n                                            backgroundColor: \"#e5534b\"\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                        lineNumber: 30,\n                                        columnNumber: 13\n                                    }, this),\n                                    \"RESCUE-MESH\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 29,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"mobile-menu-btn\",\n                                onClick: ()=>setIsMenuOpen(!isMenuOpen),\n                                \"aria-label\": \"Toggle menu\",\n                                children: isMenuOpen ? \"✕\" : \"☰\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 34,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                        lineNumber: 28,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: `nav-links ${isMenuOpen ? \"open\" : \"\"}`,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/\",\n                                className: getLinkClass(\"/\"),\n                                onClick: ()=>setIsMenuOpen(false),\n                                children: \"Submit SOS\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 44,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/status\",\n                                className: getLinkClass(\"/status\"),\n                                onClick: ()=>setIsMenuOpen(false),\n                                children: \"Check Status\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 45,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/dashboard\",\n                                className: getLinkClass(\"/dashboard\"),\n                                onClick: ()=>setIsMenuOpen(false),\n                                children: \"Dashboard\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 46,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/map\",\n                                className: getLinkClass(\"/map\"),\n                                onClick: ()=>setIsMenuOpen(false),\n                                children: \"Map View\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 47,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: `navbar-controls ${isMenuOpen ? \"open\" : \"\"}`,\n                        children: [\n                            isOffline && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                style: {\n                                    color: \"#e5534b\",\n                                    fontSize: \"12px\",\n                                    fontWeight: \"600\",\n                                    padding: \"4px 10px\",\n                                    background: \"rgba(229, 83, 75, 0.1)\",\n                                    borderRadius: \"4px\",\n                                    border: \"1px solid rgba(229, 83, 75, 0.3)\"\n                                },\n                                children: [\n                                    \"OFFLINE \\xb7 \",\n                                    offlineRequests.length,\n                                    \" pending\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: toggleOfflineMode,\n                                style: {\n                                    padding: \"6px 14px\",\n                                    background: isOffline ? \"#e5534b\" : \"#46954a\",\n                                    fontSize: \"11px\",\n                                    fontWeight: \"700\",\n                                    letterSpacing: \"0.5px\",\n                                    textTransform: \"uppercase\"\n                                },\n                                children: isOffline ? \"Sync Online\" : \"Go Offline\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                                lineNumber: 64,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"container\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                    lineNumber: 80,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\benad\\\\RESCUE-MESH\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                lineNumber: 79,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MEJBQ2QsNEVBQUNqQjtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7O0FBSWhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzY3VlLW1lc2gtZnJvbnRlbmQvLi9zcmMvcGFnZXMvX2FwcC5qc3g/NGM3NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IHsgdXNlQXBwU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9hcHBTdG9yZSc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IGdldExpbmtDbGFzcyA9IChwYXRoKSA9PiByb3V0ZXIucGF0aG5hbWUgPT09IHBhdGggPyAnYWN0aXZlJyA6ICcnO1xuICBjb25zdCB7IGlzT2ZmbGluZSwgdG9nZ2xlT2ZmbGluZU1vZGUsIG9mZmxpbmVSZXF1ZXN0cyB9ID0gdXNlQXBwU3RvcmUoKTtcbiAgY29uc3QgW2lzTWVudU9wZW4sIHNldElzTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEF1dGhvcjogQmVuYWRpYyAtIEVuc3VyZSBtb2JpbGUgbWVudSBjbG9zZXMgb24gcm91dGUgY2hhbmdlXG4gIHVzZVN0YXRlKCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVSb3V0ZUNoYW5nZSA9ICgpID0+IHNldElzTWVudU9wZW4oZmFsc2UpO1xuICAgIHJvdXRlci5ldmVudHMub24oJ3JvdXRlQ2hhbmdlU3RhcnQnLCBoYW5kbGVSb3V0ZUNoYW5nZSk7XG4gICAgcmV0dXJuICgpID0+IHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZVN0YXJ0JywgaGFuZGxlUm91dGVDaGFuZ2UpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIHsvKiBBdXRob3I6IEJlbmFkaWMgLSBTZXR0aW5nIHRoZSBtYWluIGFwcGxpY2F0aW9uIGhlYWQgcHJvcGVydGllcyAqL31cbiAgICAgICAgPHRpdGxlPlJFU0NVRS1NRVNIIHwgRGlzYXN0ZXIgUmVzcG9uc2UgTmV0d29yazwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci10b3BcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTVweCcsIGZvbnRXZWlnaHQ6ICc3MDAnLCBjb2xvcjogJyNlNTUzNGInLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHdpZHRoOiAnOHB4JywgaGVpZ2h0OiAnOHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZENvbG9yOiAnI2U1NTM0YicgfX0gLz5cbiAgICAgICAgICAgIFJFU0NVRS1NRVNIXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9iaWxlLW1lbnUtYnRuXCIgXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc01lbnVPcGVuKCFpc01lbnVPcGVuKX1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJUb2dnbGUgbWVudVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzTWVudU9wZW4gPyAn4pyVJyA6ICfimLAnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG5hdi1saW5rcyAke2lzTWVudU9wZW4gPyAnb3BlbicgOiAnJ31gfT5cbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiIGNsYXNzTmFtZT17Z2V0TGlua0NsYXNzKCcvJyl9IG9uQ2xpY2s9eygpID0+IHNldElzTWVudU9wZW4oZmFsc2UpfT5TdWJtaXQgU09TPC9MaW5rPlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvc3RhdHVzXCIgY2xhc3NOYW1lPXtnZXRMaW5rQ2xhc3MoJy9zdGF0dXMnKX0gb25DbGljaz17KCkgPT4gc2V0SXNNZW51T3BlbihmYWxzZSl9PkNoZWNrIFN0YXR1czwvTGluaz5cbiAgICAgICAgICA8TGluayBocmVmPVwiL2Rhc2hib2FyZFwiIGNsYXNzTmFtZT17Z2V0TGlua0NsYXNzKCcvZGFzaGJvYXJkJyl9IG9uQ2xpY2s9eygpID0+IHNldElzTWVudU9wZW4oZmFsc2UpfT5EYXNoYm9hcmQ8L0xpbms+XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9tYXBcIiBjbGFzc05hbWU9e2dldExpbmtDbGFzcygnL21hcCcpfSBvbkNsaWNrPXsoKSA9PiBzZXRJc01lbnVPcGVuKGZhbHNlKX0+TWFwIFZpZXc8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbmF2YmFyLWNvbnRyb2xzICR7aXNNZW51T3BlbiA/ICdvcGVuJyA6ICcnfWB9PlxuICAgICAgICAgIHtpc09mZmxpbmUgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcbiAgICAgICAgICAgICAgY29sb3I6ICcjZTU1MzRiJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc0cHggMTBweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDIyOSwgODMsIDc1LCAwLjEpJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjI5LCA4MywgNzUsIDAuMyknXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgT0ZGTElORSDCtyB7b2ZmbGluZVJlcXVlc3RzLmxlbmd0aH0gcGVuZGluZ1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlT2ZmbGluZU1vZGV9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDE0cHgnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc09mZmxpbmUgPyAnI2U1NTM0YicgOiAnIzQ2OTU0YScsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc3MDAnLFxuICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC41cHgnLFxuICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNPZmZsaW5lID8gJ1N5bmMgT25saW5lJyA6ICdHbyBPZmZsaW5lJ31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8L21haW4+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiTGluayIsInVzZVJvdXRlciIsInVzZUFwcFN0b3JlIiwiSGVhZCIsInVzZVN0YXRlIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwiZ2V0TGlua0NsYXNzIiwicGF0aCIsInBhdGhuYW1lIiwiaXNPZmZsaW5lIiwidG9nZ2xlT2ZmbGluZU1vZGUiLCJvZmZsaW5lUmVxdWVzdHMiLCJpc01lbnVPcGVuIiwic2V0SXNNZW51T3BlbiIsImhhbmRsZVJvdXRlQ2hhbmdlIiwiZXZlbnRzIiwib24iLCJvZmYiLCJ0aXRsZSIsIm5hdiIsImNsYXNzTmFtZSIsImRpdiIsInN0eWxlIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiY29sb3IiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImdhcCIsInNwYW4iLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlclJhZGl1cyIsImJhY2tncm91bmRDb2xvciIsImJ1dHRvbiIsIm9uQ2xpY2siLCJhcmlhLWxhYmVsIiwiaHJlZiIsInBhZGRpbmciLCJiYWNrZ3JvdW5kIiwiYm9yZGVyIiwibGVuZ3RoIiwibGV0dGVyU3BhY2luZyIsInRleHRUcmFuc2Zvcm0iLCJtYWluIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.jsx\n");

/***/ }),

/***/ "./src/store/appStore.js":
/*!*******************************!*\
  !*** ./src/store/appStore.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   indexeddbProvider: () => (/* binding */ indexeddbProvider),\n/* harmony export */   useAppStore: () => (/* binding */ useAppStore),\n/* harmony export */   wsProvider: () => (/* binding */ wsProvider),\n/* harmony export */   yRequestsMap: () => (/* binding */ yRequestsMap),\n/* harmony export */   ydoc: () => (/* binding */ ydoc)\n/* harmony export */ });\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ \"zustand\");\n/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yjs */ \"yjs\");\n/* harmony import */ var y_websocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! y-websocket */ \"y-websocket\");\n/* harmony import */ var y_indexeddb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! y-indexeddb */ \"y-indexeddb\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__, yjs__WEBPACK_IMPORTED_MODULE_1__, y_websocket__WEBPACK_IMPORTED_MODULE_2__, y_indexeddb__WEBPACK_IMPORTED_MODULE_3__]);\n([zustand__WEBPACK_IMPORTED_MODULE_0__, yjs__WEBPACK_IMPORTED_MODULE_1__, y_websocket__WEBPACK_IMPORTED_MODULE_2__, y_indexeddb__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// 1. Create the mathematical CRDT Document\nconst ydoc = new yjs__WEBPACK_IMPORTED_MODULE_1__.Doc();\n// 2. Persist it to the browser's offline storage (Client-side only)\nconst indexeddbProvider =  false ? 0 : null;\n// 3. Connect to the local Mesh Node (ESP8266 NodeMCU) / Backend WebSocket\nconst wsProvider =  false ? 0 : null;\n// 4. Create a shared Map for all SOS Requests\nconst yRequestsMap = ydoc.getMap(\"requests\");\nconst useAppStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((set, get)=>({\n        isOffline: false,\n        toggleOfflineMode: async ()=>{\n            const { isOffline } = get();\n            if (isOffline) {\n                set({\n                    isOffline: false\n                });\n                if (wsProvider) wsProvider.connect();\n                alert(\"Connected to Mesh Network. CRDTs will instantly sync and merge offline data.\");\n            } else {\n                set({\n                    isOffline: true\n                });\n                if (wsProvider) wsProvider.disconnect();\n                alert(\"Mesh Network Offline Mode Activated. Data is saved to CRDT and will merge when reconnected.\");\n            }\n        },\n        // No longer needed, Yjs handles it natively!\n        cacheOfflineRequest: (requestPayload)=>{\n            const id = \"req-\" + crypto.randomUUID();\n            yRequestsMap.set(id, {\n                ...requestPayload,\n                id,\n                status: \"pending\",\n                severityLabel: \"medium\"\n            });\n        }\n    }));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUvYXBwU3RvcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ1I7QUFDdUI7QUFDRztBQUVuRCwyQ0FBMkM7QUFDcEMsTUFBTUksT0FBTyxJQUFJSCxvQ0FBSyxHQUFHO0FBRWhDLG9FQUFvRTtBQUM3RCxNQUFNSyxvQkFBb0IsTUFBa0IsR0FBYyxDQUFnREYsR0FBRyxLQUFLO0FBRXpILDBFQUEwRTtBQUNuRSxNQUFNRyxhQUFhLE1BQWtCLEdBQWMsQ0FBc0VILEdBQUcsS0FBSztBQUV4SSw4Q0FBOEM7QUFDdkMsTUFBTUksZUFBZUosS0FBS0ssTUFBTSxDQUFDLFlBQVk7QUFFN0MsTUFBTUMsY0FBY1YsK0NBQU1BLENBQUMsQ0FBQ1csS0FBS0MsTUFBUztRQUMvQ0MsV0FBVztRQUVYQyxtQkFBbUI7WUFDakIsTUFBTSxFQUFFRCxTQUFTLEVBQUUsR0FBR0Q7WUFFdEIsSUFBSUMsV0FBVztnQkFDYkYsSUFBSTtvQkFBRUUsV0FBVztnQkFBTTtnQkFDdkIsSUFBSU4sWUFBWUEsV0FBV1EsT0FBTztnQkFDbENDLE1BQU07WUFDUixPQUFPO2dCQUNMTCxJQUFJO29CQUFFRSxXQUFXO2dCQUFLO2dCQUN0QixJQUFJTixZQUFZQSxXQUFXVSxVQUFVO2dCQUNyQ0QsTUFBTTtZQUNSO1FBQ0Y7UUFFQSw2Q0FBNkM7UUFDN0NFLHFCQUFxQixDQUFDQztZQUNwQixNQUFNQyxLQUFLLFNBQVNDLE9BQU9DLFVBQVU7WUFDckNkLGFBQWFHLEdBQUcsQ0FBQ1MsSUFBSTtnQkFBRSxHQUFHRCxjQUFjO2dCQUFFQztnQkFBSUcsUUFBUTtnQkFBV0MsZUFBZTtZQUFTO1FBQzNGO0lBQ0YsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc2N1ZS1tZXNoLWZyb250ZW5kLy4vc3JjL3N0b3JlL2FwcFN0b3JlLmpzPzMyMzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnenVzdGFuZCc7XG5pbXBvcnQgKiBhcyBZIGZyb20gJ3lqcyc7XG5pbXBvcnQgeyBXZWJzb2NrZXRQcm92aWRlciB9IGZyb20gJ3ktd2Vic29ja2V0JztcbmltcG9ydCB7IEluZGV4ZWRkYlBlcnNpc3RlbmNlIH0gZnJvbSAneS1pbmRleGVkZGInO1xuXG4vLyAxLiBDcmVhdGUgdGhlIG1hdGhlbWF0aWNhbCBDUkRUIERvY3VtZW50XG5leHBvcnQgY29uc3QgeWRvYyA9IG5ldyBZLkRvYygpO1xuXG4vLyAyLiBQZXJzaXN0IGl0IHRvIHRoZSBicm93c2VyJ3Mgb2ZmbGluZSBzdG9yYWdlIChDbGllbnQtc2lkZSBvbmx5KVxuZXhwb3J0IGNvbnN0IGluZGV4ZWRkYlByb3ZpZGVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgSW5kZXhlZGRiUGVyc2lzdGVuY2UoJ3Jlc2N1ZS1tZXNoLWRiJywgeWRvYykgOiBudWxsO1xuXG4vLyAzLiBDb25uZWN0IHRvIHRoZSBsb2NhbCBNZXNoIE5vZGUgKEVTUDgyNjYgTm9kZU1DVSkgLyBCYWNrZW5kIFdlYlNvY2tldFxuZXhwb3J0IGNvbnN0IHdzUHJvdmlkZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWJzb2NrZXRQcm92aWRlcignd3M6Ly9sb2NhbGhvc3Q6MTIzNCcsICdyZXNjdWUtbWVzaC1yb29tJywgeWRvYykgOiBudWxsO1xuXG4vLyA0LiBDcmVhdGUgYSBzaGFyZWQgTWFwIGZvciBhbGwgU09TIFJlcXVlc3RzXG5leHBvcnQgY29uc3QgeVJlcXVlc3RzTWFwID0geWRvYy5nZXRNYXAoJ3JlcXVlc3RzJyk7XG5cbmV4cG9ydCBjb25zdCB1c2VBcHBTdG9yZSA9IGNyZWF0ZSgoc2V0LCBnZXQpID0+ICh7XG4gIGlzT2ZmbGluZTogZmFsc2UsXG5cbiAgdG9nZ2xlT2ZmbGluZU1vZGU6IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGlzT2ZmbGluZSB9ID0gZ2V0KCk7XG4gICAgXG4gICAgaWYgKGlzT2ZmbGluZSkge1xuICAgICAgc2V0KHsgaXNPZmZsaW5lOiBmYWxzZSB9KTtcbiAgICAgIGlmICh3c1Byb3ZpZGVyKSB3c1Byb3ZpZGVyLmNvbm5lY3QoKTtcbiAgICAgIGFsZXJ0KFwiQ29ubmVjdGVkIHRvIE1lc2ggTmV0d29yay4gQ1JEVHMgd2lsbCBpbnN0YW50bHkgc3luYyBhbmQgbWVyZ2Ugb2ZmbGluZSBkYXRhLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0KHsgaXNPZmZsaW5lOiB0cnVlIH0pO1xuICAgICAgaWYgKHdzUHJvdmlkZXIpIHdzUHJvdmlkZXIuZGlzY29ubmVjdCgpO1xuICAgICAgYWxlcnQoXCJNZXNoIE5ldHdvcmsgT2ZmbGluZSBNb2RlIEFjdGl2YXRlZC4gRGF0YSBpcyBzYXZlZCB0byBDUkRUIGFuZCB3aWxsIG1lcmdlIHdoZW4gcmVjb25uZWN0ZWQuXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBObyBsb25nZXIgbmVlZGVkLCBZanMgaGFuZGxlcyBpdCBuYXRpdmVseSFcbiAgY2FjaGVPZmZsaW5lUmVxdWVzdDogKHJlcXVlc3RQYXlsb2FkKSA9PiB7XG4gICAgY29uc3QgaWQgPSAncmVxLScgKyBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICAgIHlSZXF1ZXN0c01hcC5zZXQoaWQsIHsgLi4ucmVxdWVzdFBheWxvYWQsIGlkLCBzdGF0dXM6ICdwZW5kaW5nJywgc2V2ZXJpdHlMYWJlbDogJ21lZGl1bScgfSk7XG4gIH1cbn0pKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGUiLCJZIiwiV2Vic29ja2V0UHJvdmlkZXIiLCJJbmRleGVkZGJQZXJzaXN0ZW5jZSIsInlkb2MiLCJEb2MiLCJpbmRleGVkZGJQcm92aWRlciIsIndzUHJvdmlkZXIiLCJ5UmVxdWVzdHNNYXAiLCJnZXRNYXAiLCJ1c2VBcHBTdG9yZSIsInNldCIsImdldCIsImlzT2ZmbGluZSIsInRvZ2dsZU9mZmxpbmVNb2RlIiwiY29ubmVjdCIsImFsZXJ0IiwiZGlzY29ubmVjdCIsImNhY2hlT2ZmbGluZVJlcXVlc3QiLCJyZXF1ZXN0UGF5bG9hZCIsImlkIiwiY3J5cHRvIiwicmFuZG9tVVVJRCIsInN0YXR1cyIsInNldmVyaXR5TGFiZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/store/appStore.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "y-indexeddb":
/*!******************************!*\
  !*** external "y-indexeddb" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("y-indexeddb");;

/***/ }),

/***/ "y-websocket":
/*!******************************!*\
  !*** external "y-websocket" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("y-websocket");;

/***/ }),

/***/ "yjs":
/*!**********************!*\
  !*** external "yjs" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = import("yjs");;

/***/ }),

/***/ "zustand":
/*!**************************!*\
  !*** external "zustand" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = import("zustand");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.jsx")));
module.exports = __webpack_exports__;

})();