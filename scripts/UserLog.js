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
    this._auto_deleting = options.auto_deleting;
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
        this._messages.forEach((el) => {
            result += el.toString() + "<br>";
        });
        return result;
    },
    callRedraw: function()
    {
        var event = new Event("redraw");
        var mytarget = document.getElementById(this.target);
        mytarget.dispatchEvent(event);
    },
    _filterMessages: function()
    {
        this._messages = this._messages.filter(el => el.time_over != true);
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
            this._messages.forEach(el => {
                result = el + "<br>" + result;
            });
            return result;
        }
    }
});

var _total_user_logs = {};
function getUserLog(target_id, options)
{
    if (_total_user_logs.hasOwnProperty(target_id))
    {
        return _total_user_logs[target_id];
    }
    else {
        if (options.reverse_output) {
            _total_user_logs[target_id] = new ReverseUserLog(target_id, options);
        }
        else {
            _total_user_logs[target_id] = new UserLog(target_id, options);
        }
        return getUserLog(target_id, options);
    }
}
