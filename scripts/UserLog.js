function LMessage(string) {
    this._message = string;
    this.toString = function()
    {
        return string;
    }
}

function UserLog(target_id, options) {
    if (options === undefined) options = {};
    if (options.auto_deleting === undefined) options.auto_deleting = true;
    if (options.fade_length === undefined) options.fade_length = 0;
    this._auto_deleting = options.auto_deleting;
    this._fade_length = options.fade_length;
    this._messages = [];
    this.target = target_id;
}

UserLog.prototype = {
    log: function(message)
    {
        message = new LMessage(message);
        if (this._auto_deleting) {
            setTimeout(() => {
                message.time_over = true;
                this.callRedraw();
            }, 3000);
        }
        this._messages.push(message);
        this.callRedraw();
    },
    getHTML: function()
    {
        this._filterMessages();
        var result = "";
        var counter = 0;
        this._messages.forEach((el) => {
            result += this._getMessageHTML(el, this._getFadeCSS(counter));
            counter++;
        });
        return result;
    },
    callRedraw: function()
    {
        var mytarget = document.getElementById(this.target);
        if (!mytarget) {
            console.log("Can't find target ID: " + this.target);
        }
        mytarget.innerHTML = "";
        mytarget.innerHTML = this.getHTML();
    },
    _filterMessages: function()
    {
        this._messages = this._messages.filter(el => el.time_over != true);
    },
    _getMessageHTML: function(message, style)
    {
        return '<span style="' + style + '">' + message + '<br></span>';
    },
    _getFadeCSS: function(index)
    {
        if (this._fade_length <= 0) {
            return "opacity: 1;";
        }
        else {
            return "opacity: " + (1 - (index / this._fade_length)).toString(10) + ";";
        }
    },
    _reverseArray: function(arr)
    {
        var result = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            result.push(arr[i]);
        }
        return result;
    }
};

function ReverseUserLog(target_id, options)
{
    UserLog.call(this, target_id, options);
}

ReverseUserLog.prototype = Object.create(UserLog.prototype, {
    getHTML: {
        value: function()
        {
            this._filterMessages();
            var result = "";
            var counter = 0;
            var msgs = this._reverseArray(this._messages);
            msgs.forEach(el => {
                result += this._getMessageHTML(el, this._getFadeCSS(counter));
                counter++;
            });
            return result;
        }
    }
});

var _total_user_logs = {};
function getUserLog(target_id, options)
{
    var log_dict =  null;
    if (options === undefined) options = {};
    if (options.log_dict === undefined) {
        log_dict = _total_user_logs;
    }
    else {
        log_dict = options.log_dict;
        if (!log_dict) {
            return undefined;
        }
    }

    if (log_dict.hasOwnProperty(target_id))
    {
        return log_dict[target_id];
    }
    else {
        if (options.reverse_output) {
            log_dict[target_id] = new ReverseUserLog(target_id, options);
        }
        else {
            log_dict[target_id] = new UserLog(target_id, options);
        }
        if (options.reverse_fade) {
            var new_func = function(index)
            {
                if (this._fade_length <= 0) {
                    return "opacity: 1;";
                }
                else {
                    var amount = ((index - this._fade_length)/this._fade_length).toString(10);
                    console.log("!" + index + "#" + amount);
                    return "opacity: " + amount + ";";
                }
            }
            log_dict[target_id]._getFadeCSS = new_func;
        }
        return getUserLog(target_id, options);
    }
}

function deleteUserLog(target_id, options)
{
    var log_dict =  null;
    if (options === undefined) options = {};
    if (options.log_dict === undefined) {
        log_dict = _total_user_logs;
    }
    else {
        log_dict = options.log_dict;
        if (!log_dict) {
            return;
        }
    }
    if (log_dict.hasOwnProperty(target_id)) {
        delete log_dict[target_id];
    }
    else {
        console.log("Can't find target log: " + target_id);
    }
}
