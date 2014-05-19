/*
 * JOQUERY 1.0.0
 * import utils.js
 */
perfmjs.plugin('joquery', function($$) {
	$$.base("base.joquery", {
		init: function() {
			if (arguments === undefined) return this;
			//copy传进来的入参数组
			this.items = arguments[0].slice();
			return this;
		},
        version: "1.0.0",
        toArray: function() {return this.items;},
        where: function(clause) {
            var newArray = new Array();
            // The clause was passed in as a Method that return a Boolean
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {
                    newArray[newArray.length] = this.items[index];
                }
            }
            return new $$.joquery(false).init(newArray);
        },
        select: function(clause) {
            var newArray = new Array();
            // The clause was passed in as a Method that returns a Value
            for (var i = 0; i < this.items.length; i++) {
                if (clause(this.items[i])) {
                    newArray[newArray.length] = this.items[i];
                }
            }
            return new $$.joquery(false).init(newArray);
        },
        orderBy: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new $$.joquery(false).init(
	            tempArray.sort(function(a, b) {
	                var x = clause(a);
	                var y = clause(b);
	                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	            })
            );
        },
        orderByDescending: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new $$.joquery(false).init(
	            tempArray.sort(function(a, b) {
	                var x = clause(b);
	                var y = clause(a);
	                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	            })
            );
        },
        selectMany: function(clause) {
            var r = new Array();
            for (var i = 0; i < this.items.length; i++) {
                r = r.concat(clause(this.items[i]));
            }
            return new $$.joquery(false).init(r);
        },
        count: function(clause) {
            if (clause == null)
                return this.items.length;
            else
                return this.where(clause).items.length;
        },
        distinct: function(clause) {
            var item;
            var dict = new Object();
            var retVal = new Array();
            for (var i = 0; i < this.items.length; i++) {
                item = clause(this.items[i]);
                // TODO - This doens't correctly compare Objects. Need to fix this
                if (dict[item] == null) {
                    dict[item] = true;
                    retVal[retVal.length] = item;
                }
            }
            dict = null;
            return new $$.joquery(false).init(retVal);
        },
        any: function(clause) {
        	var result = {'matched':false, 'index':-1, 'item': {}};
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {return {'matched':true, 'index':index, 'item': this.items[index]};}
            }
            return result;
        },
        all: function(clause) {
            for (var index = 0; index < this.items.length; index++) {
                if (!clause(this.items[index], index)) { return false; }
            }
            return true;
        },
        reverse: function() {
            var retVal = new Array();
            for (var index = this.items.length - 1; index > -1; index--)
                retVal[retVal.length] = this.items[index];
            return new $$.joquery(false).init(retVal);
        },
        first: function(clause) {
            if (clause != null) {
                return this.where(clause).first();
            } else {
                // If no clause was specified, then return the first element in the Array
                if (this.items.length > 0)
                    return this.items[0];
                else
                    return null;
            }
        },
        last: function(clause) {
            if (clause != null) {
                return this.where(clause).last();
            } else {
                // If no clause was specified, then return the first element in the Array
                if (this.items.length > 0)
                    return this.items[this.items.length - 1];
                else
                    return null;
            }
        },
        elementAt: function(index) {
            return this.items[index];
        },
        concatArray: function(array) {
            var arr = array.items || array;
            return new $$.joquery(false).init(this.items.concat(arr));
        },
        intersect: function(secondArray, clause) {
            var clauseMethod;
            if (clause != undefined) {
                clauseMethod = clause;
            } else {
                clauseMethod = function(item, index, item2, index2) { return item == item2; };
            }

            var sa = secondArray.items || secondArray;

            var result = new Array();
            for (var a = 0; a < this.items.length; a++) {
                for (var b = 0; b < sa.length; b++) {
                    if (clauseMethod(this.items[a], a, sa[b], b)) {
                        result[result.length] = this.items[a];
                    }
                }
            }
            return new $$.joquery(false).init(result);
        },
        defaultIfEmpty: function(defaultValue) {
            if (this.items.length == 0) {
                return defaultValue;
            }
            return this;
        },
        elementAtOrDefault: function(index, defaultValue) {
            if (index >= 0 && index < this.items.length) {
                return this.items[index];
            }
            return defaultValue;
        },
        firstOrDefault: function(defaultValue) {
            return this.first() || defaultValue;
        },
        lastOrDefault: function(defaultValue) {
            return this.last() || defaultValue;
        },
        //将新元素插入到指定条件的位置,并返回插入的index等信息
        insert: function(item, clause) {
         	var result = {'matched':false, 'index':-1, 'item': {}};
         	if (this.items.length < 1) {
         		this.items.splice(0, 0, item);
         		return {'matched':true, 'index':0, 'item': item}; 
         	}
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {
                	this.items.splice(index, 0, item);
                	return {'matched':true, 'index':index, 'item': item}; 
                }
            }
            if (!result.matched) {
            	this.items[this.items.length] = item;
            	return {'matched':true, 'index':this.items.length - 1, 'item': item};  
            }
            return result;       	
        },
        //将新元素插入/修改到指定条件的位置,并返回插入/修改的元素的index等信息,如修改条件满足则只进行修改操作
        updateOrInsert: function(item, updateClause, insertClause) {
         	var result = {'matched':false, 'index':-1, 'item': {}};
         	if (this.items.length < 1) {
         		this.items.splice(0, 0, item);
         		return {'matched':true, 'index':0, 'item': item}; 
         	}
            for (var index = 0; index < this.items.length; index++) {
                if (updateClause != undefined && updateClause(this.items[index], index)) {
                	this.items[index] = item;
                	return {'matched':true, 'index':index, 'item': item}; 
                } else if (insertClause(this.items[index], index)) {
                	this.items.splice(index, 0, item);
                	return {'matched':true, 'index':index, 'item': item}; 
                }
            }
            if (!result.matched) {
            	this.items[this.items.length] = item;
            	return {'matched':true, 'index':this.items.length - 1, 'item': item};  
            }
            return result;       	
        }
	}, $$.base.prototype, $$.base.defaults);
	$$.base.joquery.defaults = {
		scope: 'prototype',
		end: 0
	};
});
/*
SamplesData = [
   		    { ID: 1, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003] },
   		    { ID: 9, firstName: "Bernard", lastName: "Sutherland", BookIDs: [1001, 2002, 3003] },
   		    { ID: 20, firstName: "Kate", lastName: "Pinkerton", BookIDs: [4001, 3002, 2003] }
   		];
var sample = joquery.newInstance(SamplesData).updateOrInsert({ID: 0, firstName: "Chris", lastName: "Pearson", BookIDs: [1001, 1002, 1003]}, function(item){return item.ID == 9;}, function(item){return item.ID > 15;});
alert(perfmjs.json.toJSON(sample));
var sample2 = joquery.newInstance(SamplesData).where(function(item, index){return item.ID == 9;});
alert(perfmjs.json.toJSON(sample2.toArray()));*/