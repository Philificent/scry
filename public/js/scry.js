/*
  Scry v23.11.27pa
  TODO:
    - look for regions and highlight them
    - if a region is empty, style it as empty and add to the list of un-used but available regions
    - Add widget IDs to the region overlay
    - if the region data-attribute contains a value with '--global' then mark as a global region in the overlay
    - add close button
    - add scry disable button
    - add tilt/layer button
    - add keyup event listener

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
  console.log("total global regions found: " + document.querySelectorAll("[data-content-region='--global']").length);
  // list empty regions
  // console.log("total empty regions found: " + document.querySelectorAll("[data-content-region='--empty']").length);

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
