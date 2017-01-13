'use strict';

var BaseModel = require('./BaseModel');
var db = require('../database');

module.exports = BaseModel.extend({

	tableName: 'projects',

	defineSchema: function(table) {

		BaseModel.defineSchema.apply(this, arguments);

		table.increments('id');
		table.string('name');
		table.string('description');
		table.decimal('goal_amount', 16, 8);
		table.date('goal_due');
	}

});

// schema migrations to be run at the server startup. 'return' each db call, otherwise it's not executed
module.exports.queueSchemaChange(function(cb) {

	return db.schema.hasColumn('projects', 'goal_due').then(function(exists) {
		if (!exists) {
			return db.schema.table('projects', function(table) {
			  table.date('goal_due');
			});
		}
	}).then(function() {
		cb();
	})
	
});