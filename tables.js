var utils = require('./utils/utils').utils;
var fs = require('fs');
var rimraf = require('rimraf');

var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var _ = require('underscore');

const configFileName = 'jsonDB-config.json';

function createTable(options, callback) {
	var errorList = [];
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName + '.json';
			    fs.writeFile(filePath, '{}', function(err) {
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'Error while creating file',
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var configFilePath = basePath + utils.getFileSeparator() + configFileName;
        	        	var configFileObj;
        	        	try {
        					configFileObj = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
        					var currentDBConfigs = _.findWhere(configFileObj['databases'], {name: database});
        					currentDBConfigs['tables'].push(tableName);
				        	fs.writeFile(configFilePath, JSON.stringify(configFileObj), function(err) {
				        	    if(err) {
				        	        callback({
	                		       		status: REQUEST_CODES.FAIL,
	                		       		msg: 'Error while updating config file',
	                		       		error: err

	                		       });
	                		       return;
				        	    } else {
	    				            callback({
	    	        		       		status: REQUEST_CODES.SUCCESS,
	    	        		       		msg: 'table created successfully with table name ' + tableName
	    	        		       });
	    	        		       return;
				        	    }
				        	});
        				} catch (e) {
        	    			console.log('wating for file operation to be completed :::: ');
        	    			setTimeout(function() {
        	    				createTable(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}		        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function dropTable(options, callback) {
	var errorList = [];
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
			        	fs.unlink(tablePath, function (err) {            
							if (err) {                                                 
							  callback({
		          		       		status: REQUEST_CODES.FAIL,
		          		       		msg: 'error while droping table - ' + tableName,
		          		       		error: err

	          		       		});
	          		       		return;                                    
							} else {
								var configFilePath = basePath + utils.getFileSeparator() + configFileName;
								var configFileObj;
		        	        	try {
		        					configFileObj = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
									var currentDBConfigs = _.findWhere(configFileObj['databases'], {name: database});
									const index = currentDBConfigs['tables'].indexOf(tableName);
									if (index > -1) {
									  	currentDBConfigs['tables'].splice(index, 1);
				  			        	fs.writeFile(configFilePath, JSON.stringify(configFileObj), function(err) {
				  			        	    if(err) {
				  			        	        callback({
				                  		       		status: REQUEST_CODES.FAIL,
				                  		       		msg: 'Error while updating config file',
				                  		       		error: err

				                  		       });
				                  		       return;
				  			        	    } else {
				      				            callback({
				      	        		       		status: REQUEST_CODES.SUCCESS,
				      	        		       		msg: 'table dropped successfully with table name ' + tableName
				      	        		       });
				      	        		       return;
				  			        	    }
				  			        	});
									}
		        				} catch (e) {
		        	    			console.log('wating for file operation to be completed :::: ');
		        	    			setTimeout(function() {
		        	    				dropTable(options, function(resp) {
		        	    					callback(resp);
		        	    				})
		        	    			}, 1000);
		        	    			return;
		        	    		}								
							}                                                        
						});		        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function insertRecord(options, callback) {
	var errorList = [];
	var recordObj = options.record;
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordObj || undefined == recordObj || !Object.keys(recordObj).length) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'record')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var docId = utils.generateDocIdByTable(tablePath) + '';
						console.log('docId :: ', docId);
						recordObj['_ObjId'] = docId;
						tableObj[docId] = recordObj;
			        	fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
			        	    if(err) {
			        	        callback({
                		       		status: REQUEST_CODES.FAIL,
                		       		msg: 'Error while insert record into table',
                		       		error: err

                		       });
                		       return;
			        	    } else {
    				            callback({
    	        		       		status: REQUEST_CODES.SUCCESS,
    	        		       		msg: 'record inserted successfully with the documentId ' + docId
    	        		       });
    	        		       return;
			        	    }
			        	});															        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordById(options, callback) {
	var errorList = [];
	var recordId = options.recordId;
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordId) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'record')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var record  = tableObj[recordId];
			            callback({
        		       		status: REQUEST_CODES.SUCCESS,
        		       		result: record
        		       });
        		       return;														        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordByKeyValue(options, callback) {
	var errorList = [];
	var key = options.key;
	var value = options['value'];
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! key) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'key')
		};
		errorList.push(e);
	}
	if (! value) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'value')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var filter = {};
						filter[key] = value;
						var arrayObj = Object.values(tableObj);
						var records  = _.where(arrayObj, filter);
			            callback({
        		       		status: REQUEST_CODES.SUCCESS,
        		       		result: records
        		       });
        		       return;														        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordByObject(options, callback) {
	var errorList = [];
	var obj = options.obj;
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! obj || undefined == obj || !Object.keys(obj).length) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'obj')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var filter = {};
						var arrayObj = Object.values(tableObj);
						Object.keys(obj).forEach(function(key) {
							filter[key] = obj[key];
						})
						var records  = _.where(arrayObj, filter);
			            callback({
        		       		status: REQUEST_CODES.SUCCESS,
        		       		result: records
        		       });
        		       return;														        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getAllRecords(options, callback) {
	var errorList = [];
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var filter = {};
						var arrayObj = Object.values(tableObj);
			            callback({
        		       		status: REQUEST_CODES.SUCCESS,
        		       		result: arrayObj
        		       });
        		       return;														        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function deleteRecordById(options, callback) {
	var errorList = [];
	var recordId = options.recordId;
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordId) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'record')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						delete tableObj[recordId];
			        	fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
			        	    if(err) {
			        	        callback({
                		       		status: REQUEST_CODES.FAIL,
                		       		msg: 'Error while deleting record from table',
                		       		error: err

                		       });
                		       return;
			        	    } else {
    				            callback({
    	        		       		status: REQUEST_CODES.SUCCESS,
    	        		       		msg: 'record deleted successfully with the recordId ' + recordId
    	        		       });
    	        		       return;
			        	    }
			        	});													        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function deleteRecordByKeyValue(options, callback) {
	var errorList = [];
	var key = options.key;
	var value = options['value'];
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! key) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'key')
		};
		errorList.push(e);
	}
	if (! value) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'value')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var filter = {};
						filter[key] = value;
						var arrayObj = Object.values(tableObj);
						var records  = _.where(arrayObj, filter);
						if (records && records.length) {
							let lastIndex = records.length;
							records.forEach(function(record) {
								delete tableObj[Object.keys(tableObj).find(key => tableObj[key] === record) + ''];
								lastIndex = lastIndex -1;
								if (lastIndex <= 0) {   
									fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
						        	    if(err) {
						        	        callback({
			                		       		status: REQUEST_CODES.FAIL,
			                		       		msg: 'Error while deleting record from table',
			                		       		error: err

			                		       });
			                		       return;
						        	    } else {
			    				            callback({
			    	        		       		status: REQUEST_CODES.SUCCESS,
			    	        		       		msg: 'Deleted records successfully, Total matched records :  ' + records.length 
			    	        		       });
			    	        		       return;
						        	    }
						        	});
								}
							});
						} else {
					            callback({
		        		       		status: REQUEST_CODES.SUCCESS,
		        		       		msg: 'No matching records found to delete with the given filter condition ' + JSON.stringify(filter)
		        		       });
		        		       return;
						}									            
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function updateRecordById(options, callback) {
	var errorList = [];
	var recordId = options.recordId;
	var recordObj = options.recordObj;
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordId) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'recordId')
		};
		errorList.push(e);
	}

	if (! recordObj || undefined == recordObj || !Object.keys(recordObj).length) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'recordObj')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		console.log(basePath);
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
						var record  = tableObj[recordId];
						var keys = Object.keys(recordObj);
						var lastIndex = keys.length;
						keys.forEach(function(key) {
							lastIndex = lastIndex - 1;
							record[key] = recordObj[key];
							if (lastIndex <= 0) {
								tableObj[recordId] = record;
								fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
					        	    if(err) {
					        	        callback({
		                		       		status: REQUEST_CODES.FAIL,
		                		       		msg: 'Error while updating record',
		                		       		error: err

		                		       });
		                		       return;
					        	    } else {
		    				            callback({
		    	        		       		status: REQUEST_CODES.SUCCESS,
		    	        		       		msg: 'record updated successfully'
		    	        		       });
		    	        		       return;
					        	    }
					        	});
							}
						});
						//Object.keys(recordObj).find(key => record[key] = recordObj.key);																				        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

module.exports.createTable = createTable;
module.exports.dropTable = dropTable;

module.exports.insertRecord = insertRecord;
module.exports.deleteRecordById = deleteRecordById;
module.exports.deleteRecordByKeyValue = deleteRecordByKeyValue;

module.exports.getRecordById = getRecordById;
module.exports.getRecordByKeyValue = getRecordByKeyValue;
module.exports.getRecordByObject = getRecordByObject;
module.exports.getAllRecords = getAllRecords;

module.exports.updateRecordById = updateRecordById;