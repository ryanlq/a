/*
* 由于现版本的createTextNode不支持将html转义为html节点。
* 所以writeRaw 和write现在效果一样。
*/

function mylogger(id)
{
    id = id || 'RyanLogWindow';
    var logWindow = null;
    var createWindow = function()
    {
        //var browserWindowSize = ADS.getBrowserWindowSize();
        //var top = (browserWindowSize.height-200)/2 || 0;
        //var left = (browserWindowSize.width-200)/2 || 0;
        logWindow = document.createElement('UL');
        
        logWindow.setAttribute = ('id', id);
        
        logWindow.style.position = 'absolute';
        //logWindow.style.left = left + 'px';
        //logWindow.style.top = top + 'px';
        logWindow.style.right = '0px';
        logWindow.style.bottom = '0px';
        
        logWindow.style.width = '400px';
        logWindow.style.height = '200px';
        logWindow.style.overflow = 'scroll';
        
        logWindow.style.padding = '0';
        logWindow.style.margin = '0';
        logWindow.style.border = '1px solid black';
        logWindow.style.background = 'white';
        logWindow.style.liststyle = 'none';
        
        document.body.appendChild(logWindow);
        
    };
    this.writeRaw = function(message)
    {
        if(!logWindow) createWindow();
        
        var li = document.createElement('LI');
        li.style.padding = '0';
        li.style.border = '0';
        li.style.borderBottom = '1px solid gray';
        li.style.margin = '0';
        li.style.color = '#000';
        
        
        if(typeof message == 'object')
        {
            li.appendChild(message);
        }
        else if(typeof message == 'undefined')
        {
            li.appendChild(document.createTextNode("message was undefined!"));
        }
        else if (typeof li.innerHtml != 'undefined')
        {
            
            li.innerHtml = message;
        }
        else
        {
            li.appendChild(document.createTextNode(message));
        }
        
        logWindow.appendChild(li);
        
        return true;
    };
}

mylogger.prototype = 
{
    write: function(message)
    {
        if (typeof message == 'string' && message.length === 0)
        {
            return this.writeRaw("Ryan's log: null message!");
        }
        
        if(typeof message != 'string')
        {
            if(message.toString) return this.writeRaw(message.toString());
            else return this.writeRaw(typeof message);
        }
        X
        message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        return this.writeRaw(message);
    },
    header: function(message)
    {
        var span = document.createElement('SPAN');
        span.style.color = 'white';
        span.style.backgroundColor = 'black';
        span.appendChild(document.createTextNode(message));
        
        return this.writeRaw(span);
    }
}

if(!window.ADS) {window['ADS'] = {};}
window['ADS']['log'] = new mylogger();