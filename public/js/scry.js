/*
  Scry v24.06.12a
  TODO:
    - Math is bad on Malouf Home... I think the sticky header is jacking things up... boo
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

function scryUnload() {
  sessionStorage.setItem('scry', 'closed');
  document.querySelector("#scry-control").remove();
  document.querySelector("#scry-minimap-container").remove();
  document.querySelectorAll(".scry-item, .scry-item-global, .scry-item-empty").forEach((el) => el.remove());
}

function scry() {
  // add the scry control bar + styles
  let scryControl = document.createElement('div');
  scryControl.id = 'scry-control';
  let innerScryControl = `<button id="scry-control-power" class="control-button active">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill='#FFFFFF'>
        <path d="M15 6.3c0 .3.2.6.5.8 1.8 1.3 2.8 3.4 2.5 5.9-.4 2.6-2.6 4.7-5.2 5-3.7.4-6.8-2.4-6.8-6 0-2 1-3.8 2.5-4.9.3-.2.5-.5.5-.8 0-.8-.9-1.3-1.6-.9C5.1 7 3.6 9.9 4 13c.5 3.6 3.4 6.5 7 6.9 4.8.5 8.9-3.2 8.9-7.9 0-2.7-1.4-5.1-3.4-6.6-.6-.4-1.5.1-1.5.9zM12 14c-.6 0-1-.4-1-1V5c0-.5.4-1 1-1 .5 0 1 .4 1 1v8c0 .6-.4 1-1 1z"></path>
      </g>
    </svg>
  </button>
  <button id="scry-control-minimap" class="control-button active">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#FFFFFF'>
    <polygon points="8,20 2,18 2,4 8,6 "></polygon>
    <polygon points="15,18 9,20 9,6 15,4 "></polygon>
    <polygon points="22,20 16,18 16,4 22,6 "></polygon>
    </g></svg>
  </button>
  <!--button id="scry-control-dom" class="control-button">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#FFFFFF'><path d="M22 4H2c-.6 0-1 .4-1 1v14c0 .4.3.8.6.9.1.1.3.1.4.1h20c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1zM8 5h8c.5 0 1 .5 1 1s-.5 1-1 1H8c-.5 0-1-.5-1-1s.5-1 1-1zM3 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm19 13c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v9zM21 7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM10.5 12h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h5c.3 0 .5.2.5.5s-.2.5-.5.5zM10.5 14h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h5c.3 0 .5.2.5.5s-.2.5-.5.5zM10.5 16h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h5c.3 0 .5.2.5.5s-.2.5-.5.5z"></path><circle cx="16.5" cy="13.5" r="2.5"></circle></g></svg>
  </button-->
  <button id="scry-control-close" class="control-button">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill='#FFFFFF'><path d="M19.5 4.5c-.8-.8-2.2-.8-3 0L12 9 7.5 4.5c-.8-.8-2.2-.8-3 0-.8.8-.8 2.2 0 3L9 12l-4.5 4.5c-.8.8-.8 2.2 0 3 .8.8 2.2.8 3 0L12 15l4.5 4.5c.8.8 2.2.8 3 0 .8-.8.8-2.2 0-3L15 12l4.5-4.5c.8-.8.8-2.2 0-3z"></path></g></svg>
  </button>`;
  scryControl.innerHTML = innerScryControl;
  document.body.appendChild(scryControl);

  let minimap = document.createElement('aside');
  minimap.id = 'scry-minimap-container';
  let innerMiniMap = `<div class="scry-minimap-overlay"></div>`;
  minimap.innerHTML = innerMiniMap;
  document.body.appendChild(minimap);

  let style = document.createElement('style');
  style.innerHTML = `#scry-control {
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 0.5rem;
    z-index: 100;
    border-radius: 6px;
  }
  .control-button {
    width: 2.5rem;
    height: 2.5rem;
  }
  #scry-control svg g {
    fill: none;
    stroke: #a7a7a7;
  }
  #scry-control-power.active svg g {
    stroke: #7CE5FF;
    fill: #03b6e3;
  }
  #scry-control-minimap.active svg g {
    /*stroke: none;*/
    fill: #ffffff;
  }
  #scry-control-dom svg g {
    stroke: none;
    fill: #a7a7a7;
  }
  #scry-control-dom.active svg g {
    fill: #ffffff;
  }
  #scry-control-close svg g {
    stroke: #FF3333;
  }
  #scry-control-close:hover svg g {
    stroke: #FF0000;
    fill: #FF6666;
  }
  .scry-item,
  .scry-item-global {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    border: 2px inset rgba(0, 255, 102, 1.00);
    border-radius: 6px;
    background: rgba(11,25,10,0.2);
    background: radial-gradient(circle, rgba(11,25,10,0.4) 0%, rgba(7,92,0,0.3) 45%, rgba(51,255,51,0.2) 100%);
    backdrop-filter: blur(2px);
  }
  .scry-item-global {
    border: 2px solid #37fcff;
    background: rgb(4,47,47);
    background: radial-gradient(circle, rgba(4,47,47,0.4) 0%, rgba(15,103,147,0.3) 45%, rgba(55,252,255,0.2) 100%);
  }
  .scry-empty {
    border-color: #ffd233;
    background: rgb(17,29,5);
    background: radial-gradient(circle, rgba(17,29,5,0.6) 0%, rgba(112,139,2,0.4) 45%, rgba(255,210,51,0.2) 100%);
    height: 2rem !important;
  }
  .scry-item-global.scry-empty {
    border: 2px solid #ff37f9;
    background: rgb(21,4,47);
    background: radial-gradient(circle, rgba(21,4,47,0.6) 0%, rgba(91,15,147,0.4) 45%, rgba(255,55,249,0.2) 100%);
  }
  .scry-item-title {
    font-size: 1.5em;
    text-shadow: 0px 0px 2px #000;
    color: #fff;
  }
  #scry-minimap-container {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: fixed;
    top: 0;
    left: 0;height: 100vh;width: 2.5rem;
    background: rgba(0, 0, 0, 0.7);
    z-index: 500;
    border-right: 2px solid #000
  }
  .scry-minimap-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 2.5rem;
    background: rgba(255, 255, 255, 0.7);
    z-index: 510;
  }
  .scry-minimap-item {
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    width: 2.5rem;
    background: rgba(5, 255, 55, 0.7);
    z-index: 520;
    cursor: pointer;
  }
  .scry-minimap-item:hover::after {
    content: attr(data-content-region);
    position: absolute;
    top: -1rem;
    left: 3rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 0.5rem;
    z-index: 510;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .scry-minimap-item-empty {
    background: #ffd233;
  }
  .scry-minimap-item-global {
    background: #03b6e3;
  }
  .scry-minimap-item-global.scry-minimap-item-empty {
    background: #ff37f9;
  }`;
  document.head.appendChild(style);
  sessionStorage.setItem('scry', 'open');
  let regionCount = 0;
  let $contentRegion = document.querySelectorAll("[data-content-region]");
  $contentRegion.forEach((el) => {
    let isGlobal = false;
    let isEmpty = false;
    let scryItem = document.createElement('div');
    el.style.position = 'relative';
    if(el.getAttribute('data-content-region').includes('--global')) {
      scryItem.classList.add('scry-item-global');
      isGlobal = true;
    } else {
      scryItem.classList.add('scry-item');
    }
    if(el.getBoundingClientRect().height === 0) {
      scryItem.classList.add('scry-empty');
      isEmpty = true;
    }
    scryItem.style.width = el.getBoundingClientRect().width + 'px';
    scryItem.style.height = el.getBoundingClientRect().height + 'px';
    scryItem.innerHTML = '<p class="scry-item-title">'+el.dataset.contentRegion+'</p>';
    el.appendChild(scryItem);
    regionCount++;
    // add a region marker to the minimap based on the position on the page it appears in relation to page height
    let minimap = document.getElementById('scry-minimap-container');
    let offset = el.getBoundingClientRect().top + document.querySelector("html").scrollTop;
    // let offset = el.offsetHeight;
    let offsetHeight = offset / document.body.scrollHeight;
    let appliedClass = "scry-minimap-item";
    (isGlobal) ? appliedClass += " scry-minimap-item-global" : '';
    (isEmpty) ? appliedClass += " scry-minimap-item-empty" : '';
    let scrollTarget = 'window.scrollTo({top: '+offset+', behavior: \'smooth\',})';
    minimap.innerHTML += '<div class="'+appliedClass+'" style="top: '+(offsetHeight*100)+'%" data-content-region="'+el.dataset.contentRegion+'" onclick="'+scrollTarget+'"></div>';

    // console.log("found region: " + el.dataset.contentRegion);
  });
  // console.log("total regions found: " + regionCount);
  // console.log("total global regions found: " + document.querySelectorAll("[data-content-region*='--global']").length);
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
  //console.log(getDef(document.body, 0)); // this logs out all the elements including their depth, it's actually pretty cool

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
  let fullHeight = document.body.scrollHeight;
  let screenHeight = window.innerHeight;
  let overlayHeight = (screenHeight / fullHeight) * 100;
  let miniMapOverlay = document.querySelector(".scry-minimap-overlay");
  miniMapOverlay.style.height = overlayHeight + '%';
  let scrollTop = document.documentElement.scrollTop;
  let offsetPercent = (scrollTop / fullHeight) * 100;
  miniMapOverlay.style.top = offsetPercent + '%';

  window.addEventListener('scroll', (event) => {
    requestAnimationFrame(() => {
      scrollTop = document.documentElement.scrollTop;
      offsetPercent = (scrollTop / fullHeight) * 100;
      miniMapOverlay.style.top = offsetPercent + '%';
    })
  });

  // close scry
  document.querySelector("#scry-control-close").addEventListener('click', (event) => {
    scryUnload();
  });

  // power button
  document.querySelector("#scry-control-power").addEventListener('click', (event) => {
    // toggle the visibilty of the scry-items
    let scryItems = document.querySelectorAll(".scry-item, .scry-item-global, .scry-item-empty");
    if(scryItems[0].style.display === "none") {
      scryItems.forEach((el) => {
        el.style.display = "flex";
      });
    } else {
      scryItems.forEach((el) => {
        el.style.display = "none";
      });
    }
    // toggle the "active" class on the control button
    let control = document.querySelector("#scry-control-power");
    if(control.classList.contains("active")) {
      control.classList.remove("active");
    } else {
      control.classList.add("active");
    }
  });

  // minimap
  document.querySelector("#scry-control-minimap").addEventListener('click', (event) => {
    // toggle the visibility of the minimap
    let minimap = document.querySelector("#scry-minimap-container");
    if(minimap.style.display === "none") {
      minimap.style.display = "block";
    } else {
      minimap.style.display = "none";
    }
    // toggle the "active" class on the control button
    let control = document.querySelector("#scry-control-minimap");
    if(control.classList.contains("active")) {
      control.classList.remove("active");
    } else {
      control.classList.add("active");
    }
  })
}
// need to add a resize listener that clears scry and re-adds it if it's open (or updates the values)


// window loaded init
window.addEventListener('load', (event) => {
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
