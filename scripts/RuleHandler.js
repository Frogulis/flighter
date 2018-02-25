function RuleHandler() {
    this._array = [];
}

RuleHandler.prototype = {
    init: function()
    {
        this.loadArray();
        this.initalized = !chrome.runtime.lastError;
    },

    loadArray: function()
    {
        loadRules((array) => {
            this.setArray(array);
            var event = new Event("redraw_page");
            document.dispatchEvent(event);
        });
    },

    setArray: function(array)
    {
        this._array = array;
    },

    getArrayLength: function()
    {
        return this._array.length;
    },

    getElement: function(index)
    {
        if (index >= this.getArrayLength()) return undefined;
        return this._array[index];
    },

    getHTMLOf: function(index)
    {
        if (index >= this.getArrayLength()) return undefined;
        return this._array[index].getHTML(index);
    },

    addEmptyElement: function()
    {
        this._array.push(getUIRule());
    },

    updateElement: function(index, element)
    {
        this._array[index] = element;
    },
    
    updateWithDOMElement: function(element)
    {
        var index = this._getElementIndex(element);
        if (index === NaN) return;
        if (index >= this._array.length) return;
        var to_set = this._array[index];
        to_set.type = element.getElementsByClassName("rule_cat")[0].innerHTML;
        to_set.param = element.getElementsByClassName("rule_parameter")[0].value;
    },

    deleteWithDOMElement: function(element)
    {
        var index = this._getElementIndex(element);
        if (index === NaN) return;
        if (index >= this._array.length) return;
        this._array.splice(index, 1);
    },

    _getElementIndex: function(element)
    {
        return index = parseInt(element.getAttribute("number"), 10);
    },

    _getElementJSON: function(element)
    {

        return {
            type: element.getElementsByClassName("rule_cat")[0].innerHTML,
            param: element.getElementsByClassName("rule_parameter")[0].getAttribute("value"),
            colour: {
                r: element.get
            }
        };
    }
};

function getRuleHandler()
{
    var to_return = new RuleHandler();
    return to_return;
}
