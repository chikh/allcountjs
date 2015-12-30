var _ = require('lodash');

module.exports = function (entityDescriptionService, crudService) {
    var service = {};

    service.referenceValues = function (crudId, queryText, dependentFieldNameAndValue) {
        var referenceFieldName = entityDescriptionService.entityDescription(crudId).referenceNameExpression;
        var query = {textSearch: queryText};
        if (dependentFieldNameAndValue) {
            var filtering = {};
            filtering[dependentFieldNameAndValue.dependentFieldName] = dependentFieldNameAndValue.dependentFieldValue;
            query.filtering = filtering;
        }
        return crudService.strategyForCrudId(crudId).findAll(query).then(function (entities) {
            return entities.map(function (e) {
                return {id: e.id, name: e[referenceFieldName]};
            })
        });
    };

    service.referenceValueByEntityId = function (crudId, entityId) { //TODO doubling
        return crudService.referenceValueByEntityId(crudId, entityId);
    };

    service.resolveReferenceValues = function (crudId, entity) {
        return crudService.resolveReferenceValues(crudId, entity);
    };

    return service;
};