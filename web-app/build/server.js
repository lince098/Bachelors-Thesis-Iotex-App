module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "039df4432456926e2271";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"client\":{\"js\":\"http://localhost:3001/static/js/bundle.js\"},\"\":{\"json\":\"http://localhost:3001/../chunks.json\"}}");

/***/ }),

/***/ "./configs/private.ts":
/*!****************************!*\
  !*** ./configs/private.ts ***!
  \****************************/
/*! exports provided: privateConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateConfig", function() { return privateConfig; });
const privateConfig = {
  JWT_SECRET: process.env.JWT_SECRET || "TEST",
  cookieOpts: {
    domain: "",
    secure: false,
    httpOnly: true,
    signed: false,
    maxAge: 7 * 24 * 3600 * 1000,
  },
};


/***/ }),

/***/ "./configs/public.ts":
/*!***************************!*\
  !*** ./configs/public.ts ***!
  \***************************/
/*! exports provided: publicConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicConfig", function() { return publicConfig; });
/* harmony import */ var _src_common_utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/common/utils/index */ "./src/common/utils/index.ts");

const { NODE_ENV, FORCE_HTTPS } = _src_common_utils_index__WEBPACK_IMPORTED_MODULE_0__["utils"].env.getEnv();

const IS_PROD = NODE_ENV == "production";
const publicConfig = {
  IS_PROD,
  IOTEX_CORE_ENDPOPINT: IS_PROD ? "https://api.iotex.one:443" : "https://api.testnet.iotex.one:443",
  IOTEXSCAN_ENDPOINT: IS_PROD ? "http://iotexscan.io" : "http://testnet.iotexscan.io",
  FORCE_HTTPS: _src_common_utils_index__WEBPACK_IMPORTED_MODULE_0__["utils"].env.getBoolean(FORCE_HTTPS),
};


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./public/translations/en.json":
/*!*************************************!*\
  !*** ./public/translations/en.json ***!
  \*************************************/
/*! exports provided: HELLO_MESSAGE, count, home.connect_wallet, header.connect_to_wallet, tips.connect_fail, tips.connect_fail.mobile, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"HELLO_MESSAGE\":\"Hello ${message}\",\"count\":\"count\",\"home.connect_wallet\":\"Connect Wallet\",\"header.connect_to_wallet\":\"Connect to a wallet\",\"tips.connect_fail\":\"Please open ioPay desktop and unlock wallet first.\",\"tips.connect_fail.mobile\":\"Please allow mimo access your wallet.\"}");

/***/ }),

/***/ "./src/client/App.tsx":
/*!****************************!*\
  !*** ./src/client/App.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/Home */ "./src/client/pages/Home/index.tsx");
/* harmony import */ var _common_store_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/store/index */ "./src/common/store/index.ts");
/* harmony import */ var _components_MainLayout_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/MainLayout/index */ "./src/client/components/MainLayout/index.tsx");
/* harmony import */ var _utils_rpc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/rpc */ "./src/client/utils/rpc.ts");
/* harmony import */ var _utils_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/hooks */ "./src/client/utils/hooks.ts");







const App = () => {
    const { lang, wallet } = Object(_common_store_index__WEBPACK_IMPORTED_MODULE_3__["useStore"])();
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        lang.init();
        wallet.init();
        _utils_rpc__WEBPACK_IMPORTED_MODULE_5__["rpcClient"].login("test", "123").then(async () => {
            const me = await _utils_rpc__WEBPACK_IMPORTED_MODULE_5__["rpcClient"].me();
            console.log("login success", me);
            await _utils_rpc__WEBPACK_IMPORTED_MODULE_5__["rpcClient"].logout();
            const logoutMe = await _utils_rpc__WEBPACK_IMPORTED_MODULE_5__["rpcClient"].me();
            console.log("logout success", logoutMe);
        });
        _utils_hooks__WEBPACK_IMPORTED_MODULE_6__["hooks"].waitAccount().then(() => {
            console.log("load account success", wallet.account.address);
        });
        _utils_hooks__WEBPACK_IMPORTED_MODULE_6__["hooks"].waitIotxBalance().then(() => {
            console.log("load iotx balance success", wallet.account.balance);
        });
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MainLayout_index__WEBPACK_IMPORTED_MODULE_4__["MainLayout"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/", component: _pages_Home__WEBPACK_IMPORTED_MODULE_2__["Home"] }))));
};
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "./src/client/components/ClientOnly/clientOnly.tsx":
/*!*********************************************************!*\
  !*** ./src/client/components/ClientOnly/clientOnly.tsx ***!
  \*********************************************************/
/*! exports provided: ClientOnly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientOnly", function() { return ClientOnly; });
/* harmony import */ var _common_utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/utils/index */ "./src/common/utils/index.ts");

const ClientOnly = ({ children }) => {
    if (_common_utils_index__WEBPACK_IMPORTED_MODULE_0__["utils"].env.isSSR())
        return null;
    return children;
};


/***/ }),

/***/ "./src/client/components/Header/index.tsx":
/*!************************************************!*\
  !*** ./src/client/components/Header/index.tsx ***!
  \************************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/store */ "./src/common/store/index.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/utils/index */ "./src/common/utils/index.ts");
/* harmony import */ var _modules_stitches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/stitches */ "./src/client/modules/stitches/index.ts");






const Header = () => {
    const { lang, wallet } = Object(_common_store__WEBPACK_IMPORTED_MODULE_1__["useStore"])();
    const store = Object(mobx_react_lite__WEBPACK_IMPORTED_MODULE_3__["useLocalStore"])(() => ({
        onMore() { },
        onSettings() { },
        onConnectWallet() {
            wallet.connectWallet();
        },
    }));
    return Object(mobx_react_lite__WEBPACK_IMPORTED_MODULE_3__["useObserver"])(() => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: styles.header },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: styles.content },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { alt: "logo", className: styles.logo, src: "/image/logo.png" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: styles.contentRight },
                wallet.account.address ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                        parseFloat(wallet.account.balance).toFixed(2),
                        " IOTX"),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cursor-pointer" }, _common_utils_index__WEBPACK_IMPORTED_MODULE_4__["utils"].helper.string.truncate(wallet.account.address, 12)),
                    "\u00A0\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { src: "/image/iotx.png", className: "w-8" }))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: styles.contentRightConnect, onClick: store.onConnectWallet }, lang.t("header.connect_to_wallet"))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "ml-2" }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Button"], { className: "component__header__content__right__icon_button", onClick: store.onMore, type: "text", shape: "circle", icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { src: "/image/icon_more.png", className: "outline-none cursor-pointer w-8" }) }))))));
};
const styles = {
    header: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        backgroundColor: "$bg",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 999,
        height: "2.5rem",
        sm: {
            height: "2.5rem",
        },
        md: {
            height: "3rem",
        },
        lg: {
            height: "4rem",
        },
    }),
    content: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        flexBetweenCenter: "row",
        margin: "0 auto",
        width: "90%",
        height: "100%",
        py: "0.5rem",
        sm: {
            py: "0.5rem",
        },
        md: {
            py: "0.75rem",
        },
        lg: {
            py: "0.75rem",
        },
    }),
    contentRight: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        flexBetweenCenter: "row",
        fontSize: "$lg",
        color: "$gray500",
    }),
    contentRightConnect: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        outline: "none !important",
    }),
    contentRightButton: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        padding: 0,
        flexBetweenCenter: "row",
    }),
    logo: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        height: "100%",
    }),
};


/***/ }),

/***/ "./src/client/components/MainLayout/index.tsx":
/*!****************************************************!*\
  !*** ./src/client/components/MainLayout/index.tsx ***!
  \****************************************************/
/*! exports provided: MainLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainLayout", function() { return MainLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Header */ "./src/client/components/Header/index.tsx");
/* harmony import */ var _components_ClientOnly_clientOnly__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ClientOnly/clientOnly */ "./src/client/components/ClientOnly/clientOnly.tsx");
/* harmony import */ var _modules_stitches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/stitches */ "./src/client/modules/stitches/index.ts");




const styles = {
    main: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_3__["css"])({
        height: "100vh",
    }),
    content: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_3__["css"])({
        height: "100%",
        backgroundColor: "$bg2",
    }),
};
const MainLayout = (props) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ClientOnly_clientOnly__WEBPACK_IMPORTED_MODULE_2__["ClientOnly"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: styles.main },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_1__["Header"], null),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: styles.content }, props.children))));
};


/***/ }),

/***/ "./src/client/modules/stitches/index.ts":
/*!**********************************************!*\
  !*** ./src/client/modules/stitches/index.ts ***!
  \**********************************************/
/*! exports provided: styled, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styled", function() { return styled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony import */ var _stitches_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stitches/react */ "@stitches/react");
/* harmony import */ var _stitches_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stitches_react__WEBPACK_IMPORTED_MODULE_0__);

const { styled, css } = Object(_stitches_react__WEBPACK_IMPORTED_MODULE_0__["createStyled"])({
    prefix: "",
    tokens: {
        colors: {
            $bg: "white",
            $bg2: "#f2f4f5",
            $gray500: "hsl(206,10%,76%)",
            $blue500: "hsl(206,100%,50%)",
            $purple500: "hsl(252,78%,60%)",
            $green500: "hsl(148,60%,60%)",
            $red500: "hsl(352,100%,62%)",
        },
        height: {
            $0: "0",
            $1: "0.25rem",
            $2: "0.5rem",
            $3: "0.75rem",
            $4: "1rem",
            $5: "1.25rem",
            $6: "1.5rem",
            $7: "1.75rem",
            $8: "2rem",
        },
        space: {
            $1: "5px",
            $2: "10px",
            $3: "15px",
            autoX: "0 auto",
        },
        fontSizes: {
            $xs: "0.75rem",
            $sm: "0.875rem",
            $base: "1rem",
            $lg: "1.125rem",
            $xl: "1.25rem",
            $2xl: "1.5rem",
            $3xl: "1.875rem",
            $4xl: "2.25rem",
            $5xl: "3rem",
            $6xl: "4rem",
        },
        fonts: {
            $untitled: "Untitled Sans, apple-system, sans-serif",
            $mono: "Söhne Mono, menlo, monospace",
        },
        fontWeights: {},
        lineHeights: {},
        letterSpacings: {},
        sizes: {},
        borderWidths: {},
        borderStyles: {},
        radii: {},
        shadows: {},
        zIndices: {},
        transitions: {},
    },
    breakpoints: {
        sm: (rule) => `@media (min-width: 640px) { ${rule} }`,
        md: (rule) => `@media (min-width: 768px) { ${rule} }`,
        lg: (rule) => `@media (min-width: 1024px) { ${rule} }`,
        xl: (rule) => `@media (min-width: 1280px) { ${rule} }`,
    },
    utils: {
        m: (config) => (value) => ({
            marginTop: value,
            marginBottom: value,
            marginLeft: value,
            marginRight: value,
        }),
        mt: (config) => (value) => ({
            marginTop: value,
        }),
        mr: (config) => (value) => ({
            marginRight: value,
        }),
        mb: (config) => (value) => ({
            marginBottom: value,
        }),
        ml: (config) => (value) => ({
            marginLeft: value,
        }),
        mx: (config) => (value) => ({
            marginLeft: value,
            marginRight: value,
        }),
        my: (config) => (value) => ({
            marginTop: value,
            marginBottom: value,
        }),
        p: (config) => (value) => ({
            paddingTop: value,
            paddingBottom: value,
            paddingLeft: value,
            paddingRight: value,
        }),
        pt: (config) => (value) => ({
            paddingTop: value,
        }),
        pr: (config) => (value) => ({
            paddingRight: value,
        }),
        pb: (config) => (value) => ({
            paddingBottom: value,
        }),
        pl: (config) => (value) => ({
            paddingLeft: value,
        }),
        px: (config) => (value) => ({
            paddingLeft: value,
            paddingRight: value,
        }),
        py: (config) => (value) => ({
            paddingTop: value,
            paddingBottom: value,
        }),
        size: (config) => (value) => ({
            width: value,
            height: value,
        }),
        linearGradient: (config) => (value) => ({
            backgroundImage: `linear-gradient(${value})`,
        }),
        br: (config) => (value) => ({
            borderRadius: value,
        }),
        flexBetweenCenter: (config) => (value = "row") => ({
            flexDirection: value,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }),
        flexCenterCenter: (config) => (value = "row") => ({
            flexDirection: value,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }),
    },
});


/***/ }),

/***/ "./src/client/pages/Home/index.tsx":
/*!*****************************************!*\
  !*** ./src/client/pages/Home/index.tsx ***!
  \*****************************************/
/*! exports provided: Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react-lite */ "mobx-react-lite");
/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/store/index */ "./src/common/store/index.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _configs_public__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../configs/public */ "./configs/public.ts");
/* harmony import */ var _modules_stitches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/stitches */ "./src/client/modules/stitches/index.ts");






const Home = () => {
    const { wallet } = Object(_common_store_index__WEBPACK_IMPORTED_MODULE_2__["useStore"])();
    const store = Object(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__["useLocalStore"])(() => ({
        onConnectWallet() {
            wallet.connectWallet();
        },
    }));
    return Object(mobx_react_lite__WEBPACK_IMPORTED_MODULE_1__["useObserver"])(() => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: styles.home }, !wallet.account.address ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { onClick: store.onConnectWallet }, "Connect to wallet...")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], { className: "px-2 mx-2", onClick: () => wallet.claimVita() }, "Claim VITA"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], { className: "px-2 mx-2", onClick: () => wallet.transferVita() }, "Transfer 1 VITA"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], { className: "px-2 mx-2", onClick: () => wallet.transferIotx() }, "Transfer 1 IOTX"),
        wallet.actionHash && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null,
            "Action Hash: ",
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { href: `${_configs_public__WEBPACK_IMPORTED_MODULE_4__["publicConfig"].IOTEXSCAN_ENDPOINT}/action/${wallet.actionHash}` }, wallet.actionHash))))))));
};
const styles = {
    home: Object(_modules_stitches__WEBPACK_IMPORTED_MODULE_5__["css"])({
        textAlign: "center",
        pt: "5rem",
        margin: "0 auto",
        width: "100%",
    }),
};


/***/ }),

/***/ "./src/client/utils/hooks.ts":
/*!***********************************!*\
  !*** ./src/client/utils/hooks.ts ***!
  \***********************************/
/*! exports provided: hooks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hooks", function() { return hooks; });
/* harmony import */ var _common_utils_antanna__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils/antanna */ "./src/common/utils/antanna.ts");
/* harmony import */ var _common_utils_eventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/utils/eventBus */ "./src/common/utils/eventBus.ts");
/* harmony import */ var _common_store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/store/index */ "./src/common/store/index.ts");



const hooks = {
    async waitAccount() {
        return new Promise((res, rej) => {
            if (_common_utils_antanna__WEBPACK_IMPORTED_MODULE_0__["AntennaUtils"].getAntenna().iotx.accounts[0]) {
                res();
            }
            else {
                _common_utils_eventBus__WEBPACK_IMPORTED_MODULE_1__["eventBus"].once("client.wallet.onAccount", () => {
                    res();
                });
            }
        });
    },
    async waitIotxBalance() {
        return new Promise((res, rej) => {
            if (_common_store_index__WEBPACK_IMPORTED_MODULE_2__["rootStore"].wallet.account.balance) {
                res();
            }
            else {
                _common_utils_eventBus__WEBPACK_IMPORTED_MODULE_1__["eventBus"].once("client.wallet.iotx.onBalance", () => {
                    res();
                });
            }
        });
    },
};


/***/ }),

/***/ "./src/client/utils/rpc.ts":
/*!*********************************!*\
  !*** ./src/client/utils/rpc.ts ***!
  \*********************************/
/*! exports provided: rpcClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rpcClient", function() { return rpcClient; });
/* harmony import */ var _wildcard_api_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wildcard-api/client */ "@wildcard-api/client");
/* harmony import */ var _wildcard_api_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wildcard_api_client__WEBPACK_IMPORTED_MODULE_0__);

const rpcClient = _wildcard_api_client__WEBPACK_IMPORTED_MODULE_0__["endpoints"];


/***/ }),

/***/ "./src/common/constants/abi.ts":
/*!*************************************!*\
  !*** ./src/common/constants/abi.ts ***!
  \*************************************/
/*! exports provided: N2E_ABI, CLAIM_ABI, BID_ABI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N2E_ABI", function() { return N2E_ABI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLAIM_ABI", function() { return CLAIM_ABI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BID_ABI", function() { return BID_ABI; });
const N2E_ABI = [
    {
        constant: true,
        inputs: [],
        name: "count",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "safe",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "unpause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_fee",
                type: "uint256",
            },
        ],
        name: "setDepositFee",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_maxAmount",
                type: "uint256",
            },
        ],
        name: "setMaxAmount",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "paused",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_safe",
                type: "address",
            },
        ],
        name: "setSafe",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "maxAmount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "depositFee",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "pause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_minAmount",
                type: "uint256",
            },
        ],
        name: "setMinAmount",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "minAmount",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "_offset",
                type: "uint256",
            },
            {
                name: "_limit",
                type: "uint256",
            },
        ],
        name: "getRecords",
        outputs: [
            {
                name: "_customers",
                type: "address[]",
            },
            {
                name: "_receivers",
                type: "address[]",
            },
            {
                name: "_amounts",
                type: "uint256[]",
            },
            {
                name: "_fees",
                type: "uint256[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "gasLimit",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                name: "_safe",
                type: "address",
            },
            {
                name: "_fee",
                type: "uint256",
            },
            {
                name: "_minAmount",
                type: "uint256",
            },
            {
                name: "_maxAmount",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        payable: true,
        stateMutability: "payable",
        type: "fallback",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "customer",
                type: "address",
            },
            {
                indexed: true,
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                name: "fee",
                type: "uint256",
            },
        ],
        name: "Receipt",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "Pause",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "Unpause",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        constant: false,
        inputs: [],
        name: "deposit",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_to",
                type: "address",
            },
        ],
        name: "depositTo",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_gasLimit",
                type: "uint256",
            },
        ],
        name: "setGasLimit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const CLAIM_ABI = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "cycleIncrementalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "donationPoolAddress",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "lastClaimViewIDs",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "unpause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "genesisPoolAddress",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "vps",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "paused",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "lastDonationPoolClaimViewID",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "pause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "rewardPoolAddress",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "authNonces",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "lastRewardPoolClaimViewID",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "cycleLength",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { name: "_vps", type: "address" },
            {
                name: "_genesisPoolAddress",
                type: "address",
            },
            { name: "_rewardPoolAddress", type: "address" },
            { name: "_donationPoolAddress", type: "address" },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, name: "claimer", type: "address" },
            {
                indexed: false,
                name: "owner",
                type: "address",
            },
            { indexed: false, name: "amount", type: "uint256" },
            { indexed: false, name: "viewID", type: "uint256" },
        ],
        name: "Claim",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, name: "height", type: "uint256" },
            {
                indexed: false,
                name: "incremetnalSupply",
                type: "uint256",
            },
        ],
        name: "Decay",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: "viewID", type: "uint256" }],
        name: "UpdateView",
        type: "event",
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    {
        anonymous: false,
        inputs: [],
        name: "Unpause",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "previousOwner", type: "address" },
            {
                indexed: true,
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            {
                indexed: true,
                name: "spender",
                type: "address",
            },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            {
                indexed: true,
                name: "to",
                type: "address",
            },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        constant: false,
        inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_addedValue", type: "uint256" },
        ],
        name: "increaseApproval",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_subtractedValue", type: "uint256" },
        ],
        name: "decreaseApproval",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "_newRewardPool", type: "address" }],
        name: "setRewardPoolAddress",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "_newDonationPool", type: "address" }],
        name: "setDonationPoolAddress",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "_newVPS", type: "address" }],
        name: "setVPS",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "cycle",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "stakingPoolSize",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "rewardPoolSize",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "donationPoolSize",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "incrementalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decayedIncrementalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "updateCycle",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "owner", type: "address" }],
        name: "claimableAmount",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "claim",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "owner", type: "address" },
            { name: "signature", type: "bytes" },
            { name: "nonce", type: "uint256" },
        ],
        name: "claimAs",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "amount", type: "uint256" }],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const BID_ABI = [
    {
        constant: true,
        inputs: [],
        name: "round",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
        ],
        name: "removeAddressesFromWhitelist",
        outputs: [
            {
                name: "success",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "removeAddressFromWhitelist",
        outputs: [
            {
                name: "success",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "paused",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "nextBidToSettle",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
        ],
        name: "addAddressToWhitelist",
        outputs: [
            {
                name: "success",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "address",
            },
        ],
        name: "whitelist",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addrs",
                type: "address[]",
            },
        ],
        name: "addAddressesToWhitelist",
        outputs: [
            {
                name: "success",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                name: "_vitaTokenAddress",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "round",
                type: "uint256",
            },
            {
                indexed: false,
                name: "claimedAmount",
                type: "uint256",
            },
            {
                indexed: false,
                name: "burnedAmount",
                type: "uint256",
            },
        ],
        name: "NewRound",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "round",
                type: "uint256",
            },
            {
                indexed: true,
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                name: "collateral",
                type: "uint256",
            },
        ],
        name: "VitaBidden",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "round",
                type: "uint256",
            },
            {
                indexed: true,
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                name: "collateral",
                type: "uint256",
            },
            {
                indexed: false,
                name: "vita",
                type: "uint256",
            },
        ],
        name: "VitaBought",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "finished",
                type: "bool",
            },
        ],
        name: "VitaBidsSettled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                name: "collateral",
                type: "uint256",
            },
        ],
        name: "CollateralWithdrawn",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "Pause",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [],
        name: "Unpause",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "addr",
                type: "address",
            },
        ],
        name: "WhitelistedAddressAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "addr",
                type: "address",
            },
        ],
        name: "WhitelistedAddressRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        constant: true,
        inputs: [
            {
                name: "_round",
                type: "uint256",
            },
        ],
        name: "getTotalBidsValue",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "_round",
                type: "uint256",
            },
        ],
        name: "getAvailableVitaValue",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "_round",
                type: "uint256",
            },
        ],
        name: "getNumBids",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "_round",
                type: "uint256",
            },
            {
                name: "_address",
                type: "address",
            },
        ],
        name: "getBid",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "bid",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_count",
                type: "uint256",
            },
        ],
        name: "settle",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "reset",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_receiver",
                type: "address",
            },
            {
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "transferCollateral",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "pause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "unpause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];


/***/ }),

/***/ "./src/common/store/base.ts":
/*!**********************************!*\
  !*** ./src/common/store/base.ts ***!
  \**********************************/
/*! exports provided: BaseStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseStore", function() { return BaseStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_remotedev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-remotedev */ "mobx-remotedev");
/* harmony import */ var mobx_remotedev__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_remotedev__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let BaseStore = class BaseStore {
    constructor() {
        this.NODE_ENV = "";
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    __metadata("design:type", Object)
], BaseStore.prototype, "NODE_ENV", void 0);
BaseStore = __decorate([
    mobx_remotedev__WEBPACK_IMPORTED_MODULE_1___default()({ name: "base" })
], BaseStore);



/***/ }),

/***/ "./src/common/store/index.ts":
/*!***********************************!*\
  !*** ./src/common/store/index.ts ***!
  \***********************************/
/*! exports provided: createRootStore, getRootStore, rootStore, StoresContext, useStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRootStore", function() { return createRootStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRootStore", function() { return getRootStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootStore", function() { return rootStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoresContext", function() { return StoresContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStore", function() { return useStore; });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index */ "./src/common/utils/index.ts");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "mobx-react");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mobx_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base */ "./src/common/store/base.ts");
/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lang */ "./src/common/store/lang.ts");
/* harmony import */ var _wallet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./wallet */ "./src/common/store/wallet.ts");







if (_utils_index__WEBPACK_IMPORTED_MODULE_0__["utils"].env.isSSR()) {
    Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["useStaticRendering"])(true);
}
const createRootStore = () => {
    return {
        base: new _base__WEBPACK_IMPORTED_MODULE_4__["BaseStore"](),
        lang: new _lang__WEBPACK_IMPORTED_MODULE_5__["LangStore"](),
        wallet: new _wallet__WEBPACK_IMPORTED_MODULE_6__["WalletStore"](),
    };
};
function getRootStore() {
    if (_utils_index__WEBPACK_IMPORTED_MODULE_0__["utils"].env.isSSR()) {
        return createRootStore();
    }
    const rootStore = createRootStore();
    Object.keys(rootStore).forEach((key) => {
        //@ts-ignore
        rootStore[key] = Object(mobx__WEBPACK_IMPORTED_MODULE_1__["extendObservable"])(rootStore[key], window.__ROOT__STORE__[key]);
    });
    return rootStore;
}
const rootStore = getRootStore();
const StoresContext = react__WEBPACK_IMPORTED_MODULE_3___default.a.createContext(rootStore);
const useStore = () => react__WEBPACK_IMPORTED_MODULE_3___default.a.useContext(StoresContext);


/***/ }),

/***/ "./src/common/store/lang.ts":
/*!**********************************!*\
  !*** ./src/common/store/lang.ts ***!
  \**********************************/
/*! exports provided: LangStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LangStore", function() { return LangStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_remotedev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-remotedev */ "mobx-remotedev");
/* harmony import */ var mobx_remotedev__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_remotedev__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _public_translations_en_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../public/translations/en.json */ "./public/translations/en.json");
var _public_translations_en_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../public/translations/en.json */ "./public/translations/en.json", 1);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let LangStore = class LangStore {
    constructor() {
        this.langPath = "/translations";
        this.lang = "en";
        this.translations = {
            en: _public_translations_en_json__WEBPACK_IMPORTED_MODULE_2__,
        };
    }
    get translation() {
        return this.translations[this.lang];
    }
    init() {
        const lang = localStorage.getItem("lang");
        this.setLang(lang || this.lang);
    }
    async setLang(lang) {
        await this.loadTranslation(lang);
        localStorage.setItem("lang", lang);
        this.lang = lang;
    }
    async loadTranslation(lang) {
        if (this.translations[lang]) {
            return;
        }
        const res = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(`${this.langPath}/${lang}.json`);
        if (res.data) {
            this.translations[lang] = res.data;
        }
    }
    t(str, data) {
        let processed = this.translation[str];
        if (!processed) {
            return str;
        }
        if (data) {
            Object.keys(data).forEach((key) => {
                processed = processed.replace(`\${${key}}`, data[key]);
            });
        }
        return processed;
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    __metadata("design:type", String)
], LangStore.prototype, "lang", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    __metadata("design:type", Object)
], LangStore.prototype, "translations", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["computed"],
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], LangStore.prototype, "translation", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LangStore.prototype, "init", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LangStore.prototype, "setLang", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LangStore.prototype, "loadTranslation", null);
LangStore = __decorate([
    mobx_remotedev__WEBPACK_IMPORTED_MODULE_1___default()({ name: "lang" })
], LangStore);



/***/ }),

/***/ "./src/common/store/wallet.ts":
/*!************************************!*\
  !*** ./src/common/store/wallet.ts ***!
  \************************************/
/*! exports provided: WalletStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletStore", function() { return WalletStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_remotedev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-remotedev */ "mobx-remotedev");
/* harmony import */ var mobx_remotedev__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mobx_remotedev__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_antanna__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/antanna */ "./src/common/utils/antanna.ts");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index */ "./src/common/utils/index.ts");
/* harmony import */ var iotex_antenna_lib_account_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! iotex-antenna/lib/account/utils */ "iotex-antenna/lib/account/utils");
/* harmony import */ var iotex_antenna_lib_account_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(iotex_antenna_lib_account_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_abi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/abi */ "./src/common/constants/abi.ts");
/* harmony import */ var iotex_antenna_lib_contract_contract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iotex-antenna/lib/contract/contract */ "iotex-antenna/lib/contract/contract");
/* harmony import */ var iotex_antenna_lib_contract_contract__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(iotex_antenna_lib_contract_contract__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_eventBus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/eventBus */ "./src/common/utils/eventBus.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index */ "./src/common/store/index.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











let WalletStore = class WalletStore {
    constructor() {
        this.account = {
            address: "",
            balance: "",
        };
        this.actionHash = "";
        this.isConnectWsError = false;
    }
    async init() {
        this.initEvent();
        await this.initWS();
    }
    connectWallet() {
        this.initWS();
        if (!this.account.address || this.isConnectWsError) {
            const title = _index__WEBPACK_IMPORTED_MODULE_9__["rootStore"].lang.t(_utils_index__WEBPACK_IMPORTED_MODULE_3__["utils"].env.isIoPayMobile() ? "tips.connect_fail.mobile" : "tips.connect_fail");
            const modal = antd__WEBPACK_IMPORTED_MODULE_10__["Modal"].warning({
                onOk: () => modal.destroy(),
                title,
            });
            setTimeout(() => {
                modal.destroy();
            }, 5000);
        }
    }
    initEvent() {
        _utils_index__WEBPACK_IMPORTED_MODULE_3__["utils"].eventBus
            .on("client.iopay.connected", () => {
            console.log("iopay-desktop connected.");
            this.isConnectWsError = false;
        })
            .on("client.iopay.close", () => {
            this.account = { address: "", balance: "" };
        })
            .on("client.iopay.connectError", () => {
            this.account = { address: "", balance: "" };
            this.isConnectWsError = true;
        });
    }
    async initWS() {
        const [err, address] = await _utils_index__WEBPACK_IMPORTED_MODULE_3__["utils"].helper.promise.runAsync(_utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].getIoPayAddress());
        if (err || !address) {
            return setTimeout(() => {
                this.initWS();
            }, 2000);
        }
        this.account.address = address;
        this.loadAccount();
        setTimeout(() => {
            _utils_eventBus__WEBPACK_IMPORTED_MODULE_8__["eventBus"].emit("client.wallet.onAccount");
        }, 500);
    }
    async loadAccount() {
        if (!this.account.address)
            return;
        const data = await _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].getAntenna().iotx.getAccount({ address: this.account.address });
        if (data === null || data === void 0 ? void 0 : data.accountMeta) {
            const { balance } = data === null || data === void 0 ? void 0 : data.accountMeta;
            this.account.balance = Object(iotex_antenna_lib_account_utils__WEBPACK_IMPORTED_MODULE_4__["fromRau"])(balance, "iotx");
            _utils_eventBus__WEBPACK_IMPORTED_MODULE_8__["eventBus"].emit("client.wallet.iotx.onBalance");
        }
    }
    async claimVita() {
        try {
            const contract = new iotex_antenna_lib_contract_contract__WEBPACK_IMPORTED_MODULE_6__["Contract"](_constants_abi__WEBPACK_IMPORTED_MODULE_5__["CLAIM_ABI"], "io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw", {
                provider: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx,
                signer: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx.signer,
            });
            const actionData = await contract.methods.claim({
                // @ts-ignore
                account: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx.accounts[0],
                ..._utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].defaultContractOptions,
            });
            this.actionHash = actionData.actionHash;
        }
        catch (e) {
            window.console.log(`failed to claim vita: ${e}`);
        }
    }
    async transferVita() {
        try {
            const contract = new iotex_antenna_lib_contract_contract__WEBPACK_IMPORTED_MODULE_6__["Contract"](_constants_abi__WEBPACK_IMPORTED_MODULE_5__["CLAIM_ABI"], "io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw", {
                provider: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx,
                signer: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx.signer,
            });
            const decimals = await contract.methods.decimals({
                // @ts-ignore
                account: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx.accounts[0],
                ..._utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].defaultContractOptions,
            });
            const tokenAmount = new bignumber_js__WEBPACK_IMPORTED_MODULE_7___default.a(1).multipliedBy(new bignumber_js__WEBPACK_IMPORTED_MODULE_7___default.a(`1e${decimals.toNumber()}`));
            const actionData = await contract.methods.transfer(this.account.address, tokenAmount.toString(), {
                // @ts-ignore
                account: _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx.accounts[0],
                ..._utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].defaultContractOptions,
            });
            this.actionHash = actionData.actionHash;
        }
        catch (e) {
            window.console.log(`failed to transfer vita: ${e}`);
        }
    }
    async transferIotx() {
        try {
            const actionData = await _utils_antanna__WEBPACK_IMPORTED_MODULE_2__["AntennaUtils"].antenna.iotx.sendTransfer({
                to: this.account.address,
                from: this.account.address,
                value: Object(iotex_antenna_lib_account_utils__WEBPACK_IMPORTED_MODULE_4__["toRau"])("1", "Iotx"),
                gasLimit: "100000",
                gasPrice: Object(iotex_antenna_lib_account_utils__WEBPACK_IMPORTED_MODULE_4__["toRau"])("1", "Qev"),
            });
            // @ts-ignore
            this.actionHash = actionData.actionHash;
        }
        catch (e) {
            window.console.log(`failed to transfer iotx: ${e}`);
        }
    }
};
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    __metadata("design:type", Object)
], WalletStore.prototype, "account", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    __metadata("design:type", Object)
], WalletStore.prototype, "actionHash", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["observable"],
    __metadata("design:type", Object)
], WalletStore.prototype, "isConnectWsError", void 0);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletStore.prototype, "init", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletStore.prototype, "connectWallet", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletStore.prototype, "initWS", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletStore.prototype, "loadAccount", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletStore.prototype, "claimVita", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletStore.prototype, "transferVita", null);
__decorate([
    mobx__WEBPACK_IMPORTED_MODULE_0__["action"].bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletStore.prototype, "transferIotx", null);
WalletStore = __decorate([
    mobx_remotedev__WEBPACK_IMPORTED_MODULE_1___default()({ name: "wallet" })
], WalletStore);



/***/ }),

/***/ "./src/common/utils/antanna.ts":
/*!*************************************!*\
  !*** ./src/common/utils/antanna.ts ***!
  \*************************************/
/*! exports provided: AntennaUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AntennaUtils", function() { return AntennaUtils; });
/* harmony import */ var iotex_antenna__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iotex-antenna */ "iotex-antenna");
/* harmony import */ var iotex_antenna__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(iotex_antenna__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ws_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ws-plugin */ "./src/common/utils/ws-plugin.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/common/utils/index.ts");
/* harmony import */ var _configs_public__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../configs/public */ "./configs/public.ts");
/* harmony import */ var _js_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js-plugin */ "./src/common/utils/js-plugin.ts");





class AntennaUtils {
    static get account() {
        var _a, _b;
        return (_b = (_a = this.antenna) === null || _a === void 0 ? void 0 : _a.iotx) === null || _b === void 0 ? void 0 : _b.accounts[0];
    }
    static getAntenna() {
        if (this.antenna) {
            return this.antenna;
        }
        if (_index__WEBPACK_IMPORTED_MODULE_2__["utils"].env.isBrowser() && !_index__WEBPACK_IMPORTED_MODULE_2__["utils"].env.isIoPayMobile()) {
            this.wsSigner = new _ws_plugin__WEBPACK_IMPORTED_MODULE_1__["WsSignerPlugin"]({
                options: {
                    packMessage: (data) => JSON.stringify(data),
                    //@ts-ignore
                    unpackMessage: (data) => JSON.parse(data),
                    attachRequestId: (data, requestId) => Object.assign({ reqId: requestId }, data),
                    extractRequestId: (data) => data && data.reqId,
                },
            });
            const antenna = new iotex_antenna__WEBPACK_IMPORTED_MODULE_0___default.a(_configs_public__WEBPACK_IMPORTED_MODULE_3__["publicConfig"].IOTEX_CORE_ENDPOPINT, {
                signer: this.wsSigner.start(),
            });
            //@ts-ignore
            this.antenna = antenna;
            return antenna;
        }
        if (_index__WEBPACK_IMPORTED_MODULE_2__["utils"].env.isIoPayMobile()) {
            this.jsSigner = new _js_plugin__WEBPACK_IMPORTED_MODULE_4__["JsBridgeSignerMobile"]();
            const antenna = new iotex_antenna__WEBPACK_IMPORTED_MODULE_0___default.a(_configs_public__WEBPACK_IMPORTED_MODULE_3__["publicConfig"].IOTEX_CORE_ENDPOPINT, {
                signer: this.jsSigner,
            });
            //@ts-ignore
            this.antenna = antenna;
            return antenna;
        }
        if (_index__WEBPACK_IMPORTED_MODULE_2__["utils"].env.isSSR()) {
            const antenna = new iotex_antenna__WEBPACK_IMPORTED_MODULE_0___default.a(_configs_public__WEBPACK_IMPORTED_MODULE_3__["publicConfig"].IOTEX_CORE_ENDPOPINT);
            //@ts-ignore
            this.antenna = antenna;
            return antenna;
        }
    }
    static async getIoPayAddress() {
        if (!AntennaUtils.antenna) {
            AntennaUtils.antenna = AntennaUtils.getAntenna();
        }
        if (_index__WEBPACK_IMPORTED_MODULE_2__["utils"].env.isIoPayMobile()) {
            const address = await AntennaUtils.jsSigner.getIoAddressFromIoPay();
            AntennaUtils.antenna.iotx.accounts[0] = await AntennaUtils.jsSigner.getAccount(address);
            return address;
        }
        if (_index__WEBPACK_IMPORTED_MODULE_2__["utils"].env.isBrowser()) {
            const accounts = await AntennaUtils.wsSigner.getAccounts();
            if (accounts[0]) {
                AntennaUtils.antenna.iotx.accounts[0] = await AntennaUtils.wsSigner.getAccount(accounts[0].address);
            }
            return (accounts && accounts[0] && accounts[0].address) || "";
        }
    }
    static async getIotxBalance(address) {
        const antenna = AntennaUtils.getAntenna();
        const { accountMeta } = await antenna.iotx.getAccount({ address });
        // @ts-ignore
        return Number(fromRau(accountMeta.balance, "Iotx"));
    }
    static async signMessage(message) {
        const antenna = AntennaUtils.getAntenna();
        if (antenna.iotx.signer && antenna.iotx.signer.signMessage) {
            const signed = await antenna.iotx.signer.signMessage(message);
            if (typeof signed === "object") {
                return Buffer.from(signed).toString("hex");
            }
            return signed;
        }
        const account = antenna.iotx.accounts[0];
        const sig = account && (await account.sign(message));
        return (sig && sig.toString("hex")) || "";
    }
}
AntennaUtils.defaultContractOptions = {
    gasLimit: "20000000",
    gasPrice: "1000000000000",
};
AntennaUtils.antenna = null;
AntennaUtils.wsSigner = null;
AntennaUtils.jsSigner = null;


/***/ }),

/***/ "./src/common/utils/env.ts":
/*!*********************************!*\
  !*** ./src/common/utils/env.ts ***!
  \*********************************/
/*! exports provided: Env */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Env", function() { return Env; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/common/utils/index.ts");

class Env {
    isSSR() {
        return typeof window === "undefined";
    }
    onSSR(func) {
        if (this.isSSR()) {
            func();
        }
    }
    isBrowser() {
        return typeof window === "object";
    }
    onBrowser(func) {
        if (this.isBrowser()) {
            func();
        }
    }
    getEnv() {
        if (this.isBrowser()) {
            //@ts-ignore
            return window.__ROOT__STORE__.base;
        }
        if (this.isSSR()) {
            return process.env;
        }
    }
    isIoPayMobile() {
        if (_index__WEBPACK_IMPORTED_MODULE_0__["utils"].env.isSSR())
            return false;
        return navigator.userAgent && (navigator.userAgent.includes("IoPayAndroid") || navigator.userAgent.includes("IoPayiOs"));
    }
    getBoolean(val) {
        if (typeof val == "string") {
            return val == "true";
        }
        else if (typeof val == "boolean") {
            return val;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/common/utils/eventBus.ts":
/*!**************************************!*\
  !*** ./src/common/utils/eventBus.ts ***!
  \**************************************/
/*! exports provided: eventBus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return eventBus; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);

const eventBus = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();


/***/ }),

/***/ "./src/common/utils/helper.ts":
/*!************************************!*\
  !*** ./src/common/utils/helper.ts ***!
  \************************************/
/*! exports provided: helper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return helper; });
const helper = {
    promise: {
        async sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async runAsync(promise) {
            return promise
                .then((data) => [null, data])
                .catch((err) => [err, null]);
        },
    },
    string: {
        truncate(fullStr = "", strLen, separator = "") {
            if (fullStr.length <= strLen)
                return fullStr;
            separator = separator || "...";
            const sepLen = separator.length;
            const charsToShow = strLen - sepLen;
            const frontChars = Math.ceil(charsToShow / 2);
            const backChars = Math.floor(charsToShow / 2);
            return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
        },
    },
};


/***/ }),

/***/ "./src/common/utils/index.ts":
/*!***********************************!*\
  !*** ./src/common/utils/index.ts ***!
  \***********************************/
/*! exports provided: utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/common/utils/helper.ts");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env */ "./src/common/utils/env.ts");
/* harmony import */ var _eventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventBus */ "./src/common/utils/eventBus.ts");



const utils = {
    helper: _helper__WEBPACK_IMPORTED_MODULE_0__["helper"],
    env: new _env__WEBPACK_IMPORTED_MODULE_1__["Env"](),
    eventBus: _eventBus__WEBPACK_IMPORTED_MODULE_2__["eventBus"],
};


/***/ }),

/***/ "./src/common/utils/js-plugin.ts":
/*!***************************************!*\
  !*** ./src/common/utils/js-plugin.ts ***!
  \***************************************/
/*! exports provided: JsBridgeSignerMobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsBridgeSignerMobile", function() { return JsBridgeSignerMobile; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "buffer");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! global/document */ "global/document");
/* harmony import */ var global_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global_document__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! global/window */ "global/window");
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(global_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iotex-antenna/lib/account/account */ "iotex-antenna/lib/account/account");
/* harmony import */ var iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sleep_promise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sleep-promise */ "sleep-promise");
/* harmony import */ var sleep_promise__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sleep_promise__WEBPACK_IMPORTED_MODULE_4__);
//@flow

// @ts-ignore

// @ts-ignore



// tslint:disable-next-line:insecure-random
let reqId = Math.round(Math.random() * 10000);
class JsBridgeSignerMobile {
    constructor() {
        this.init();
        this.getAccounts();
    }
    setupWebViewJavascriptBridge(callback) {
        if (global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge) {
            return callback(global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge);
        }
        else {
            global_document__WEBPACK_IMPORTED_MODULE_1___default.a.addEventListener("WebViewJavascriptBridgeReady", () => {
                callback(global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge);
            }, false);
            if (global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WVJBCallbacks) {
                return global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WVJBCallbacks.push(callback);
            }
            global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WVJBCallbacks = [callback];
            const WVJBIframe = global_document__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("iframe");
            WVJBIframe.style.display = "none";
            WVJBIframe.src = "https://bridge-loaded";
            if (global_document__WEBPACK_IMPORTED_MODULE_1___default.a.documentElement) {
                global_document__WEBPACK_IMPORTED_MODULE_1___default.a.documentElement.appendChild(WVJBIframe);
                global_window__WEBPACK_IMPORTED_MODULE_2___default.a.setTimeout(() => {
                    if (global_document__WEBPACK_IMPORTED_MODULE_1___default.a.documentElement) {
                        global_document__WEBPACK_IMPORTED_MODULE_1___default.a.documentElement.removeChild(WVJBIframe);
                    }
                }, 0);
            }
        }
    }
    init() {
        // tslint:disable-next-line:no-any
        this.setupWebViewJavascriptBridge((bridge) => {
            try {
                bridge.init((message, responseCallback) => {
                    global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("JS got a message", message);
                    const data = {
                        "Javascript Responds": "测试中文!",
                    };
                    global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("JS responding with", data.toString());
                    responseCallback(data);
                });
            }
            catch (e) {
                global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("data error from android: = ", e.toString());
            }
            bridge.registerHandler("signAndSendJsFunction", (data, responseCallback) => {
                global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("data from signAndSendJsFunction register handler: = ", String(data));
                responseCallback("responseData signAndSendJsFunction test");
            });
        });
    }
    async signAndSend(envelop) {
        const id = reqId++;
        const req = {
            reqId: id,
            envelop: buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(envelop.bytestream()).toString("hex"),
            type: "SIGN_AND_SEND",
        };
        return new Promise((resolve) => global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge.callHandler("sign_and_send", JSON.stringify(req), (responseData) => {
            let resp = { reqId: -1, actionHash: "" };
            try {
                resp = JSON.parse(responseData);
            }
            catch (_) {
                return;
            }
            if (resp.reqId === id) {
                resolve(resp.actionHash);
            }
        }));
    }
    // eslint-disable-next-line no-unused-vars
    async getAccount(address) {
        const account = new iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_3__["Account"]();
        account.address = address;
        global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("getAccount account ", account);
        return account;
    }
    async getAccounts() {
        const id = reqId++;
        const req = {
            reqId: id,
            type: "GET_ACCOUNTS",
        };
        global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log(JSON.stringify(req));
        // tslint:disable-next-line:promise-must-complete
        return new Promise(async (resolve) => {
            // tslint:disable-next-line:no-any
            global_window__WEBPACK_IMPORTED_MODULE_2___default.a.document.addEventListener("message", async (e) => {
                let resp = { reqId: -1, accounts: [] };
                try {
                    resp = JSON.parse(e.data);
                }
                catch (err) {
                    return;
                }
                global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log(resp);
                if (resp.reqId === id) {
                    resolve(resp.accounts);
                }
            });
        });
    }
    signMessage(message) {
        global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log(`signMessage start`);
        const id = reqId++;
        const req = {
            reqId: id,
            type: "SIGN",
            message,
        };
        return new Promise((resolve) => global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge.callHandler("sign", JSON.stringify(req), (responseData) => {
            global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("signMessage sign responseData: ", responseData);
            let resp = { reqId: -1, signature: new buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"]("") };
            try {
                resp = JSON.parse(responseData);
            }
            catch (e) {
                global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("signMessage: Error when parse responseData", e);
                return;
            }
            if (resp.reqId === id) {
                resolve(resp.signature);
            }
        }));
    }
    async getIoAddressFromIoPay() {
        global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("getIoAddressFromIoPay start");
        const id = reqId++;
        const req = {
            reqId: id,
            type: "GET_ACCOUNTS",
        };
        let sec = 1;
        // @ts-ignore
        while (!global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge) {
            global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("getIoAddressFromIoPay get_account sleepPromise sec: ", sec);
            await sleep_promise__WEBPACK_IMPORTED_MODULE_4___default()(sec * 200);
            sec = sec * 1.6;
            if (sec >= 48) {
                sec = 48;
            }
        }
        return new Promise((resolve) => 
        // @ts-ignore
        global_window__WEBPACK_IMPORTED_MODULE_2___default.a.WebViewJavascriptBridge.callHandler("get_account", JSON.stringify(req), (responseData) => {
            global_window__WEBPACK_IMPORTED_MODULE_2___default.a.console.log("getIoAddressFromIoPay get_account responseData: ", responseData);
            let resp = { reqId: -1, address: "" };
            try {
                resp = JSON.parse(responseData);
            }
            catch (_) {
                return;
            }
            if (resp.reqId === id) {
                resolve(resp.address);
            }
        }));
    }
}


/***/ }),

/***/ "./src/common/utils/ws-plugin.ts":
/*!***************************************!*\
  !*** ./src/common/utils/ws-plugin.ts ***!
  \***************************************/
/*! exports provided: WsSignerPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WsSignerPlugin", function() { return WsSignerPlugin; });
/* harmony import */ var websocket_as_promised__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! websocket-as-promised */ "websocket-as-promised");
/* harmony import */ var websocket_as_promised__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(websocket_as_promised__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iotex-antenna/lib/account/account */ "iotex-antenna/lib/account/account");
/* harmony import */ var iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/common/utils/index.ts");



class WsSignerPlugin {
    constructor({ provider = "wss://local.iotex.io:64102", options = { timeout: 5000 } }) {
        this.provider = provider;
        this.options = options;
    }
    start() {
        this.init();
        return this;
    }
    async init() {
        this.ws = new websocket_as_promised__WEBPACK_IMPORTED_MODULE_0___default.a(this.provider, this.options);
        this.ws.onOpen.addListener(() => {
            ___WEBPACK_IMPORTED_MODULE_2__["utils"].eventBus.emit("client.iopay.connected");
        });
        this.ws.onClose.addListener = () => {
            console.log("close");
            ___WEBPACK_IMPORTED_MODULE_2__["utils"].eventBus.emit("client.iopay.close");
        };
        this.ws.onError.addListener = () => {
            ___WEBPACK_IMPORTED_MODULE_2__["utils"].eventBus.emit("client.iopay.connectError");
        };
        await this.ws.open();
        return this;
    }
    async wait() {
        var _a, _b;
        while (!((_a = this.ws) === null || _a === void 0 ? void 0 : _a.isOpened)) {
            await ___WEBPACK_IMPORTED_MODULE_2__["utils"].helper.promise.sleep(500);
            if (!((_b = this.ws) === null || _b === void 0 ? void 0 : _b.isOpened))
                await this.init();
        }
        return Promise.resolve(true);
    }
    async signAndSend(envelop) {
        await this.wait();
        const envelopString = Buffer.from(envelop.bytestream()).toString("hex");
        const req = {
            envelop: envelopString,
            type: "SIGN_AND_SEND",
            origin: this.getOrigin(),
        };
        const res = await this.ws.sendRequest(req);
        return res.actionHash ? res.actionHash : res;
    }
    async getAccount(address) {
        const acct = new iotex_antenna_lib_account_account__WEBPACK_IMPORTED_MODULE_1__["Account"]();
        acct.address = address;
        return acct;
    }
    async getAccounts() {
        await this.wait();
        const req = {
            type: "GET_ACCOUNTS",
        };
        const res = await this.ws.sendRequest(req);
        return res.accounts;
    }
    getOrigin(plugin = "") {
        let origin = "";
        if (location !== undefined && location.hasOwnProperty("hostname") && location.hostname.length) {
            origin = location.hostname;
        }
        else {
            origin = plugin;
        }
        if (origin.substr(0, 4) === "www.") {
            origin = origin.replace("www.", "");
        }
        return origin;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: bootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bootstrap", function() { return bootstrap; });
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "reflect-metadata");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _server_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server/app.module */ "./src/server/app.module.ts");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _server_modules_wildcardAPI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./server/modules/wildcardAPI */ "./src/server/modules/wildcardAPI/index.ts");
/* harmony import */ var express_http_to_https__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! express-http-to-https */ "express-http-to-https");
/* harmony import */ var express_http_to_https__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(express_http_to_https__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _server_modules_ssr_ssr_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./server/modules/ssr/ssr.filter */ "./src/server/modules/ssr/ssr.filter.tsx");
/* harmony import */ var _wildcard_api_server_express__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wildcard-api/server/express */ "@wildcard-api/server/express");
/* harmony import */ var _wildcard_api_server_express__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wildcard_api_server_express__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _configs_public__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../configs/public */ "./configs/public.ts");











async function bootstrap() {
    const app = await _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_server_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"], {
        cors: true,
    });
    app.disable("x-powered-by");
    app.use(compression__WEBPACK_IMPORTED_MODULE_4___default()());
    if (_configs_public__WEBPACK_IMPORTED_MODULE_10__["publicConfig"].FORCE_HTTPS) {
        app.use(Object(express_http_to_https__WEBPACK_IMPORTED_MODULE_6__["redirectToHTTPS"])([/localhost:(\d{4})/], [/\/insecure/], 301));
    }
    app.useStaticAssets("/home/lince098/Escritorio/iotex-dapp-sample/public", {
        index: false,
        redirect: false,
    });
    app.useGlobalFilters(new _server_modules_ssr_ssr_filter__WEBPACK_IMPORTED_MODULE_7__["SSRFilter"]());
    app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_9___default()());
    app.use(_wildcard_api_server_express__WEBPACK_IMPORTED_MODULE_8___default()((req) => {
        return {
            req,
        };
    }));
    await app.listen("3000" || false, () => {
        _nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(`🚀server is runing on http://localhost:${"3000" || false}`);
    });
    if (true) {
        _nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("HMR Reloading ...");
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),

/***/ "./src/server/app.module.ts":
/*!**********************************!*\
  !*** ./src/server/app.module.ts ***!
  \**********************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_template_template_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/template/template.module */ "./src/server/modules/template/template.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Module"])({
        imports: [
            _nestjs_graphql__WEBPACK_IMPORTED_MODULE_1__["GraphQLModule"].forRoot({
                autoSchemaFile: "schema.gql",
                path: "/api-gateway",
                playground: {
                    settings: {
                        "request.credentials": "include",
                    },
                },
                context: ({ req }) => ({ req }),
            }),
            _modules_template_template_module__WEBPACK_IMPORTED_MODULE_2__["TemplateModule"],
        ],
        controllers: [],
        providers: [],
    })
], AppModule);



/***/ }),

/***/ "./src/server/modules/ssr/ssr.filter.tsx":
/*!***********************************************!*\
  !*** ./src/server/modules/ssr/ssr.filter.tsx ***!
  \***********************************************/
/*! exports provided: SSRFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SSRFilter", function() { return SSRFilter; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../client/App */ "./src/client/App.tsx");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _configs_public__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../configs/public */ "./configs/public.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");
const scripts = Object.keys(assets)
    .reduce((files, key) => {
    var _a;
    const js = (_a = assets[key]) === null || _a === void 0 ? void 0 : _a.js;
    if (Array.isArray(js)) {
        files = [...files, ...js];
    }
    if (typeof js == "string") {
        files.push(js);
    }
    return files;
}, [])
    .reduce((script, file) => {
    return script + `<script src="${file}" defer crossorigin></script>`;
}, "");
const css = Object.keys(assets).reduce((script, key) => {
    var _a;
    if (!((_a = assets[key]) === null || _a === void 0 ? void 0 : _a.css))
        return script;
    return script + `<link rel="stylesheet" href="${assets[key].css}"></link>`;
}, "");
let SSRFilter = class SSRFilter {
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const rootStore = {
            base: {
                ..._configs_public__WEBPACK_IMPORTED_MODULE_5__["publicConfig"],
            },
        };
        const context = {};
        const markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["StaticRouter"], { context: context, location: req.url },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_client_App__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
        res.send(`<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>My Awesome IoTeX dApp!!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script>
        window.__ROOT__STORE__ = ${JSON.stringify(rootStore)};
      </script>
      <link rel="stylesheet" href="/tailwind.css">
      ${css}
      ${scripts}
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
  </html>`);
    }
};
SSRFilter = __decorate([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Catch"])(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["NotFoundException"])
], SSRFilter);



/***/ }),

/***/ "./src/server/modules/template/template.controller.ts":
/*!************************************************************!*\
  !*** ./src/server/modules/template/template.controller.ts ***!
  \************************************************************/
/*! exports provided: TemplateController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateController", function() { return TemplateController; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let TemplateController = class TemplateController {
    test() {
        return "ok";
    }
};
__decorate([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Get"])("/test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemplateController.prototype, "test", null);
TemplateController = __decorate([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Controller"])()
], TemplateController);



/***/ }),

/***/ "./src/server/modules/template/template.module.ts":
/*!********************************************************!*\
  !*** ./src/server/modules/template/template.module.ts ***!
  \********************************************************/
/*! exports provided: TemplateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateModule", function() { return TemplateModule; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _template_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.controller */ "./src/server/modules/template/template.controller.ts");
/* harmony import */ var _template_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template.resolver */ "./src/server/modules/template/template.resolver.ts");
/* harmony import */ var _template_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template.service */ "./src/server/modules/template/template.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let TemplateModule = class TemplateModule {
};
TemplateModule = __decorate([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Module"])({
        controllers: [_template_controller__WEBPACK_IMPORTED_MODULE_1__["TemplateController"]],
        providers: [_template_resolver__WEBPACK_IMPORTED_MODULE_2__["TemplateResolver"], _template_service__WEBPACK_IMPORTED_MODULE_3__["TemplateService"]],
        exports: [_template_service__WEBPACK_IMPORTED_MODULE_3__["TemplateService"]],
    })
], TemplateModule);



/***/ }),

/***/ "./src/server/modules/template/template.resolver.ts":
/*!**********************************************************!*\
  !*** ./src/server/modules/template/template.resolver.ts ***!
  \**********************************************************/
/*! exports provided: TemplateResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResolver", function() { return TemplateResolver; });
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
/* harmony import */ var _nestjs_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let TemplateResolver = class TemplateResolver {
    async hello() {
        return "Hello Graphql~";
    }
};
__decorate([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_0__["Query"])((_) => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemplateResolver.prototype, "hello", null);
TemplateResolver = __decorate([
    Object(_nestjs_graphql__WEBPACK_IMPORTED_MODULE_0__["Resolver"])("template")
], TemplateResolver);



/***/ }),

/***/ "./src/server/modules/template/template.service.ts":
/*!*********************************************************!*\
  !*** ./src/server/modules/template/template.service.ts ***!
  \*********************************************************/
/*! exports provided: TemplateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateService", function() { return TemplateService; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let TemplateService = class TemplateService {
    hello() {
        return "Hello Wordld~";
    }
};
TemplateService = __decorate([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
], TemplateService);



/***/ }),

/***/ "./src/server/modules/wildcardAPI/auth.endpoints.ts":
/*!**********************************************************!*\
  !*** ./src/server/modules/wildcardAPI/auth.endpoints.ts ***!
  \**********************************************************/
/*! exports provided: AuthAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthAPI", function() { return AuthAPI; });
/* harmony import */ var _auth_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.utils */ "./src/server/modules/wildcardAPI/auth.utils.ts");
/* harmony import */ var _configs_private__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../configs/private */ "./configs/private.ts");


const AuthAPI = {
    me: async function () {
        try {
            const { userId } = _auth_utils__WEBPACK_IMPORTED_MODULE_0__["authUtils"].getUser(this);
            return { ok: true, user: { userId } };
        }
        catch (error) {
            return { ok: false, error: error.message };
        }
    },
    login: async function (userId, password) {
        const ctx = this;
        const token = _auth_utils__WEBPACK_IMPORTED_MODULE_0__["authUtils"].signToken({ userId: userId });
        ctx.req.res.cookie("Authorization", token, _configs_private__WEBPACK_IMPORTED_MODULE_1__["privateConfig"].cookieOpts);
        return {
            token,
            user: {
                userId,
                password,
            },
        };
    },
    logout: async function () {
        const ctx = this;
        ctx.req.res.cookie("Authorization", "", _configs_private__WEBPACK_IMPORTED_MODULE_1__["privateConfig"].cookieOpts);
    },
};


/***/ }),

/***/ "./src/server/modules/wildcardAPI/auth.utils.ts":
/*!******************************************************!*\
  !*** ./src/server/modules/wildcardAPI/auth.utils.ts ***!
  \******************************************************/
/*! exports provided: authUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authUtils", function() { return authUtils; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configs_private__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../configs/private */ "./configs/private.ts");



const authUtils = {
    getUser(ctx) {
        const Authorization = ctx.req.get("Authorization") || ctx.req.cookies["Authorization"];
        if (!Authorization)
            throw new Error("no Authorization token");
        const token = Authorization.replace("Bearer ", "");
        const verifiedToken = Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["verify"])(token, _configs_private__WEBPACK_IMPORTED_MODULE_1__["privateConfig"].JWT_SECRET);
        if (!verifiedToken)
            throw new Error("Authorization falied");
        return verifiedToken;
    },
    signToken({ userId }) {
        return Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["sign"])({ userId }, _configs_private__WEBPACK_IMPORTED_MODULE_1__["privateConfig"].JWT_SECRET);
    },
};


/***/ }),

/***/ "./src/server/modules/wildcardAPI/index.ts":
/*!*************************************************!*\
  !*** ./src/server/modules/wildcardAPI/index.ts ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wildcard_api_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wildcard-api/server */ "@wildcard-api/server");
/* harmony import */ var _wildcard_api_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wildcard_api_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth_endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.endpoints */ "./src/server/modules/wildcardAPI/auth.endpoints.ts");


const endpoints = {
    hello,
    ..._auth_endpoints__WEBPACK_IMPORTED_MODULE_1__["AuthAPI"],
};
Object.assign(_wildcard_api_server__WEBPACK_IMPORTED_MODULE_0___default.a.endpoints, endpoints);
async function hello() {
    return "Hello World!";
}


/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! /home/lince098/Escritorio/iotex-dapp-sample/src */"./src/index.ts");


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@stitches/react":
/*!**********************************!*\
  !*** external "@stitches/react" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@stitches/react");

/***/ }),

/***/ "@wildcard-api/client":
/*!***************************************!*\
  !*** external "@wildcard-api/client" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@wildcard-api/client");

/***/ }),

/***/ "@wildcard-api/server":
/*!***************************************!*\
  !*** external "@wildcard-api/server" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@wildcard-api/server");

/***/ }),

/***/ "@wildcard-api/server/express":
/*!***********************************************!*\
  !*** external "@wildcard-api/server/express" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@wildcard-api/server/express");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bignumber.js":
/*!*******************************!*\
  !*** external "bignumber.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "express-http-to-https":
/*!****************************************!*\
  !*** external "express-http-to-https" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-http-to-https");

/***/ }),

/***/ "global/document":
/*!**********************************!*\
  !*** external "global/document" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("global/document");

/***/ }),

/***/ "global/window":
/*!********************************!*\
  !*** external "global/window" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("global/window");

/***/ }),

/***/ "iotex-antenna":
/*!********************************!*\
  !*** external "iotex-antenna" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iotex-antenna");

/***/ }),

/***/ "iotex-antenna/lib/account/account":
/*!****************************************************!*\
  !*** external "iotex-antenna/lib/account/account" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iotex-antenna/lib/account/account");

/***/ }),

/***/ "iotex-antenna/lib/account/utils":
/*!**************************************************!*\
  !*** external "iotex-antenna/lib/account/utils" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iotex-antenna/lib/account/utils");

/***/ }),

/***/ "iotex-antenna/lib/contract/contract":
/*!******************************************************!*\
  !*** external "iotex-antenna/lib/contract/contract" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iotex-antenna/lib/contract/contract");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mobx":
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),

/***/ "mobx-react":
/*!*****************************!*\
  !*** external "mobx-react" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),

/***/ "mobx-react-lite":
/*!**********************************!*\
  !*** external "mobx-react-lite" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobx-react-lite");

/***/ }),

/***/ "mobx-remotedev":
/*!*********************************!*\
  !*** external "mobx-remotedev" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobx-remotedev");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "sleep-promise":
/*!********************************!*\
  !*** external "sleep-promise" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sleep-promise");

/***/ }),

/***/ "websocket-as-promised":
/*!****************************************!*\
  !*** external "websocket-as-promised" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("websocket-as-promised");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map