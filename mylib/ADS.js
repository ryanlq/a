(function()
{
    if(!window.ADS) {window.ADS={};};


    function isCompatible(other) 
    { 
        //使用能力检查检查必要条件
        if( other === false
            || !Array.prototype.push
            || !Object.hasOwnProperty
            || !document.createElement
            || !document.getElementsByTagName)
        {
            return false;
        }
        return true;
    }
    window['ADS']['isCompatible'] = isCompatible;
    
    function $() 
    { 
        var elements = new Array();
        
        for(var index in arguments)
        {
            if(typeof(arguments[index]) == 'string')
            {
                var element = document.getElementById(arguments[index])
                if(arguments.length == 1) 
                    return element;
                elements.push(element);
            }
        }

        return elements;
    }
    window['ADS']['$'] = $;
    
    /*
    addEventListener w3c ;
    attachEvent Microsoft IE;
    */
    function addEvent(node, type, listener) 
    {
        
        if (!isCompatible()) return false;
        
        if(typeof(node) === 'string') node = $(node);
        if(!node) return false;
        
        if(node.addEventListener)
        {
            node.addEventListener(type, listener, false);
            return true;
        }
        else if(node.attachEvent)
        {
            //追加到原型链
            node['e' + type +listener] = listener;
            node[type + listener] = function()
            {
                node['e' + type +listener](window.event);
            }
            node.attachEvent('on'+type, [type + listener]);
            return true;
        }
        return false;
    }
    window['ADS']['addEvent'] = addEvent;

    /*
    removeEvent w3c ;
    detachEvent Microsoft IE;
    */
    function removeEvent(node, type, listener)
    {
        if(typeof(node) === 'string') node = $(node);
        if(!node) return false;
        
        if(node.removeEventListener)
        {
            node.removeEventListener(type, listener, false);
            return true;
        }
        else if(node.detachEvent)
        {
            node.detachEvent( 'on'+type, node[type+listener] );
            node[type+listener] = null;
            return true;
        }
        return false;
    }
    window['ADS']['removeEvent'] = removeEvent;
    
    function getElementsByClassName(className, tag, parent) 
    { 
        parent = parent || document;
        if(!(parent = $(parent))) { return false; }
        
        var allTags = ((tag == '*' && parent.all)? parent.all : parent.getElementsByTagName(tag));
        
        var matchingElements = new Array();
        className = className.replace(/\-/g, "\\-");
        var regex = new RegExp("^|\\s"+className+"\\s$");
        for (var index in allTags)
        {
            var element = allTags[index];
            if(regex.test(element.className))
            {
                matchingElements.push(element);
            }
        }
        return matchingElements;
    };
    window['ADS']['getElementsByClassName'] = getElementsByClassName;
    
    function toggleDisplay(node, value) 
    {
        if (!(node = $(node))) { return false; };
        
        if (node.style.dispaly != 'none')
        {
            node.style.dispaly = 'none'
        }
        else
        {
            node.style.dispaly = value || '';
        }
        return true;
    };
    window['ADS']['toggleDisplay'] = toggleDisplay;
    
    function insertAfter(node, referenceNode) 
    {
        if(!(node = $(node))) { return false; }
        if(!(referenceNode = $(referenceNode))) { return false; }
        
        return referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
    };
    window['ADS']['insertAfter'] = insertAfter;
    
    function removeChildren(parent) 
    {
        if(!(parent = $(parent))) { return false; }
        
        while(parent.firstChild)
        {
            parent.removeChild(children[index]);
        }
/*      var children = parent.childNodes;
        for (var index in children)
        {
            parent.removeChild(children[index]);
        }
*/
        //返回parent以便实现方法连接
        return parent;
    };
    window['ADS']['removeChildren'] = removeChildren;
    
    function prependChild(parent,newChild)
    { 
        if(!(parent = $(parent))) { return false; }
        if(!(newChild = $(newChild))) { return false; }
        
        if(parent.firstChild)
        {
            parent.firstChild.insertBefore(newChild, parent.firstChild)
        }
        else
        {
            parent.appendChild(newChild);
        }
        return parent;
    };
    window['ADS']['prependChild'] = prependChild;
    
    function bindFunction(obj, func)
    {
        return function()
        {
            func.apply(obj,arguments);
        }
    }
    window['ADS']['bindFunction'] = bindFunction;
    
    function getBrowserWindowSize()
    {
        /*
            IE不支持window.innerWidth/innerHeight
            document.documentElement仅仅只是一个标准的DOM对象
            document.body是对body元素的一个引用，等同于document.getElementsByTagName('body')[0]
        */
        var de = document.documentElement;
        return {
            'width' : (
                window.innerWidth
                || (de && de.clientWidth)
                || document.body.clientWidth),
            'height' : (
                window.innerHeight
                || (de && de.clientHeight)
                || document.body.clientHeight)
        }
    }
    window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;
    
    /* nodeType 用 */
    window['ADS']['node'] = {
        ELEMENT_NODE : 1,
        ATTRIBUTE_NODE : 2,
        TEXT_NODE : 3,
        CDATA_SECTION_NODE : 4,
        ENTITY_REFERENCE_NODE : 5,
        ENTITY_NODE : 6,
        PROCESSING_INSTRUCTION_NODE : 7,
        COMMENT_NODE : 8,
        DOCUMENT_NODE : 9,
        DOCUMENT_TYPE_NODE : 10,
        DOCUMENT_FRAGMENT_NODE : 11,
        NOTATION_NODE : 12
    };
    
    
    
})()



