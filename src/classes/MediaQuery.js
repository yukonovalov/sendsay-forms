export class MediaQuery {

    constructor(data, options) {
        this.data = data;
        this.options = options;
        this.makeStyle(data);
    }

    makeStyle(data) {
    	let content = '',
    		conditions = this.data.conditions,
    		selectors = this.data.selectors;
    	content += this.makeMediaCondition(conditions) + '{';
    	for(let key in selectors) {
    		let rules = selectors[key];
    		content += this.makeSelectorRule(key, rules);
    	}
    	content += ' }';

    	let styleEl = document.createElement('style');
    	styleEl.type = 'text/css';
    	if (styleEl.styleSheet){
		  styleEl.styleSheet.cssText = content;
		} else {
		  styleEl.appendChild(document.createTextNode(content));
		}
        var children = document.head.querySelectorAll('*');
        styleEl.id = 'sendsay-generated-sheet';
        document.head.appendChild(styleEl, children[children.length - 1])

    	this.el = styleEl;
    }

    makeMediaCondition(conditions) {
    	let condition = '@media '
    	for(let i=0; i < conditions.length; i++) {
    		condition += ' ' + (i == 0 ? '' : 'and') + ' ' + conditions[i];
    	}
    	return condition;
    }

    makeSelectorRule(selector, rules) {
    	var result = ' ' + selector + ' { ';
    	for(let key in rules) {
    		let rule = rules[key];
    		result += ' ' + key + ':' + rule + ';'
    	}
    	result += ' } ';
    	return result;
    }
}