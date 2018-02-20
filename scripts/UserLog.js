function LMessage(string) {
    this._message = string;
    this.toString = function()
    {
        return string;
    }
}

function UserLog(target_id) {
    this._messages = [];
    this.target = target_id;
}

UserLog.prototype = {
    log: function(message)
    {
        message = new LMessage(message);
        setTimeout(() => {
            console.log(message.toString());
            message.time_over = true;
            console.log(message.time_over);
            this.callRedraw();
        }, 3000);
        this._messages.push(message);
        this.callRedraw();
    },
    getHTML: function()
    {
        this._messages = this._messages.filter(el => el.time_over != true);
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
        console.log(mytarget);
        mytarget.dispatchEvent(event);
    }
};

var _total_user_logs = {};
function getUserLog(target_id)
{
    if (_total_user_logs.hasOwnProperty(target_id))
    {
        return _total_user_logs[target_id];
    }
    else {
        _total_user_logs[target_id] = new UserLog(target_id);
        return getUserLog(target_id);
    }
}
