const CRUDL = {
	create: 'create',
	get: 'get',
	update: 'update',
	delete: 'delete',
	getList: 'get list'
};

const capitalizeTextTransform = (text) => {
   return text.charAt(0).toUpperCase() + text.slice(1);
};

const getFailedMessage = (event) => {
	return `Failed to ${event}. Error:`;
};

const getSuccessMessage = (event) => {
	return `${capitalizeTextTransform(event)}d successfully`
};

module.exports = {
	error: {
		FAILED_LOAD_LIST: getFailedMessage(CRUDL.getList),
		FAILED_CREATE: getFailedMessage(CRUDL.create),
		FAILED_DELETE: getFailedMessage(CRUDL.delete),
      FAILED_UPDATE: getFailedMessage(CRUDL.update),
      FAILED_GET: getFailedMessage(CRUDL.get),
		NOT_FOUND: 'Could not found',
      ERROR: 'ERROR'
	},
	success: {
		ADDED: getSuccessMessage(CRUDL.create),
      DELETED: getSuccessMessage(CRUDL.delete),
      UPDATED: getSuccessMessage(CRUDL.update),
      OK: 'OK'
	},
};
