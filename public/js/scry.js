/*
  Scry v24.06.10a
  TODO:
    - look for regions and highlight them
    - if a region is empty, style it as empty where it would be on the page and add to the list of un-used but available regions
    - Add widget IDs to the region overlay (do we have those? or need to mod the site code?)
    - if the region data-attribute contains a value with '--global' then mark as a global region in the overlay
    - add close button
    - add scry disable/enable toggle
    - add keyup event listener
    - add mini-map (use total page height and percentages to show where each region is in the page)
    - add browser performance detection/monitor - can we get live render FPS info?
    - DOM size (nodes) - 800 warning!, 1400 excessive!
    - - Get # of elements: `document.querySelectorAll('*').length;`
    - - Get # of nodes for an element: `document.body.childNodes.length;`
    - - Get # of total DOM nodes:
    ```
    let elements = document.querySelectorAll('*');
    let nodes = 0;
    for (let i = 0; i < elements.length; i++) {
      nodes += elements[i].childNodes.length;
    }
    console.log(elements);
    console.log(nodes);
    ```


*/

function scry() {
  // console.log("scry is loaded and ready for use");
  // add the scry control bar + styles
  let scryControl = document.createElement('div');
  scryControl.id = 'scry-control';
  let innerScryControl = `<button id="scry-control-close" class="control-button">&times;</button>
  <button id="scry-control-global" class="control-button">G</button>
  <button id="scry-control-page" class="control-button">P</button>
  <button id="scry-control-empty" class="control-button">E</button>`;
  scryControl.innerHTML = innerScryControl;
  document.body.appendChild(scryControl);

  let style = document.createElement('style');
  style.innerHTML = `#scry-control {
    position: fixed;
    top: calc(50vh - 160px);
    right: 1rem;
    z-index: 1000;
    height: 320px;
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #scry-control .control-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #FFF;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    color: white;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(5px);
  }
  #scry-control .control-button:last-child {
    margin-bottom: 0;
  }
  #scry-control-close.control-button {border-color: #fe2e2e;background: rgba(162,1,1,0.3);}
  #scry-control-close.control-button:hover {background: rgba(192,1,1,1);box-shadow: 0 0 5px #fe2e2e;}
  #scry-control-global.control-button {border-color: #35FF69;background: rgba(0,72,19,0.3);}
  #scry-control-global.control-button:hover {background: rgba(0,72,19,1);box-shadow: 0 0 5px #35FF69;}
  #scry-control-page.control-button {border-color: #44CCFF;background: rgba(0,78,107,0.3);}
  #scry-control-page.control-button:hover {background: rgba(0,78,107,1);box-shadow: 0 0 5px #44CCFF;}
  #scry-control-empty.control-button {border-color: #D138BF;background: rgba(104,24,94,0.3);}
  #scry-control-empty.control-button:hover {background: rgba(104,24,94,1);box-shadow: 0 0 5px #D138BF;}
  .scry-item-global {
    box-sizing: border-box;
    position: absolute;
    border: 2px solid #35FF69;
    background: rgba(0, 14, 20, 0.2);
  }
  .scry-item {
    box-sizing: border-box;
    position: absolute;
    border: 2px solid #44CCFF;
    background: rgba(68, 204, 255, 0.2);
  }
  .scry-item.scry-empty {
    border-color: #D138BF;
    background: rgba(209, 56, 191, 0.2);
  }
  .scry-item-title {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    width: fit-content;
    font-size: 1em;
    color: #fff;
    background: #004662;
    padding: 0.4rem 1rem;
    clip-path: polygon(100% 0, 0 0, 0 100%, 92% 100%, 100% 60%);
  }
  .scry-item-global .scry-item-title {
    background: #005c18;
  }
  .scry-item-title.scry-empty {
    background: #481141;
    margin: 0.5rem;
  }
  .srcy-empty-regions {
    position: fixed;
    top: 10vh;
    right: 1rem;
    width: 300px;
    display: flex;
    flex-direction: column;
    min-height: 180px;
    z-index: 100;
    background: rgba(209, 56, 191, 0.2);
    border: 1px solid #D138BF;
  }`;
  document.head.appendChild(style);

  sessionStorage.setItem('scry', 'open');
  let regionCount = 0;
  let $contentRegion = document.querySelectorAll("[data-content-region]");
  $contentRegion.forEach((el) => {
    // let scryItem = document.createElement('div');
    // scryItem.classList.add('scry-item');
    // scryItem.innerHTML = '<p class="scry-item-title">'+el.dataset.contentRegion+'</p>';
    // el.appendChild(scryItem);
    regionCount++;
    console.log("found region: " + el.dataset.contentRegion);
  })
  console.log("total regions found: " + regionCount);
  // list amount of regions that are global
  console.log("total global regions found: " + document.querySelectorAll("[data-content-region*='--global']").length);
  // list empty regions
  // console.log("total empty regions found: " + document.querySelectorAll("[data-content-region='--empty']").length);

  // Element and Node information
  function getDef(element, def) {
    let str = ""
    let childs = element.childNodes
    for (var i = 0; i < childs.length; ++i) {
      if (childs[i].nodeType != 3) {
        str += childs[i].nodeName + " " + def + "\n"
        str += getDef(childs[i], def + 1)
      }
    }
    return str
  }
  console.log(getDef(document.body, 0));

  // let elements = document.querySelectorAll('*');
  // let elements = document.body.querySelectorAll('*');
  // let nodes = 0;
  // for (let i = 0; i < elements.length; i++) {
  //   // need another loop here to see if child nodes have nodes
  //   nodes += elements[i].childNodes.length;
  //   // can we kick out the name or type of element?
  //   console.log("node name:",elements[i].nodeName,"Has child nodes?",elements[i].hasChildNodes());
  //   if(elements[i].hasChildNodes()) {
  //     console.log("child nodes:",elements[i].childNodes.length);
  //     // loop through the child nodes and see if they have child nodes
  //     for(let j = 0; j < elements[i].childNodes.length; j++) {
  //       console.log("grandchild node name:",elements[i].childNodes[j].nodeName,"Has great-grandchild nodes?",elements[i].childNodes[j].hasChildNodes());
  //       if(elements[i].childNodes[j].hasChildNodes()) {
  //         console.log("great grandchild nodes:",elements[i].childNodes[j].childNodes.length);
  //         for(let k = 0; k < elements[i].childNodes[j].childNodes.length; k++) {
  //           console.log("great grandchild node name:",elements[i].childNodes[j].childNodes[k].nodeName);
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log("element count:",elements.length);
  // console.log("node count:",nodes);
}


// window loaded init
window.addEventListener('load', (event) => {
  // I think it would be fun to load the splinter-cell night vision sound on launch in conjunction with turning on the scry interface...
  // for new page loads, if scry was open and was not explicitly closed, re-open it
  if(sessionStorage.getItem('scry') === 'open') {
    scry();
  } else {
    function scryer(e) {
      if(e.isTrusted) {
        if(keys.scry[keys.index] === e.key) {
          if(keys.index == 3) {
            keys.index = 0;
            scry();
          } else {
            keys.index++;
          }
        } else {
          keys.index = 0;
        }
      }
    }
    const keys = {
      index: 0,
      scry: ["s","c","r","y"]
    };
    document.addEventListener("keyup", (e) => scryer(e));
  }
});
