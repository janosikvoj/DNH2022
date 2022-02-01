setInterval(actualizeState, 20);
function actualizeState() {
    if (document.querySelector(".index-01.check-slide").classList.contains("swiper-slide-active")) {
        document.querySelector(".welcome-container").classList.remove("faded");
    } else {
        document.querySelector(".welcome-container").classList.add("faded");
    }

    if (document.querySelector(".index-01.check-slide").classList.contains("swiper-slide-active")) {
      document.querySelector(".quote").style.color=get_random(["rgb(255, 0, 0)","rgb(0, 255, 0)","rgb(0, 0, 255)"]);
    }
}

function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}

// form array of all text nodes in parentNode
function allTextNodes(parentNode) {
    let arr = [];
    if (!parentNode) {
      return arr;
    }
  
    let nodes = parentNode.childNodes;
    nodes.forEach(node => {
      if (node.nodeName === 'SCRIPT') {
        return;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        arr.push(node);
      } else {
        arr = arr.concat(allTextNodes(node));
      }
    });
    return arr;
}
  
// convert [space][letter][space] to [space][letter][non-breaking space];
const modifySingleCharWords = str => str.replace(/ ([a-zA-Z]) /g,' $1' + '\u00A0');
  
function fixAllSingleCharWordsInBody() {
    let tNodes = allTextNodes(document.body);
    tNodes.forEach(tNode => {
      tNode.nodeValue = modifySingleCharWords(tNode.nodeValue);
    });
}
fixAllSingleCharWordsInBody()