function noop(){}
var DEBUG = 0;

function each(list, func){
    for(var i=0; i<list.length; i++){
        func(list[i]);
    }
}

function clearActive(elems){
    each(elems,
        (e) => {
            e.classList.remove('active');
        }
    )
}

class App {

    constructor(){
        this.router = new _AppRouter();
        this.paths = {};
        this._cache = {};
    }

    route(path, name, handler, exit){
        // 
        this.paths[name] = path;
        this.router.addPath(path, handler, exit);
    }
    
    _click(path){

        if (path == this.router.PATH && !(this.router.firstRoute)) return;
        // first we call the exit handler of our current path(if we have one)
        let c = this.router.PATH;
        try{ //call an exit handler for this last path if there is one
            if (!(this.router.firstRoute)) this.router.routes[c].exit(this);
        }catch{}

        let swap = (html, cache) => {
            clearActive(document.getElementsByClassName('page'));
            //now we insert our html
            let el = document.getElementById(path);

            if (!el){  // not in our dom yet
                this.container.insertAdjacentHTML('afterbegin', html);
                el = this.container.firstChild;
                el.id = path;
            }

            el.classList.add("active");
            //register as current path
            this.router.PATH = path;

            if (cache){
                this._cache[path] = html;
            }
        }

        if (this._cache.hasOwnProperty(path)) {
            if (DEBUG) console.log('retrieveing from cache ' + path);
            swap(this._cache[path], false);
        }else{
            this.router.routes[path].handler(swap);
        }
    }

    run(){
        var self = this;
        let linkClass = this.name + '-' + 'link';
        let links = document.getElementsByClassName(linkClass);
        // set up our click handlers on elements with the class this.name-link data-$this.name = $route 
        for (let i = 0; i < links.length; i++) {
            let linkElem = links[i];
            let routeName = linkElem.getAttribute('data-'+ this.name);
            linkElem.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    clearActive(links);
                    linkElem.classList.add("active");
                    self._click(self.paths[routeName]);
                }
            );
        }

        this._click(this.router.PATH);

    }
}

class _AppRouter{

    constructor(){
        this.routes = {};
        this.firstRoute = true;
    }
    get PATH(){
        return document.location.pathname;
    }
    set PATH(path){
        //now we change the path in the url bar    
        history.pushState({}, '', path);
        this.firstRoute = false;
    }

    addPath(path, handler, exit){
        this.routes[path] = {handler:handler, exit:exit};
    }

}


function htmlFileLoader(path, handler){
    /// called with a path to file, and a handler that will called with the responseText when it is recieved
    var client = new XMLHttpRequest();
    client.onload = function(){
        handler(this.responseText);
    }
    client.open('GET', path);
    client.send();

    return client;
}

