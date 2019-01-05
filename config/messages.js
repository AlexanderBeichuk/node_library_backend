const CRUDL = {
	create: 'create',
	get: 'get',
	update: 'update',
	delete: 'delete',
	getList: 'get list'
};

const entities = {
	book: 'book'
};

const capitalizeTextTransform = (text) => {
   return text.charAt(0).toUpperCase() + text.slice(1);
};

const getFailedMessage = (event) => {
	return event ? `Failed to ${event}. Error:` : `Error.`;
};

const getSuccessMessage = (event) => {
	return event ? `${capitalizeTextTransform(event)}d successfully.` : `Successfully.`
};

const getNotFoundMessage = (entity) => {
	return entity ? capitalizeTextTransform(entity) : 'Could' + ' not found.';
};

module.exports = {
	error: {
		FAILED_LOAD_LIST: getFailedMessage(CRUDL.getList),
		FAILED_CREATE: getFailedMessage(CRUDL.create),
		FAILED_DELETE: getFailedMessage(CRUDL.delete),
      FAILED_UPDATE: getFailedMessage(CRUDL.update),
      FAILED_GET: getFailedMessage(CRUDL.get),
		FAILED: 'Error.',
		NOT_FOUND_BOOK: getNotFoundMessage(entities.book)
	},
	success: {
		ADDED: getSuccessMessage(CRUDL.create),
      DELETED: getSuccessMessage(CRUDL.delete),
      UPDATED: getSuccessMessage(CRUDL.update),
		SUCCESS: 'Success.'
	}
};
