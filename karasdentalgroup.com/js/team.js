
function newElem(tag, cssClass, parent=undefined){
    const elem = document.createElement(tag);
    elem.setAttribute('class', cssClass);
    if(parent) return parent.appendChild(elem);
    return elem;

}


async function readInto(fname, targetElement) {
	let response = await fetch(fname);
	targetElement.innerHTML = await response.text();
}
let COUNTER = 1;
class HeadShot extends HTMLElement{
    constructor(){
        super();
        COUNTER ++;
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

        const name = this.hasAttribute('name') ? this.getAttribute('name') : '';   
     
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class','wrapper');

         
        //Image
        let imgPath = `./team/${name}/${name}.jpg`;
        const circle = newElem('div', 'circle', wrapper);
        const img = newElem('img', '');
        circle.appendChild(img);
        img.src = imgPath;

        //Bio
        const bioHeading = this.hasAttribute('heading') ? this.getAttribute('heading') : '';  
        let bioPath = `./team/${name}/${name}.bio`;
        const bio = newElem('div', 'bio', wrapper);
        const bioh = newElem('h3', '', bio);
        bioh.textContent = bioHeading;
        const biop = newElem('p', 'biop', bio);
        readInto(bioPath, biop);

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');

        style.textContent = `

            .wrapper { 
                padding:10px;
                display: grid;
                grid-template-areas:
                    "picture bio";
            }
            .circle {
                border-radius: 50%;
                background: #bcd6ff;
                margin: 10px;
                overflow: hidden;
                width: 298px; height: 298px;
                grid-area: picture;
                align-self: start;
                justify-self:center;
              }
            .bio {
                grid-area: bio;
                justify-self: left;
                min-height: 300px;
            }

            @media only screen and (max-width: 768px){
                    .wrapper { 
                        grid-template-areas:
                            "picture"
                            "bio";
                    }
                    .circle {
                        align-self: end;
                    }
                    .bio > h3 {
                        text-align: center;
                    }
                }
            `
  
        // attach the created elements to the shadow DOM
        this.shadowRoot.append(style,wrapper);
    }
}

customElements.define('head-shot', HeadShot);