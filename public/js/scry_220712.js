// Scry 22.07.19
let scrying = false;
function scry() {
  if(scrying) {
    return; // tumbleweeds because you know, it's already open
  } else {
    scrying = true;
    let style = document.createElement('style');
    style.innerHTML = '.scry-item {box-sizing: border-box;position: absolute;border: 2px solid #00B7FF;background: rgba(0,14,20,0.2);}.scry-item.scry-empty {border-color: #ff4800;background: rgba(20,7,0,0.2)}.scry-item-title {margin-top: 0.5rem;margin-left: 0.5rem;width: fit-content;font-size: 1em;color: #fff;background: #004662;padding: 0.4rem 1rem;clip-path: polygon(100% 0, 0 0, 0 100%, 92% 100%, 100% 60%);}.scry-item-title.scry-empty {background: #3b1100;margin: 0.5rem;}.srcy-empty-regions {position: fixed;top: 10vh;right: 1rem;width: 300px;display: flex;flex-direction: column;min-height: 180px;z-index: 100;background: rgba(130,0,0,0.2);border: 1px solid #911}';
    document.head.appendChild(style);

    let $contentRegion = document.querySelectorAll("[data-content-region]");
    let hiddenRegions = document.createElement('div');
    hiddenRegions.classList.add('srcy-empty-regions');
    let $body = document.querySelector("body");
    $body.appendChild(hiddenRegions);

    $contentRegion.forEach((el) => {
      let pos = el.getBoundingClientRect();
      let posY = pos.top + window.scrollY;
      let posX = pos.left + window.scrollX;
      let regionName = el.dataset.contentRegion;
      let injectml = "";
      if(el.offsetHeight > 0) {
        injectml = document.createElement('div');
        injectml.innerHTML = '<div class="scry-item" style="top: '+posY+'px;left: '+posX+'px;width: '+el.offsetWidth+'px;height: '+el.offsetHeight+'px;"><p class="scry-item-title">'+regionName+'</p></div>';
        $body.appendChild(injectml);
      } else {
        // item is not visible... so list it
        injectml = document.createElement('div'); // do the following mods for class and style so it stops injecting an empty div and then another div!
        injectml.classList.add('scry-item,scry-empty');
        //injectml.style("width: 100%;height: fit-content;");
        injectml.innerHTML = '<p class="scry-item-title scry-empty">'+regionName+'</p>';
        let $emptyRegions = document.querySelector('.srcy-empty-regions');
        $emptyRegions.appendChild(injectml);
      }
    });
  }
}
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
