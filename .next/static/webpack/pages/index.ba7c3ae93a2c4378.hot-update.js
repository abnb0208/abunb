"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/TechBackground.js":
/*!**************************************!*\
  !*** ./components/TechBackground.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ \"./node_modules/@react-three/fiber/dist/react-three-fiber.esm.js\");\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/drei */ \"./node_modules/@react-three/drei/index.js\");\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n// Animated particle system\nconst ParticleSystem = ()=>{\n    _s();\n    const particlesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();\n    const count = 1000;\n    const positions = new Float32Array(count * 3);\n    const colors = new Float32Array(count * 3);\n    const scales = new Float32Array(count);\n    // Initialize particles\n    for(let i = 0; i < count; i++){\n        const i3 = i * 3;\n        positions[i3] = (Math.random() - 0.5) * 10;\n        positions[i3 + 1] = (Math.random() - 0.5) * 10;\n        positions[i3 + 2] = (Math.random() - 0.5) * 10;\n        // Blue to purple gradient colors\n        const mixFactor = Math.random();\n        colors[i3] = 0; // R\n        colors[i3 + 1] = mixFactor * 0.7; // G\n        colors[i3 + 2] = 1; // B\n        scales[i] = Math.random() * 0.2;\n    }\n    // Animate particles\n    (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.useFrame)((state)=>{\n        const time = state.clock.getElapsedTime();\n        if (particlesRef.current && particlesRef.current.geometry) {\n            for(let i = 0; i < count; i++){\n                const i3 = i * 3;\n                // Create a flowing motion\n                positions[i3 + 1] += Math.sin(time * 0.1 + i * 0.01) * 0.002;\n                positions[i3] += Math.cos(time * 0.1 + i * 0.01) * 0.002;\n                // Reset particles that go too far\n                if (Math.abs(positions[i3]) > 5) positions[i3] *= -0.9;\n                if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= -0.9;\n                if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -0.9;\n            }\n            // 安全检查：确保属性存在再进行操作\n            if (particlesRef.current.geometry.attributes && particlesRef.current.geometry.attributes.position) {\n                particlesRef.current.geometry.attributes.position.needsUpdate = true;\n            }\n            particlesRef.current.rotation.y = time * 0.05;\n        }\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"points\", {\n        ref: particlesRef,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"bufferGeometry\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"bufferAttribute\", {\n                        attachObject: [\n                            \"attributes\",\n                            \"position\"\n                        ],\n                        count: count,\n                        array: positions,\n                        itemSize: 3\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                        lineNumber: 61,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"bufferAttribute\", {\n                        attachObject: [\n                            \"attributes\",\n                            \"color\"\n                        ],\n                        count: count,\n                        array: colors,\n                        itemSize: 3\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                        lineNumber: 67,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"bufferAttribute\", {\n                        attachObject: [\n                            \"attributes\",\n                            \"scale\"\n                        ],\n                        count: count,\n                        array: scales,\n                        itemSize: 1\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 60,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pointsMaterial\", {\n                size: 0.1,\n                vertexColors: true,\n                transparent: true,\n                opacity: 0.8,\n                sizeAttenuation: true\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n        lineNumber: 59,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ParticleSystem, \"nyoGzy6YD2rRIe6CSEyQKrNyblA=\", false, function() {\n    return [\n        _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.useFrame\n    ];\n});\n_c = ParticleSystem;\n// Glowing grid\nconst Grid = ()=>{\n    _s1();\n    const gridRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();\n    (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.useFrame)((state)=>{\n        const time = state.clock.getElapsedTime();\n        if (gridRef.current && gridRef.current.material) {\n            gridRef.current.material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;\n        }\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"mesh\", {\n        ref: gridRef,\n        rotation: [\n            -Math.PI / 2,\n            0,\n            0\n        ],\n        position: [\n            0,\n            -2,\n            0\n        ],\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"planeGeometry\", {\n                args: [\n                    30,\n                    30,\n                    30,\n                    30\n                ]\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 104,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meshBasicMaterial\", {\n                color: \"#00f2fe\",\n                wireframe: true,\n                transparent: true,\n                opacity: 0.3\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 105,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n        lineNumber: 103,\n        columnNumber: 5\n    }, undefined);\n};\n_s1(Grid, \"By4U3u8CFGN6dUPKGQ+XU70kIaA=\", false, function() {\n    return [\n        _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.useFrame\n    ];\n});\n_c1 = Grid;\n// Main 3D scene\nconst Scene = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ambientLight\", {\n                intensity: 0.1\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 119,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pointLight\", {\n                position: [\n                    0,\n                    10,\n                    10\n                ],\n                intensity: 0.5,\n                color: \"#4facfe\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 120,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_three_drei__WEBPACK_IMPORTED_MODULE_3__.Stars, {\n                radius: 50,\n                depth: 50,\n                count: 1000,\n                factor: 4,\n                fade: true,\n                speed: 1\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 121,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ParticleSystem, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 122,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Grid, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 123,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_three_drei__WEBPACK_IMPORTED_MODULE_3__.OrbitControls, {\n                enableZoom: false,\n                enablePan: false,\n                enableRotate: true,\n                autoRotate: true,\n                autoRotateSpeed: 0.5\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 124,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_c2 = Scene;\n// Main component\nconst TechBackground = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed inset-0 -z-10\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.Canvas, {\n                camera: {\n                    position: [\n                        0,\n                        0,\n                        5\n                    ],\n                    fov: 60\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Scene, {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                    lineNumber: 140,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 139,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n                lineNumber: 142,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\abunb\\\\Desktop\\\\abunb_web\\\\components\\\\TechBackground.js\",\n        lineNumber: 138,\n        columnNumber: 5\n    }, undefined);\n};\n_c3 = TechBackground;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TechBackground);\nvar _c, _c1, _c2, _c3;\n$RefreshReg$(_c, \"ParticleSystem\");\n$RefreshReg$(_c1, \"Grid\");\n$RefreshReg$(_c2, \"Scene\");\n$RefreshReg$(_c3, \"TechBackground\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxRQUFRO0lBQ1oscUJBQ0U7OzBCQUNFLDhEQUFDQztnQkFBYUMsV0FBVzs7Ozs7OzBCQUN6Qiw4REFBQ0M7Z0JBQVc5QixVQUFVO29CQUFDO29CQUFHO29CQUFJO2lCQUFHO2dCQUFFNkIsV0FBVztnQkFBS0osT0FBTTs7Ozs7OzBCQUN6RCw4REFBQ2xELG9EQUFLQTtnQkFBQ3dELFFBQVE7Z0JBQUlDLE9BQU87Z0JBQUlwRCxPQUFPO2dCQUFNcUQsUUFBUTtnQkFBR0MsSUFBSTtnQkFBQ0MsT0FBTzs7Ozs7OzBCQUNsRSw4REFBQ3pEOzs7OzswQkFDRCw4REFBQ3VDOzs7OzswQkFDRCw4REFBQ3pDLDREQUFhQTtnQkFDWjRELFlBQVk7Z0JBQ1pDLFdBQVc7Z0JBQ1hDLGNBQWM7Z0JBQ2RDLFVBQVU7Z0JBQ1ZDLGlCQUFpQjs7Ozs7Ozs7QUFJekI7TUFqQk1iO0FBbUJOLGlCQUFpQjtBQUNqQixNQUFNYyxpQkFBaUI7SUFDckIscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDdEUsc0RBQU1BO2dCQUFDdUUsUUFBUTtvQkFBRTVDLFVBQVU7d0JBQUM7d0JBQUc7d0JBQUc7cUJBQUU7b0JBQUU2QyxLQUFLO2dCQUFHOzBCQUM3Qyw0RUFBQ2xCOzs7Ozs7Ozs7OzBCQUVILDhEQUFDZTtnQkFBSUMsV0FBVTs7Ozs7Ozs7Ozs7O0FBR3JCO01BVE1GO0FBV04sK0RBQWVBLGNBQWNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9UZWNoQmFja2dyb3VuZC5qcz82OTg4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2FudmFzLCB1c2VGcmFtZSB9IGZyb20gJ0ByZWFjdC10aHJlZS9maWJlcic7XG5pbXBvcnQgeyBTdGFycywgT3JiaXRDb250cm9scyB9IGZyb20gJ0ByZWFjdC10aHJlZS9kcmVpJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLy8gQW5pbWF0ZWQgcGFydGljbGUgc3lzdGVtXG5jb25zdCBQYXJ0aWNsZVN5c3RlbSA9ICgpID0+IHtcbiAgY29uc3QgcGFydGljbGVzUmVmID0gdXNlUmVmKCk7XG4gIGNvbnN0IGNvdW50ID0gMTAwMDtcbiAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpO1xuICBjb25zdCBjb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50ICogMyk7XG4gIGNvbnN0IHNjYWxlcyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQpO1xuICBcbiAgLy8gSW5pdGlhbGl6ZSBwYXJ0aWNsZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgY29uc3QgaTMgPSBpICogMztcbiAgICBwb3NpdGlvbnNbaTNdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTA7XG4gICAgcG9zaXRpb25zW2kzICsgMV0gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxMDtcbiAgICBwb3NpdGlvbnNbaTMgKyAyXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEwO1xuICAgIFxuICAgIC8vIEJsdWUgdG8gcHVycGxlIGdyYWRpZW50IGNvbG9yc1xuICAgIGNvbnN0IG1peEZhY3RvciA9IE1hdGgucmFuZG9tKCk7XG4gICAgY29sb3JzW2kzXSA9IDA7IC8vIFJcbiAgICBjb2xvcnNbaTMgKyAxXSA9IG1peEZhY3RvciAqIDAuNzsgLy8gR1xuICAgIGNvbG9yc1tpMyArIDJdID0gMTsgLy8gQlxuICAgIFxuICAgIHNjYWxlc1tpXSA9IE1hdGgucmFuZG9tKCkgKiAwLjI7XG4gIH1cbiAgXG4gIC8vIEFuaW1hdGUgcGFydGljbGVzXG4gIHVzZUZyYW1lKChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBzdGF0ZS5jbG9jay5nZXRFbGFwc2VkVGltZSgpO1xuICAgIFxuICAgIGlmIChwYXJ0aWNsZXNSZWYuY3VycmVudCAmJiBwYXJ0aWNsZXNSZWYuY3VycmVudC5nZW9tZXRyeSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGkzID0gaSAqIDM7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgYSBmbG93aW5nIG1vdGlvblxuICAgICAgICBwb3NpdGlvbnNbaTMgKyAxXSArPSBNYXRoLnNpbih0aW1lICogMC4xICsgaSAqIDAuMDEpICogMC4wMDI7XG4gICAgICAgIHBvc2l0aW9uc1tpM10gKz0gTWF0aC5jb3ModGltZSAqIDAuMSArIGkgKiAwLjAxKSAqIDAuMDAyO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVzZXQgcGFydGljbGVzIHRoYXQgZ28gdG9vIGZhclxuICAgICAgICBpZiAoTWF0aC5hYnMocG9zaXRpb25zW2kzXSkgPiA1KSBwb3NpdGlvbnNbaTNdICo9IC0wLjk7XG4gICAgICAgIGlmIChNYXRoLmFicyhwb3NpdGlvbnNbaTMgKyAxXSkgPiA1KSBwb3NpdGlvbnNbaTMgKyAxXSAqPSAtMC45O1xuICAgICAgICBpZiAoTWF0aC5hYnMocG9zaXRpb25zW2kzICsgMl0pID4gNSkgcG9zaXRpb25zW2kzICsgMl0gKj0gLTAuOTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8g5a6J5YWo5qOA5p+l77ya56Gu5L+d5bGe5oCn5a2Y5Zyo5YaN6L+b6KGM5pON5L2cXG4gICAgICBpZiAocGFydGljbGVzUmVmLmN1cnJlbnQuZ2VvbWV0cnkuYXR0cmlidXRlcyAmJiBcbiAgICAgICAgICBwYXJ0aWNsZXNSZWYuY3VycmVudC5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uKSB7XG4gICAgICAgIHBhcnRpY2xlc1JlZi5jdXJyZW50Lmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgXG4gICAgICBwYXJ0aWNsZXNSZWYuY3VycmVudC5yb3RhdGlvbi55ID0gdGltZSAqIDAuMDU7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiAoXG4gICAgPHBvaW50cyByZWY9e3BhcnRpY2xlc1JlZn0+XG4gICAgICA8YnVmZmVyR2VvbWV0cnk+XG4gICAgICAgIDxidWZmZXJBdHRyaWJ1dGVcbiAgICAgICAgICBhdHRhY2hPYmplY3Q9e1snYXR0cmlidXRlcycsICdwb3NpdGlvbiddfVxuICAgICAgICAgIGNvdW50PXtjb3VudH1cbiAgICAgICAgICBhcnJheT17cG9zaXRpb25zfVxuICAgICAgICAgIGl0ZW1TaXplPXszfVxuICAgICAgICAvPlxuICAgICAgICA8YnVmZmVyQXR0cmlidXRlXG4gICAgICAgICAgYXR0YWNoT2JqZWN0PXtbJ2F0dHJpYnV0ZXMnLCAnY29sb3InXX1cbiAgICAgICAgICBjb3VudD17Y291bnR9XG4gICAgICAgICAgYXJyYXk9e2NvbG9yc31cbiAgICAgICAgICBpdGVtU2l6ZT17M31cbiAgICAgICAgLz5cbiAgICAgICAgPGJ1ZmZlckF0dHJpYnV0ZVxuICAgICAgICAgIGF0dGFjaE9iamVjdD17WydhdHRyaWJ1dGVzJywgJ3NjYWxlJ119XG4gICAgICAgICAgY291bnQ9e2NvdW50fVxuICAgICAgICAgIGFycmF5PXtzY2FsZXN9XG4gICAgICAgICAgaXRlbVNpemU9ezF9XG4gICAgICAgIC8+XG4gICAgICA8L2J1ZmZlckdlb21ldHJ5PlxuICAgICAgPHBvaW50c01hdGVyaWFsXG4gICAgICAgIHNpemU9ezAuMX1cbiAgICAgICAgdmVydGV4Q29sb3JzXG4gICAgICAgIHRyYW5zcGFyZW50XG4gICAgICAgIG9wYWNpdHk9ezAuOH1cbiAgICAgICAgc2l6ZUF0dGVudWF0aW9uPXt0cnVlfVxuICAgICAgLz5cbiAgICA8L3BvaW50cz5cbiAgKTtcbn07XG5cbi8vIEdsb3dpbmcgZ3JpZFxuY29uc3QgR3JpZCA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZFJlZiA9IHVzZVJlZigpO1xuICBcbiAgdXNlRnJhbWUoKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IHN0YXRlLmNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgaWYgKGdyaWRSZWYuY3VycmVudCAmJiBncmlkUmVmLmN1cnJlbnQubWF0ZXJpYWwpIHtcbiAgICAgIGdyaWRSZWYuY3VycmVudC5tYXRlcmlhbC5vcGFjaXR5ID0gMC4zICsgTWF0aC5zaW4odGltZSAqIDAuNSkgKiAwLjE7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiAoXG4gICAgPG1lc2ggcmVmPXtncmlkUmVmfSByb3RhdGlvbj17Wy1NYXRoLlBJIC8gMiwgMCwgMF19IHBvc2l0aW9uPXtbMCwgLTIsIDBdfT5cbiAgICAgIDxwbGFuZUdlb21ldHJ5IGFyZ3M9e1szMCwgMzAsIDMwLCAzMF19IC8+XG4gICAgICA8bWVzaEJhc2ljTWF0ZXJpYWwgXG4gICAgICAgIGNvbG9yPVwiIzAwZjJmZVwiIFxuICAgICAgICB3aXJlZnJhbWU9e3RydWV9IFxuICAgICAgICB0cmFuc3BhcmVudFxuICAgICAgICBvcGFjaXR5PXswLjN9XG4gICAgICAvPlxuICAgIDwvbWVzaD5cbiAgKTtcbn07XG5cbi8vIE1haW4gM0Qgc2NlbmVcbmNvbnN0IFNjZW5lID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8YW1iaWVudExpZ2h0IGludGVuc2l0eT17MC4xfSAvPlxuICAgICAgPHBvaW50TGlnaHQgcG9zaXRpb249e1swLCAxMCwgMTBdfSBpbnRlbnNpdHk9ezAuNX0gY29sb3I9XCIjNGZhY2ZlXCIgLz5cbiAgICAgIDxTdGFycyByYWRpdXM9ezUwfSBkZXB0aD17NTB9IGNvdW50PXsxMDAwfSBmYWN0b3I9ezR9IGZhZGUgc3BlZWQ9ezF9IC8+XG4gICAgICA8UGFydGljbGVTeXN0ZW0gLz5cbiAgICAgIDxHcmlkIC8+XG4gICAgICA8T3JiaXRDb250cm9scyBcbiAgICAgICAgZW5hYmxlWm9vbT17ZmFsc2V9IFxuICAgICAgICBlbmFibGVQYW49e2ZhbHNlfSBcbiAgICAgICAgZW5hYmxlUm90YXRlPXt0cnVlfVxuICAgICAgICBhdXRvUm90YXRlXG4gICAgICAgIGF1dG9Sb3RhdGVTcGVlZD17MC41fVxuICAgICAgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbi8vIE1haW4gY29tcG9uZW50XG5jb25zdCBUZWNoQmFja2dyb3VuZCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgLXotMTBcIj5cbiAgICAgIDxDYW52YXMgY2FtZXJhPXt7IHBvc2l0aW9uOiBbMCwgMCwgNV0sIGZvdjogNjAgfX0+XG4gICAgICAgIDxTY2VuZSAvPlxuICAgICAgPC9DYW52YXM+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXRyYW5zcGFyZW50IHRvLWJsYWNrIG9wYWNpdHktODBcIiAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGVjaEJhY2tncm91bmQ7ICJdLCJuYW1lcyI6WyJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJDYW52YXMiLCJ1c2VGcmFtZSIsIlN0YXJzIiwiT3JiaXRDb250cm9scyIsIlRIUkVFIiwiUGFydGljbGVTeXN0ZW0iLCJwYXJ0aWNsZXNSZWYiLCJjb3VudCIsInBvc2l0aW9ucyIsIkZsb2F0MzJBcnJheSIsImNvbG9ycyIsInNjYWxlcyIsImkiLCJpMyIsIk1hdGgiLCJyYW5kb20iLCJtaXhGYWN0b3IiLCJzdGF0ZSIsInRpbWUiLCJjbG9jayIsImdldEVsYXBzZWRUaW1lIiwiY3VycmVudCIsImdlb21ldHJ5Iiwic2luIiwiY29zIiwiYWJzIiwiYXR0cmlidXRlcyIsInBvc2l0aW9uIiwibmVlZHNVcGRhdGUiLCJyb3RhdGlvbiIsInkiLCJwb2ludHMiLCJyZWYiLCJidWZmZXJHZW9tZXRyeSIsImJ1ZmZlckF0dHJpYnV0ZSIsImF0dGFjaE9iamVjdCIsImFycmF5IiwiaXRlbVNpemUiLCJwb2ludHNNYXRlcmlhbCIsInNpemUiLCJ2ZXJ0ZXhDb2xvcnMiLCJ0cmFuc3BhcmVudCIsIm9wYWNpdHkiLCJzaXplQXR0ZW51YXRpb24iLCJHcmlkIiwiZ3JpZFJlZiIsIm1hdGVyaWFsIiwibWVzaCIsIlBJIiwicGxhbmVHZW9tZXRyeSIsImFyZ3MiLCJtZXNoQmFzaWNNYXRlcmlhbCIsImNvbG9yIiwid2lyZWZyYW1lIiwiU2NlbmUiLCJhbWJpZW50TGlnaHQiLCJpbnRlbnNpdHkiLCJwb2ludExpZ2h0IiwicmFkaXVzIiwiZGVwdGgiLCJmYWN0b3IiLCJmYWRlIiwic3BlZWQiLCJlbmFibGVab29tIiwiZW5hYmxlUGFuIiwiZW5hYmxlUm90YXRlIiwiYXV0b1JvdGF0ZSIsImF1dG9Sb3RhdGVTcGVlZCIsIlRlY2hCYWNrZ3JvdW5kIiwiZGl2IiwiY2xhc3NOYW1lIiwiY2FtZXJhIiwiZm92Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/TechBackground.js\n"));

/***/ })

});